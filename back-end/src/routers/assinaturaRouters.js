import { Router } from "express";
import { autenticarUsuario } from "../middlewares/autenticarUsuario.js";
import { exigirAssinaturaAtiva } from "../middlewares/exigirAssinaturaAtiva.js";
import { consultarAssinatura, verificarAcesso } from "../controllers/assinaturaController.js";

const router = Router();

router.get("/status", autenticarUsuario, consultarAssinatura);
router.get("/verificar-acesso", autenticarUsuario, exigirAssinaturaAtiva, verificarAcesso);

export default router;
