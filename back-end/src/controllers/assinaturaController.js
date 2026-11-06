import db from "../config/db.js";
import { avaliarAssinatura } from "../middleware/avaliarAssinatura.js";

export async function obterSituacaoAssinatura(representanteId) {
    const assinaturaObrigatoria = process.env.ASSINATURA_OBRIGATORIA === "true";

    const [motoristas] = await db.execute(
        "SELECT id, status FROM motorista WHERE representante_id = ? LIMIT 1",
        [representanteId]
    );

    if (motoristas.length === 0) {
        return {
            motorista: false,
            assinaturaObrigatoria,
            acessoLiberado: false,
            codigo: "NAO_E_MOTORISTA",
            mensagem: "Esta conta não possui cadastro de motorista."
        };
    }

    const motorista = motoristas[0];

    if (motorista.status !== "ativo") {
        return {
            motorista: true,
            motoristaId: motorista.id,
            assinaturaObrigatoria,
            acessoLiberado: false,
            codigo: "MOTORISTA_INATIVO",
            mensagem: "O cadastro do motorista não está ativo."
        };
    }

    if (!assinaturaObrigatoria) {
        return {
            motorista: true,
            motoristaId: motorista.id,
            assinaturaObrigatoria: false,
            acessoLiberado: true,
            codigo: "GRATUITO",
            mensagem: "Acesso liberado no modo gratuito."
        };
    }

    const [assinaturas] = await db.execute(
        `SELECT id, status, data_fim, pagamento_confirmado_em,
                (data_inicio <= NOW()) AS iniciou,
                (data_fim > NOW()) AS valida
         FROM assinaturas_motorista
         WHERE motorista_id = ?
         ORDER BY criado_em DESC, id DESC
         LIMIT 1`,
        [motorista.id]
    );

    const assinatura = assinaturas[0] || null;

    return {
        motorista: true,
        motoristaId: motorista.id,
        assinaturaObrigatoria: true,
        assinaturaId: assinatura?.id ?? null,
        dataVencimento: assinatura?.data_fim ?? null,
        ...avaliarAssinatura(assinatura)
    };
}

export async function consultarAssinatura(req, res) {
    try {
        const situacao = await obterSituacaoAssinatura(req.usuarios.id);

        return res.status(situacao.motorista ? 200 : 403).json(situacao);
    } catch (erro) {
        console.error("Erro ao consultar assinatura:", erro);

        return res.status(500).json({
            mensagem: "Não foi possível consultar a assinatura."
        });
    }
}

export function verificarAcesso(req, res) {
    return res.status(200).json(req.assinatura);
}
