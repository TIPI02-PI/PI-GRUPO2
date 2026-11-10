import jwt from "jsonwebtoken";

export function autenticarUsuario(req, res, next) {
  const authorization = req.headers.authorization ?? "";
  const [tipo, token] = authorization.split(" ");

  if (tipo !== "Bearer" || !token) {
    return res.status(401).json({ mensagem: "Token não informado." });
  }

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
    const id = Number(usuario.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(401).json({ mensagem: "Token inválido." });
    }

    req.usuario = { id };
    return next();
  } catch {
    return res.status(401).json({ mensagem: "Token inválido ou expirado." });
  }
}
