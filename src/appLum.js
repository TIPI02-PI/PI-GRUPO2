// Requisitos tecnicos obrigatorios 
// • Uso do Express 
// • Middleware express.json() 
// • Array para armazenamento temporario dos dados 
// • Pelo menos 5 registros de teste 
// • Rotas GET, POST, PUT e DELETE 
// • Uso de req.params 
// • Uso de req.body 
// • Retorno de codigos HTTP adequados 

import express from "express";

const app = express();

app.use(express.json());

// Variavel Array dos pedidos separados por ID.
const pedidos =[
    {
        id:1,
        pedido:"cimento",
        endereco:"Rua da rua 45",
        pagamento:"PIX"
    },
    {
        id:2,
        pedido:"cachorro quente",
        endereco:"Rua da rua 32",
        pagamento:"PIX"
    },
    {
        id:3,
        pedido:"pizza",
        endereco:"Rua da rua 98",
        pagamento:"Cartão - débito"
    },
    {
        id:4,
        pedido:"gasolina",
        endereco:"Rua da rua 72",
        pagamento:"PIX"
    },
    {
        id:5,
        pedido:"computador",
        endereco:"Rua que não é da rua 57",
        pagamento:"Cartão - crédito"
    }
];


// Função para buscar pedido pelo id.
const buscarPedido = (id) => {
    return pedidos.findIndex(pedido =>{
        return pedido.id === Number(id);
    });
};

// Root
app.get("/", (req, res) =>{
    res.status(200).send("Lista de pedidos Luminio.");
});


// Mostrar todos pedidos.
app.get("/pedidos", (req, res) =>{
    res.status(200).json(pedidos)
});


// Buscar por um pedido especifico. 
app.get("/pedidos/:id", (req, res) => {
    const index = buscarPedido(req.params.id);

    if (index === -1) {
        return res.status(404).send("Pedido não encontrado.");
    }


    res.status(200).json(pedidos[index]);
});


// Modificar um pedido.
app.put("/pedidos/:id", (req, res) =>{
    const index = buscarPedido(req.params.id);

    if (index === -1) {
        return res.status(404).send("Pedido não encontrado.");
    }


    pedidos[index].pedido = req.body.pedido;
    res.status(200).json(pedidos[index]);
});

app.patch("/pedidos/:id", (req, res) =>{
    const index = buscarPedido(req.params.id);

    if (index === -1) {
        return res.status(404).send("Pedido não encontrado.");
    }

    pedidos[index].endereco = req.body.endereco;
    res.status(200).json(pedidos[index]);
});

// Cadastrar um pedido novo.
app.post("/pedidos", (req, res) => {
    if (!req.body.id) {
        return res.status(400).send("O ID é obrigatório.");
    }

    const existe = pedidos.some(pedido => pedido.id === req.body.id);

    if (existe) {
        return res.status(409).send("O ID já existe.");
    }

    pedidos.push(req.body);

    res.status(201).send("Pedido cadastrado.");
});

// Deletar pedido especifico.
app.delete("/pedidos/:id", (req, res) => {
    const index = buscarPedido(req.params.id);
 
    if (index === -1) {
        return res.status(404).send("Pedido não encontrado.");
    }
 
    if (req.body.confirmar !== true) {
        return res.status(400).send("Exclusão não confirmada.");
    }
 
    pedidos.splice(index, 1);
 
    res.status(200).send("Pedido deletado.");
});


 

export default app;