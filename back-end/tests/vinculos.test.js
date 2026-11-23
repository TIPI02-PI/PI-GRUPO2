import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import { PDFDocument } from "pdf-lib";

test("fluxo de vínculos e contratos com duas partes", { skip: !process.env.LUMIO_TEST_MYSQL }, async t => {
    const nome = "lumio_teste_" + randomBytes(6).toString("hex");
    const admin = await mysql.createConnection({
        host: process.env.DB_HOST, port: process.env.DB_PORT, user: process.env.DB_USER,
        password: process.env.DB_PASSWORD, multipleStatements: true
    });
    await admin.query("CREATE DATABASE ??", [nome]);
    t.after(async () => {
        try { await admin.query("DROP DATABASE ??", [nome]); }
        finally { await admin.end(); }
    });
    await admin.changeUser({ database: nome });
    const schema = await readFile(new URL("../db.sql", import.meta.url), "utf8");
    await admin.query(schema.slice(schema.indexOf("USE Lumio;") + "USE Lumio;".length));
    await admin.query(`INSERT INTO representante(nome,email,senha) VALUES
        ('Responsável','r@teste','x'),('Motorista','m@teste','x'),('Terceiro','t@teste','x');
        INSERT INTO motorista(representante_id) VALUES (2);
        INSERT INTO van(motorista_id,placa) VALUES (1,'TEST123');
        INSERT INTO escola(nome,cnpj,cep,numero,bairro,cidade,estado)
        VALUES ('Escola Modelo','1','1','1','Centro','São Paulo','SP');
        INSERT INTO van_escola VALUES (1,1);
        INSERT INTO aluno(escola_id,nome,turno) VALUES (1,'Aluno','integral');
        INSERT INTO representante_aluno(aluno_id,representante_id) VALUES (1,1);`);
    process.env.DB_NAME = nome;
    process.env.JWT_SECRET = randomBytes(32).toString("hex");
    const { default: app } = await import("../app.js");
    const { default: pool } = await import("../src/config/db.js");
    const server = app.listen(0, "127.0.0.1");
    await new Promise(resolve => server.once("listening", resolve));
    t.after(async () => {
        await new Promise(resolve => server.close(resolve));
        await pool.end();
    });
    function chamar(path, uid, method = "GET", body, tipo = "application/json") {
        const headers = { "Content-Type": tipo };
        if (uid) headers.Authorization = "Bearer " + jwt.sign({ id: uid }, process.env.JWT_SECRET);
        return fetch("http://127.0.0.1:" + server.address().port + "/api/" + path, { method, headers, body });
    }
    assert.equal((await chamar("vans")).status, 401);
    assert.equal((await (await chamar("vans?escola=Modelo&regiao=Centro", 1)).json()).length, 1);
    assert.equal((await (await chamar("vans?escola=Outra", 1)).json()).length, 0);
    const pedido = JSON.stringify({ aluno_id: 1, van_id: 1 });
    assert.equal((await chamar("vinculos", 3, "POST", pedido)).status, 404);
    const respostas = await Promise.all([1, 1].map(u => chamar("vinculos", u, "POST", pedido)));
    assert.deepEqual(respostas.map(r => r.status).sort(), [201, 409]);
    const { contrato_id } = await respostas.find(r => r.status === 201).json();
    assert.equal((await (await chamar("vinculos", 2)).json())[0].contrato_id, contrato_id);
    assert.deepEqual(await (await chamar("vinculos", 3)).json(), []);
    const pdf = "contratos/" + contrato_id + "/pdf";
    const aceite = "contratos/" + contrato_id + "/confirmacoes";
    assert.equal((await chamar(aceite, 1, "POST")).status, 409);
    const doc = await PDFDocument.create();
    doc.addPage();
    const bytes = Buffer.from(await doc.save());
    const enviar = (u, b) => chamar(pdf, u, "PUT", b, "application/pdf");
    assert.equal((await enviar(1, Buffer.from("inválido"))).status, 422);
    assert.equal((await enviar(3, bytes)).status, 404);
    assert.equal((await enviar(1, bytes)).status, 204);
    assert.equal((await chamar(pdf, 3)).status, 404);
    assert.deepEqual(Buffer.from(await (await chamar(pdf, 2)).arrayBuffer()), bytes);
    for (const uid of [2, 2]) {
        assert.equal((await (await chamar(aceite, uid, "POST")).json()).status, "aguardando_confirmacao");
    }
    assert.equal((await enviar(1, bytes)).status, 409);
    assert.equal((await chamar(aceite, 3, "POST")).status, 404);
    assert.equal((await (await chamar(aceite, 1, "POST")).json()).status, "ativo");
    assert.equal((await (await chamar("vinculos", 2)).json())[0].status, "ativo");
});
