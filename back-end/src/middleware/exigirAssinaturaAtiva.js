import { obterSituacaoAssinatura } from "../controllers/assinaturaController.js";

export default async function exigirAssinaturaAtiva(req, res, next) {
    if (!req.usuarios?.id) {
        return res.status(401).json({
            mensagem: "Usuário não autenticado."
        });
    }

    try {
        const situacao = await obterSituacaoAssinatura(req.usuarios.id);

        if (!situacao.acessoLiberado) {
            return res.status(403).json(situacao);
        }

        req.assinatura = situacao;
        next();
    } catch (erro) {
        console.error("Erro ao verificar assinatura:", erro);

        return res.status(500).json({
            mensagem: "Não foi possível verificar a assinatura."
        });
    }
}
