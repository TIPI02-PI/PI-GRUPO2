# Lumio — Verificação de assinatura

Documentação do módulo de assinatura do motorista, desenvolvido em **JavaScript, Node.js, Express e MySQL**, seguindo os diretórios existentes do backend.

**Situação atual:** o Lumio é gratuito. A checagem de assinatura paga fica desativada por padrão e poderá ser habilitada quando a equipe implementar a tabela e o fluxo de cobrança.

> Este README é específico do backend. Ele não substitui o `README.md` principal que já existe na raiz do repositório.

## 1. Funcionalidades

- Autenticação por JWT, utilizando o middleware já existente `src/middleware/autenticar.js`.
- Identificação do motorista por `motorista.representante_id`.
- Liberação de motoristas ativos no modo gratuito, sem consultar uma tabela de assinaturas.
- Bloqueio de usuários que não são motoristas ou possuem cadastro de motorista inativo/bloqueado.
- Estrutura pronta para verificar assinatura ativa, cancelada, pendente, não iniciada ou vencida no futuro.
- Middleware reutilizável para proteger outras rotas profissionais.

Não inclui CRUD de vans, dashboard, gateway de pagamento nem alteração do banco de dados.

## 2. Arquivos adicionados

```text
back-end/
├── README.md
├── src/
│   ├── controllers/
│   │   └── assinaturaController.js
│   ├── middleware/
│   │   ├── autenticar.js
│   │   ├── avaliarAssinatura.js
│   │   └── exigirAssinaturaAtiva.js
│   └── routers/
│       └── assinaturaRouters.js
└── tests/
    └── assinatura.test.js
```

`autenticar.js` **já existe no projeto**, por isso não está incluído nos arquivos novos e não deve ser substituído.

## 3. Instalação

Na raiz do repositório:

```bash
cd back-end
npm ci
```

Crie o `.env` a partir do `example.env` que já existe em `back-end/`. Configure os dados do seu MySQL e a chave JWT. Exemplo:

```dotenv
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=Lumio
JWT_SECRET=substitua-por-uma-chave-forte-e-privada
JWT_EXPIRES_IN=1d
ASSINATURA_OBRIGATORIA=false
```

A variável `ASSINATURA_OBRIGATORIA` é opcional: se não estiver definida, o módulo também funciona em modo gratuito.

**Atenção ao banco:** o arquivo `back-end/db.sql` disponível no projeto contém `DROP DATABASE IF EXISTS Lumio`. Execute esse script **somente em um banco descartável de desenvolvimento**, pois ele apaga os dados anteriores. Se o MySQL diferenciar maiúsculas e minúsculas, use em `DB_NAME` o nome exato do banco.

Não suba `.env`, senhas ou tokens para o GitHub.

## 4. Registrar as rotas

No `back-end/app.js`, inclua junto aos imports:

```javascript
import assinaturaRotas from "./src/routers/assinaturaRouters.js";
```

Depois das configurações de middleware e junto às outras rotas:

```javascript
app.use("/api/assinatura", assinaturaRotas);
```

Não remova o registro existente de `/api/usuarios`.

Inicie o backend dentro de `back-end/`:

```bash
npm run dev
```

O servidor usa a porta informada em `PORT`.

## 5. Endpoints

| Método | Endpoint | Autenticação | Finalidade |
|---|---|---|---|
| `GET` | `/api/assinatura/status` | Token JWT | Consultar o status de acesso |
| `GET` | `/api/assinatura/verificar-acesso` | Token JWT | Validar se a área profissional pode ser acessada |

Ambas as rotas exigem `Authorization: Bearer SEU_TOKEN`.

### 5.1. Fazer login

```http
POST http://localhost:3000/api/usuarios/login
Content-Type: application/json

{
  "email": "motorista@exemplo.com",
  "senha": "senha-de-teste"
}
```

Utilize as credenciais de um **usuário de teste já cadastrado** como motorista. Copie o `token` retornado pelo login.

### 5.2. Consultar status

```http
GET http://localhost:3000/api/assinatura/status
Authorization: Bearer SEU_TOKEN
```

Exemplo de resposta para um motorista ativo com a assinatura opcional:

```json
{
  "motorista": true,
  "motoristaId": 1,
  "assinaturaObrigatoria": false,
  "acessoLiberado": true,
  "codigo": "GRATUITO",
  "mensagem": "Acesso liberado no modo gratuito."
}
```

### 5.3. Verificar o acesso profissional

```http
GET http://localhost:3000/api/assinatura/verificar-acesso
Authorization: Bearer SEU_TOKEN
```

Resultado esperado em modo gratuito para um motorista ativo: **HTTP 200** com `acessoLiberado: true`.

Caso o token esteja ausente ou seja inválido, a API retorna **HTTP 401**. Caso a conta não seja de motorista ou o motorista esteja inativo/bloqueado, retorna **HTTP 403**.

## 6. Testes automatizados

Os testes utilizam `node:test` e `node:assert`, recursos nativos do Node.js. **Não é necessário instalar bibliotecas de teste.**

Na pasta `back-end/`, execute:

```bash
node --test tests/assinatura.test.js
```

Esse comando executa **oito testes unitários** de regras de assinatura. Eles não exigem MySQL nem servidor em execução.

Os testes unitários verificam:

| Cenário | Resultado esperado |
|---|---|
| Assinatura ativa e paga | Acesso liberado |
| Sem assinatura | Bloqueado |
| Cancelada | Bloqueado |
| Pagamento pendente | Bloqueado |
| Sem confirmação de pagamento | Bloqueado |
| Ainda não iniciada | Bloqueado |
| Vencida | Bloqueado |
| Status desconhecido | Bloqueado |

### 6.1. Testes da API em execução

Para executar também os **cinco testes de integração**, o backend precisa estar rodando com MySQL e com `ASSINATURA_OBRIGATORIA=false`.

Configure variáveis de ambiente com contas **de teste** (uma de motorista ativo e outra de responsável sem cadastro de motorista).

**PowerShell (Windows):**

```powershell
$env:TEST_API_URL="http://localhost:3000"
$env:TEST_MOTORISTA_EMAIL="motorista@exemplo.com"
$env:TEST_MOTORISTA_SENHA="senha-de-teste"
$env:TEST_RESPONSAVEL_EMAIL="responsavel@exemplo.com"
$env:TEST_RESPONSAVEL_SENHA="senha-de-teste"
node --test tests/assinatura.test.js
```

**Bash (Linux/macOS):**

```bash
TEST_API_URL="http://localhost:3000" \
TEST_MOTORISTA_EMAIL="motorista@exemplo.com" \
TEST_MOTORISTA_SENHA="senha-de-teste" \
TEST_RESPONSAVEL_EMAIL="responsavel@exemplo.com" \
TEST_RESPONSAVEL_SENHA="senha-de-teste" \
node --test tests/assinatura.test.js
```

Substitua os endereços e senhas pelos dados de teste locais. Os testes de integração verificam token ausente, token inválido, acesso gratuito de motorista ativo e bloqueio de responsável.

Se `TEST_API_URL` não estiver definido, os testes de integração são **ignorados**. Se faltarem as credenciais de motorista ou responsável, os testes específicos dessas contas também serão ignorados. Confira os totais de `pass`, `fail` e `skip` ao final da execução.

## 7. Proteção de novas rotas

Quando a equipe criar rotas profissionais, poderá reaproveitar o middleware:

```javascript
import autenticar from "../middleware/autenticar.js";
import exigirAssinaturaAtiva from "../middleware/exigirAssinaturaAtiva.js";

router.get("/rota-profissional", autenticar, exigirAssinaturaAtiva, controlador);
```

A rota de exemplo acima é apenas uma orientação de integração; ela não faz parte deste módulo.

## 8. Ativação futura do modo pago

Para manter o projeto gratuito:

```dotenv
ASSINATURA_OBRIGATORIA=false
```

Quando a equipe implementar os pagamentos, será possível configurar `ASSINATURA_OBRIGATORIA=true`. Porém, **não ative essa opção agora**: o `db.sql` atual não possui a tabela `assinaturas_motorista`.

A consulta preparada para o modo pago espera os campos:

- `id`
- `motorista_id`
- `status`
- `data_inicio`
- `data_fim`
- `pagamento_confirmado_em`
- `criado_em`

Antes da ativação, a equipe precisará definir o esquema definitivo, criar a migração e integrar a confirmação real do pagamento. Sem isso, as consultas do modo pago retornarão erro de servidor, e o acesso não será liberado.

## 9. Subir ao GitHub

Depois de copiar os arquivos para o projeto, registrar as rotas em `app.js` e executar os testes:

```bash
git add back-end/README.md back-end/src/controllers/assinaturaController.js back-end/src/middleware/avaliarAssinatura.js back-end/src/middleware/exigirAssinaturaAtiva.js back-end/src/routers/assinaturaRouters.js back-end/tests/assinatura.test.js back-end/app.js
git commit -m "Adiciona verificacao de assinatura e testes"
git push
```

Esses comandos devem ser executados na raiz do repositório, em uma branch na qual você tenha permissão de escrita. Confira as alterações antes do commit.

---

**Escopo desta entrega:** verificação de assinatura, controle de acesso e testes. O Lumio continua gratuito por padrão.
