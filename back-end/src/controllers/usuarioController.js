import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../config/db.js";

export const gerarToken = (usuario) => {
    const payload = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role
    };

    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};

export async function cadastrarUsuario(req, res) {
    try {
        const {
            nome,
            email,
            senha,
            tipo_documento,
            documento,
            google_id,
            foto,
            tipo_usuario
        } = req.body;

        if (!nome || !email || !senha || !tipo_documento || !documento) {
            return res.status(400).json({
                mensagem: "Nome, email, senha, tipo de documento e documento são obrigatórios."
            });
        }

        if (tipo_usuario !== "responsavel" && tipo_usuario !== "motorista") {
            return res.status(400).json({
                mensagem: "Tipo de usuário deve ser 'responsavel' ou 'motorista'."
            });
        }

        const [emailExistentes] = await db.execute(
            "SELECT id FROM representante WHERE email = ?",
            [email.trim()]
        );
        const [documentoExistentes] = await db.execute(
            "SELECT id FROM representante WHERE documento = ?",
            [documento]
        );

        if (emailExistentes.length > 0) {
            return res.status(409).json({
                mensagem: "Este email já está cadastrado."
            });
        };

        if (documentoExistentes.length > 0) {
            return res.status(409).json({
                mensagem: "Esse CPF/CNPJ já está cadastrado."
            });
        };

        if (google_id) {
            const [googleIdExistente] = await db.execute(
                "SELECT id FROM representante WHERE google_id = ?",
                [google_id]
            );

            if (googleIdExistente.length > 0){
                return res.status(409).json({
                    mensagem: "Google ID já cadastrado."
                });
            };
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const [resultado] = await db.execute(
            `
            INSERT INTO representante
            (
                nome,
                email,
                senha,
                tipo_documento,
                documento,
                google_id,
                foto,
                role
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                nome.trim(),
                email.trim(),
                senhaHash,
                tipo_documento,
                documento,
                google_id || null,
                foto || null,
                "user"
            ]
        );

        if (tipo_usuario === "motorista") {
            await db.execute(
                "INSERT INTO motorista (representante_id) VALUES (?)",
                [resultado.insertId]
            );
        }

        const usuario = {
            id: resultado.insertId,
            nome: nome.trim(),
            email: email.trim(),
            role: "user",
            tipo_usuario
        };

        const token = gerarToken(usuario);

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso.",
            token,
            usuario
        });

    } catch (erro){
        console.error("Erro ao cadastrar usuário:", erro);

        return res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
}

export async function loginUsuario(req, res){
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: "Email e senha são obrigatórios."
            });
        }

        const [usuarios] = await db.execute(
            "SELECT * FROM representante WHERE email = ?",
            [email.trim()]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                mensagem: "Email ou senha inválidos."
            });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuarios[0].senha);

        if (!senhaCorreta) {
            return res.status(401).json({
                mensagem: "Email ou senha inválidos."
            });
        }

        const [motoristas] = await db.execute(
            "SELECT id FROM motorista WHERE representante_id = ?",
            [usuarios[0].id]
        );

        const usuario = {
            id: usuarios[0].id,
            nome: usuarios[0].nome,
            email: usuarios[0].email,
            role: usuarios[0].role,
            foto: usuarios[0].foto,
            tipo_usuario: motoristas.length > 0 ? "motorista" : "responsavel"
        };

        const token = gerarToken(usuario);

        return res.status(200).json({
            mensagem: "Login realizado com sucesso.",
            token,
            usuario
        });

    } catch (erro) {
        console.error("Erro ao fazer login:", erro);

        return res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
}

export async function loginGoogle(req, res) {
    try {
        const { google_id, email, nome, foto } = req.body;

        if (!google_id || !email || !nome) {
            return res.status(400).json({
                mensagem: "Google ID, email e nome são obrigatórios."
            });
        }

        const [usuarios] = await db.execute(
            "SELECT * FROM representante WHERE google_id = ?",
            [google_id]
        );

        let usuario;

        if (usuarios.length > 0) {
            usuario = {
                id: usuarios[0].id,
                nome: usuarios[0].nome,
                email: usuarios[0].email,
                role: usuarios[0].role,
                foto: usuarios[0].foto
            };
        } else {
            const [emailExistentes] = await db.execute(
                "SELECT id FROM representante WHERE email = ?",
                [email.trim()]
            );

            if (emailExistentes.length > 0) {
                return res.status(409).json({
                    mensagem: "Este email já está cadastrado. Entre com email e senha."
                });
            }

            const senhaHash = await bcrypt.hash(crypto.randomUUID(), 10);

            const [resultado] = await db.execute(
                `
                INSERT INTO representante
                (
                    nome,
                    email,
                    senha,
                    google_id,
                    foto,
                    role
                )
                VALUES (?, ?, ?, ?, ?, ?)
                `,
                [
                    nome.trim(),
                    email.trim(),
                    senhaHash,
                    google_id,
                    foto || null,
                    "user"
                ]
            );

            usuario = {
                id: resultado.insertId,
                nome: nome.trim(),
                email: email.trim(),
                role: "user",
                foto: foto || null
            };
        }

        const token = gerarToken(usuario);

        return res.status(200).json({
            mensagem: "Login com Google realizado com sucesso.",
            token,
            usuario
        });

    } catch (erro) {
        console.error("Erro ao fazer login com Google:", erro);

        return res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
}

export async function esqueciSenha(req, res) {
    try {
        // fazer ainda

    } catch (erro) {
        console.error("Erro ao solicitar recuperação de senha:", erro);

        return res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
}

export async function redefinirSenha(req, res) {
    try {
        // fazer ainda

    } catch (erro) {
        console.error("Erro ao redefinir senha:", erro);

        return res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
}

export async function cadastrarEndereco(req, res) {
    try {
        const {
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            latitude,
            longitude
        } = req.body;

        if (!cep || !numero || !bairro || !cidade || !estado) {
            return res.status(400).json({
                mensagem: "CEP, número, bairro, cidade e estado são obrigatórios."
            });
        }

        const [resultado] = await db.execute(
            `
            INSERT INTO enderecos
            (
                representante_id,
                cep,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                latitude,
                longitude
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                req.usuarios.id,
                cep,
                logradouro || null,
                numero,
                complemento || null,
                bairro,
                cidade,
                estado,
                latitude || null,
                longitude || null
            ]
        );

        return res.status(201).json({
            mensagem: "Endereço cadastrado com sucesso.",
            id: resultado.insertId
        });

    } catch (erro) {
        console.error("Erro ao cadastrar endereço:", erro);

        return res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
}
