import express from "express";
import { PDFDocument } from "pdf-lib";
import db from "../config/db.js";
import { autenticarUsuario } from "../middleware/autenticarUsuario.js";

const router = express.Router();
const cobertura = `(SELECT van_id, escola_id FROM van_escola
    UNION SELECT van_id, escola_id FROM aluno WHERE van_id IS NOT NULL)`;

function falha(status, mensagem) {
    throw Object.assign(new Error(mensagem), { status });
}

function id(valor) {
    if (!Number.isSafeInteger(valor) || valor <= 0) falha(400, "Informe um ID válido.");
    return valor;
}

async function transacao(tarefa) {
    const con = await db.getConnection();
    try {
        await con.beginTransaction();
        const resultado = await tarefa(con);
        await con.commit();
        return resultado;
    } catch (erro) {
        await con.rollback();
        throw erro;
    } finally {
        con.release();
    }
}

router.get("/vans", autenticarUsuario, async (req, res) => {
    const { escola = "", regiao = "" } = req.query;
    if (typeof escola !== "string" || typeof regiao !== "string") falha(400, "Filtro inválido.");
    const [vans] = await db.execute(`
        SELECT DISTINCT v.id, v.identificacao, v.capacidade
        FROM van v JOIN motorista m ON m.id = v.motorista_id
        LEFT JOIN ${cobertura} ce ON ce.van_id = v.id
        LEFT JOIN escola e ON e.id = ce.escola_id
        WHERE v.status = 'ativa' AND m.status = 'ativo'
          AND (? = '' OR LOCATE(?, e.nome) > 0)
          AND (? = '' OR LOCATE(?, e.bairro) > 0 OR LOCATE(?, e.cidade) > 0)
        ORDER BY v.id`, [escola.trim(), escola.trim(), regiao.trim(), regiao.trim(), regiao.trim()]);
    res.json(vans);
});

router.post("/vinculos", autenticarUsuario, async (req, res) => {
    const aluno = id(req.body?.aluno_id);
    const van = id(req.body?.van_id);
    const responsavel = req.usuario.id;
    const pedido = await transacao(async con => {
        const [[filho]] = await con.execute(`SELECT a.escola_id, a.turno FROM aluno a
            JOIN representante_aluno ra ON ra.aluno_id = a.id
            WHERE a.id = ? AND ra.representante_id = ? FOR UPDATE`, [aluno, responsavel]);
        if (!filho) falha(404, "Aluno não encontrado para este responsável.");
        const [[destino]] = await con.execute(`SELECT m.id, m.representante_id FROM van v
            JOIN motorista m ON m.id = v.motorista_id
            WHERE v.id = ? AND v.status = 'ativa' AND m.status = 'ativo' FOR UPDATE`, [van]);
        if (!destino) falha(404, "Van indisponível.");
        if (destino.representante_id === responsavel) falha(409, "As duas partes devem ser distintas.");
        const [[existente]] = await con.execute(`SELECT id FROM vinculo WHERE aluno_id = ?
            AND van_id = ? AND status IN ('pendente','ativo') LIMIT 1`, [aluno, van]);
        if (existente) falha(409, "Já existe um vínculo aberto para este aluno e van.");
        const [v] = await con.execute(`INSERT INTO vinculo
            (representante_id,motorista_id,aluno_id,van_id,escola_id,turno)
            VALUES (?,?,?,?,?,?)`, [responsavel, destino.id, aluno, van, filho.escola_id, filho.turno]);
        const [c] = await con.execute("INSERT INTO contrato (vinculo_id) VALUES (?)", [v.insertId]);
        return { vinculo_id: v.insertId, contrato_id: c.insertId, status: "pendente" };
    });
    res.status(201).json(pedido);
});

const partes = `FROM contrato c JOIN vinculo v ON v.id = c.vinculo_id
    JOIN motorista m ON m.id = v.motorista_id`;
const participante = "(v.representante_id = ? OR m.representante_id = ?)";

router.get("/vinculos", autenticarUsuario, async (req, res) => {
    const uid = req.usuario.id;
    const [rows] = await db.execute(`SELECT v.id AS vinculo_id, v.aluno_id, v.van_id, v.status,
        c.id AS contrato_id, c.status AS contrato_status,
        c.confirmado_responsavel_em, c.confirmado_motorista_em
        FROM vinculo v JOIN motorista m ON m.id = v.motorista_id
        LEFT JOIN contrato c ON c.vinculo_id = v.id
        WHERE ${participante} ORDER BY v.id DESC, c.id DESC`, [uid, uid]);
    res.json(rows);
});

async function obterContrato(con, cid, uid, bloquear = false) {
    const [[c]] = await con.execute(`SELECT c.id, c.vinculo_id, c.status, v.status AS vinculo_status,
        v.representante_id, c.confirmado_responsavel_em, c.confirmado_motorista_em,
        c.pdf IS NOT NULL AS tem_pdf ${partes} WHERE c.id = ? AND ${participante}
        ${bloquear ? "FOR UPDATE" : ""}`, [cid, uid, uid]);
    if (!c) falha(404, "Contrato não encontrado.");
    return c;
}

router.put("/contratos/:id/pdf", autenticarUsuario, express.raw({ type: "application/pdf", limit: "2mb" }),
    async (req, res) => {
        const cid = id(Number(req.params.id));
        const uid = req.usuario.id;
        await obterContrato(db, cid, uid);
        if (!req.is("application/pdf")) falha(415, "Envie o corpo como application/pdf.");
        try {
            const pdf = await PDFDocument.load(req.body, { throwOnInvalidObject: true });
            if (!pdf.getPageCount()) throw new Error();
        } catch {
            falha(422, "Envie um PDF válido, com páginas e sem senha.");
        }
        await transacao(async con => {
            const c = await obterContrato(con, cid, uid, true);
            if (c.vinculo_status !== "pendente" || !["aguardando_envio","aguardando_confirmacao"].includes(c.status)
                || c.confirmado_responsavel_em || c.confirmado_motorista_em) {
                falha(409, "Este contrato não permite alteração do PDF.");
            }
            await con.execute(`UPDATE contrato SET pdf = ?, arquivo = NULL, data_envio = NOW(),
                status = 'aguardando_confirmacao' WHERE id = ?`, [req.body, cid]);
        });
        res.sendStatus(204);
    });

router.get("/contratos/:id/pdf", autenticarUsuario, async (req, res) => {
    const uid = req.usuario.id;
    const [[c]] = await db.execute(`SELECT c.pdf ${partes} WHERE c.id = ? AND ${participante}`,
        [id(Number(req.params.id)), uid, uid]);
    if (!c?.pdf) falha(404, "PDF indisponível.");
    res.set("Cache-Control", "no-store").attachment("contrato.pdf").send(c.pdf);
});

router.post("/contratos/:id/confirmacoes", autenticarUsuario, async (req, res) => {
    const cid = id(Number(req.params.id));
    const uid = req.usuario.id;
    const status = await transacao(async con => {
        const c = await obterContrato(con, cid, uid, true);
        if (c.status === "ativo" && c.vinculo_status === "ativo") return "ativo";
        if (c.vinculo_status !== "pendente" || c.status !== "aguardando_confirmacao" || !c.tem_pdf) {
            falha(409, "O contrato não está disponível para confirmação.");
        }
        const responsavel = uid === c.representante_id;
        const campo = responsavel ? "confirmado_responsavel_em" : "confirmado_motorista_em";
        await con.execute(`UPDATE contrato SET ${campo} = COALESCE(${campo}, NOW()) WHERE id = ?`, [cid]);
        const outroAceitou = responsavel ? c.confirmado_motorista_em : c.confirmado_responsavel_em;
        if (!outroAceitou) return "aguardando_confirmacao";
        await con.execute("UPDATE contrato SET status = 'ativo', data_confirmacao = NOW() WHERE id = ?", [cid]);
        await con.execute("UPDATE vinculo SET status = 'ativo' WHERE id = ?", [c.vinculo_id]);
        return "ativo";
    });
    res.json({ status });
});

router.use((erro, req, res, next) => {
    if (res.headersSent) return next(erro);
    const status = erro.status || 500;
    const mensagem = status === 500 ? "Erro ao processar a solicitação." : erro.message;
    res.status(status).json({ mensagem });
});

export default router;
