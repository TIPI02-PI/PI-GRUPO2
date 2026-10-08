
import axios from "axios";

const viaCepApi = axios.create({
    baseURL: "https://viacep.com.br/ws",
    timeout: 5000
});

export async function buscarCep(cep) {
    const cepLimpo = String(cep ?? "").replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
        return null;
    }

    try {
        const resposta = await viaCepApi.get(`/${cepLimpo}/json/`);
        const dados = resposta.data;

        if (!dados || dados.erro === true) {
            return null;
        }

        return {
            cep: cepLimpo,
            logradouro: dados.logradouro || "",
            bairro: dados.bairro || "",
            cidade: dados.localidade || "",
            estado: dados.uf || "",
            complemento: dados.complemento || ""
        };

    } catch (erro) {
        console.error("Erro ao consultar o ViaCEP:", erro.message);
        return null;
    }
}
