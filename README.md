# API de Pedidos — Luminio

API REST desenvolvida com **Node.js e Express** para gerenciamento de pedidos.

## O que foi desenvolvido

* Utilização do **Express**
* Middleware `express.json()`
* Armazenamento temporário dos pedidos em um **Array**
* 5 registros iniciais para testes
* Rotas **GET, POST, PUT, PATCH e DELETE**
* Utilização de `req.params` para identificação dos pedidos
* Utilização de `req.body` para envio de dados
* Validação de pedidos e IDs
* Retorno de códigos HTTP adequados

## Rotas principais

| Método | Rota           | Função                     |
| ------ | -------------- | -------------------------- |
| GET    | `/pedidos`     | Lista todos os pedidos     |
| GET    | `/pedidos/:id` | Busca um pedido específico |
| POST   | `/pedidos`     | Cadastra um novo pedido    |
| PUT    | `/pedidos/:id` | Altera um pedido           |
| PATCH  | `/pedidos/:id` | Altera o endereço          |
| DELETE | `/pedidos/:id` | Exclui um pedido           |

## Exemplo

Os pedidos são armazenados temporariamente em um Array:

```javascript
const pedidos = [
    {
        id: 1,
        pedido: "cimento",
        endereco: "Rua da rua 45",
        pagamento: "PIX"
    }
];
```

Também foram implementadas validações para situações como **pedido não encontrado, ID duplicado, dados obrigatórios ausentes e exclusão não confirmada**.

## Tecnologias

* Node.js
* Express
* JavaScript
* API REST
