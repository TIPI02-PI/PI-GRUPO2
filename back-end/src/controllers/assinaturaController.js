import { buscarMotorista, buscarAssinatura } from "../models/assinaturaModel.js";

export async function obterSituacaoAssinatura(representanteId) {
  const motorista = await buscarMotorista(representanteId);

  if (!motorista) {
    return {
      motorista: false,
      acessoLiberado: false,
      codigo: "NAO_E_MOTORISTA",
      mensagem: "Esta conta não possui cadastro de motorista."
    };
  }

  const assinaturaObrigatoria = process.env.ASSINATURA_OBRIGATORIA === "true";

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

  const assinatura = await buscarAssinatura(motorista.id);
  const resultado = {
    motorista: true,
    motoristaId: motorista.id,
    assinaturaObrigatoria: true,
    assinaturaId: assinatura?.id ?? null,
    dataVencimento: assinatura?.data_fim ?? null,
    acessoLiberado: false
  };

  if (!assinatura) {
    return { ...resultado, codigo: "SEM_ASSINATURA", mensagem: "Nenhuma assinatura encontrada." };
  }

  if (assinatura.status === "cancelada") {
    return { ...resultado, codigo: "CANCELADA", mensagem: "A assinatura foi cancelada." };
  }

  if (assinatura.status === "pendente") {
    return { ...resultado, codigo: "PENDENTE", mensagem: "Assinatura aguardando pagamento." };
  }

  if (assinatura.status !== "ativa" || !assinatura.pagamento_confirmado_em) {
    return { ...resultado, codigo: "INATIVA", mensagem: "A assinatura não está ativa." };
  }

  if (!assinatura.iniciou) {
    return { ...resultado, codigo: "NAO_INICIADA", mensagem: "A assinatura ainda não começou." };
  }

  if (!assinatura.valida) {
    return { ...resultado, codigo: "VENCIDA", mensagem: "A assinatura está vencida." };
  }

  return { ...resultado, acessoLiberado: true, codigo: "ATIVA", mensagem: "Acesso liberado." };
}

export async function consultarAssinatura(req, res) {
  try {
    const situacao = await obterSituacaoAssinatura(req.usuario.id);
    return res.status(situacao.motorista ? 200 : 403).json(situacao);
  } catch (erro) {
    console.error("Erro ao consultar assinatura:", erro);
    return res.status(500).json({ mensagem: "Não foi possível consultar a assinatura." });
  }
}

export function verificarAcesso(req, res) {
  return res.status(200).json(req.assinatura);
}
