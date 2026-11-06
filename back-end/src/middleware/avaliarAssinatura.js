export function avaliarAssinatura(assinatura) {
    if (!assinatura) {
        return {
            acessoLiberado: false,
            codigo: "SEM_ASSINATURA",
            mensagem: "Nenhuma assinatura encontrada."
        };
    }

    if (assinatura.status === "cancelada") {
        return {
            acessoLiberado: false,
            codigo: "CANCELADA",
            mensagem: "A assinatura foi cancelada."
        };
    }

    if (assinatura.status === "pendente") {
        return {
            acessoLiberado: false,
            codigo: "PENDENTE",
            mensagem: "Assinatura aguardando pagamento."
        };
    }

    if (assinatura.status !== "ativa" || !assinatura.pagamento_confirmado_em) {
        return {
            acessoLiberado: false,
            codigo: "INATIVA",
            mensagem: "A assinatura não está ativa."
        };
    }

    if (!assinatura.iniciou) {
        return {
            acessoLiberado: false,
            codigo: "NAO_INICIADA",
            mensagem: "A assinatura ainda não começou."
        };
    }

    if (!assinatura.valida) {
        return {
            acessoLiberado: false,
            codigo: "VENCIDA",
            mensagem: "A assinatura está vencida."
        };
    }

    return {
        acessoLiberado: true,
        codigo: "ATIVA",
        mensagem: "Acesso liberado."
    };
}
