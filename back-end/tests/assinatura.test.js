import test from "node:test";
import assert from "node:assert/strict";
import { avaliarAssinatura } from "../src/middleware/avaliarAssinatura.js";

const ativa = {
    id: 1,
    status: "ativa",
    pagamento_confirmado_em: "2026-11-01",
    iniciou: 1,
    valida: 1
};

test("assinatura ativa libera o acesso", () => {
    const resultado = avaliarAssinatura(ativa);

    assert.equal(resultado.acessoLiberado, true);
    assert.equal(resultado.codigo, "ATIVA");
});

test("sem assinatura bloqueia o acesso", () => {
    const resultado = avaliarAssinatura(null);

    assert.equal(resultado.acessoLiberado, false);
    assert.equal(resultado.codigo, "SEM_ASSINATURA");
});

test("assinatura cancelada bloqueia o acesso", () => {
    const resultado = avaliarAssinatura({ ...ativa, status: "cancelada" });

    assert.equal(resultado.acessoLiberado, false);
    assert.equal(resultado.codigo, "CANCELADA");
});

test("pagamento pendente bloqueia o acesso", () => {
    const resultado = avaliarAssinatura({ ...ativa, status: "pendente" });

    assert.equal(resultado.acessoLiberado, false);
    assert.equal(resultado.codigo, "PENDENTE");
});

test("assinatura sem pagamento confirmado bloqueia o acesso", () => {
    const resultado = avaliarAssinatura({ ...ativa, pagamento_confirmado_em: null });

    assert.equal(resultado.acessoLiberado, false);
    assert.equal(resultado.codigo, "INATIVA");
});

test("assinatura que ainda não começou bloqueia o acesso", () => {
    const resultado = avaliarAssinatura({ ...ativa, iniciou: 0 });

    assert.equal(resultado.acessoLiberado, false);
    assert.equal(resultado.codigo, "NAO_INICIADA");
});

test("assinatura vencida bloqueia o acesso", () => {
    const resultado = avaliarAssinatura({ ...ativa, valida: 0 });

    assert.equal(resultado.acessoLiberado, false);
    assert.equal(resultado.codigo, "VENCIDA");
});

test("assinatura com status desconhecido bloqueia o acesso", () => {
    const resultado = avaliarAssinatura({ ...ativa, status: "inativa" });

    assert.equal(resultado.acessoLiberado, false);
    assert.equal(resultado.codigo, "INATIVA");
});

const apiUrl = process.env.TEST_API_URL?.replace(/\/$/, "");
const motoristaEmail = process.env.TEST_MOTORISTA_EMAIL;
const motoristaSenha = process.env.TEST_MOTORISTA_SENHA;
const responsavelEmail = process.env.TEST_RESPONSAVEL_EMAIL;
const responsavelSenha = process.env.TEST_RESPONSAVEL_SENHA;
const integracaoAtiva = !!apiUrl;

async function acessar(rota, token) {
    return fetch(`${apiUrl}${rota}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
}

async function login(email, senha) {
    const resposta = await fetch(`${apiUrl}/api/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
    });
    assert.equal(resposta.status, 200, "O usuário de teste deve existir e conseguir fazer login");

    const dados = await resposta.json();
    assert.ok(dados.token, "O login precisa retornar o token");

    return dados.token;
}

test("a API exige token no status", { skip: !integracaoAtiva }, async () => {
    const resposta = await acessar("/api/assinatura/status");

    assert.equal(resposta.status, 401);
});

test("a API exige token para verificar o acesso", { skip: !integracaoAtiva }, async () => {
    const resposta = await acessar("/api/assinatura/verificar-acesso");

    assert.equal(resposta.status, 401);
});

test("a API rejeita token inválido", { skip: !integracaoAtiva }, async () => {
    const resposta = await acessar("/api/assinatura/status", "token-invalido");

    assert.equal(resposta.status, 401);
});

test("motorista ativo pode usar o modo gratuito", {
    skip: !integracaoAtiva || !motoristaEmail || !motoristaSenha
}, async () => {
    const token = await login(motoristaEmail, motoristaSenha);
    const resposta = await acessar("/api/assinatura/status", token);

    assert.equal(resposta.status, 200);

    const dados = await resposta.json();
    assert.equal(dados.acessoLiberado, true);
    assert.equal(dados.assinaturaObrigatoria, false);
    assert.equal(dados.codigo, "GRATUITO");

    const acesso = await acessar("/api/assinatura/verificar-acesso", token);

    assert.equal(acesso.status, 200);
});

test("responsável não acessa a área do motorista", {
    skip: !integracaoAtiva || !responsavelEmail || !responsavelSenha
}, async () => {
    const token = await login(responsavelEmail, responsavelSenha);
    const resposta = await acessar("/api/assinatura/verificar-acesso", token);

    assert.equal(resposta.status, 403);

    const dados = await resposta.json();
    assert.equal(dados.codigo, "NAO_E_MOTORISTA");
});
