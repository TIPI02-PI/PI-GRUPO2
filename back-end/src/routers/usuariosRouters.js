import { Router } from "express";

import {cadastrarUsuario, loginUsuario, loginGoogle, esqueciSenha, redefinirSenha
} from "../controllers/usuarioController.js";

const router = Router();

router.post("/cadastro", cadastrarUsuario);
router.post("/login", loginUsuario);
router.post("/login/google", loginGoogle);

router.post("/esqueci-senha", esqueciSenha);
router.post("/redefinir-senha", redefinirSenha);

export default router;
