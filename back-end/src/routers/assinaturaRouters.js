import { Router } from "express";
import autenticar from "../middleware/autenticar.js";
import exigirAssinaturaAtiva from "../middleware/exigirAssinaturaAtiva.js";
import { consultarAssinatura, verificarAcesso } from "../controllers/assinaturaController.js";

const router = Router();

router.get("/status", autenticar, consultarAssinatura);
router.get("/verificar-acesso", autenticar, exigirAssinaturaAtiva, verificarAcesso);

export default router;
