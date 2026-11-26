import { Router } from "express";

import autenticar from "../middleware/autenticar.js";
import {cadastrarUsuario, loginUsuario, loginGoogle, esqueciSenha, redefinirSenha, cadastrarEndereco
} from "../controllers/usuarioController.js";

const router = Router();

router.post("/cadastro", cadastrarUsuario);
router.post("/login", loginUsuario);
router.post("/login/google", loginGoogle);

router.post("/esqueci-senha", esqueciSenha);
router.post("/redefinir-senha", redefinirSenha);

router.post("/endereco", autenticar, cadastrarEndereco);

export default router;
