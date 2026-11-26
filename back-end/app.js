import express from "express";
import "dotenv/config";
import cors from "cors";

import usuarioRotas from "./src/routers/usuariosRouters.js";
import vinculosRotas from "./src/routers/vinculosRouters.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuarioRotas);
app.use("/api", vinculosRotas);

app.get("/", (req, res) => {
    res.json({
        mensagem: "API Lumio funcionando!"
    });
});

export default app;
