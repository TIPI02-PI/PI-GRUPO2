# Daily — 04/11/2026

**Projeto:** Lumio (Projeto Integrador)
**Figma:** [Projeto Integrador](https://www.figma.com/design/YklZ8NiIhgwh6Qd1facwef/Projeto-Integrador?node-id=3-3)

O arquivo do Figma tem 4 páginas: **Prototipo** (cores e componentes base), **Design System** (telas mobile), **Desktop** (painel web) e **Fluxo** (mapa de navegação do app).

---

## ✅ Já desenhado

### Telas de entrada (mobile)

| Tela | O que tem |
|---|---|
| Splash Screen | Logo Lumio e o slogan "Acompanhando cada trajeto" |
| Welcome Screen | Logo, slogan e botões **Entrar** e **Cadastrar-se** |
| Login | E-mail e senha (com ícone de mostrar senha), botão Entrar, opção "Continue com Google" e link para criar conta |
| Cadastro, passo 1/3 | Nome completo, e-mail, CPF ou CNPJ, botão Cadastrar e opção com Google |
| Cadastro, passo 2/3 | Endereço: CEP, logradouro, número, complemento (opcional), bairro, cidade e estado |
| Cadastro, passo 3/3 | Criar senha e confirmar senha |

![Splash Screen](imagens/01-splash.png)
![Welcome Screen](imagens/02-boas-vindas.png)
![Login](imagens/03-login.png)
![Cadastro, passo 1/3](imagens/04-cadastro-passo1.png)

### Design System

- Paleta de cores organizada em grupos: ações e destaques, textos principais, azul institucional, azul secundário, superfícies claras e campos e contrastes.
- Logo do Lumio.
- Componente **Bottom Bar** com uma variação para cada perfil (padrão/motorista, responsável, auxiliar e administração).

### Fluxo de telas do app mobile

Página **Fluxo** com o mapa de navegação, da tela de carregamento até o uso diário de cada perfil (Responsável, Motorista, Auxiliar e Administrador). Está dividido em três partes:

1. **Entrada**, comum a todos: abrir o app, entrar, recuperar senha e criar conta.
2. **Áreas por perfil**, uma raia para cada perfil, com os passos do primeiro acesso e do dia a dia.
3. **Regras para todo o app**: notificação abre a tela certa, troca de perfil, permissões pedidas no momento certo e estados do mapa ao vivo.

![Fluxo de telas](imagens/07-fluxo.png)

---

## 🚧 Em andamento

### Telas iniciais de cada perfil (mobile)

Os quatro frames de início já existem, com o fundo em gradiente e a barra de navegação inferior de cada perfil. O conteúdo das telas ainda não foi desenhado.

| Perfil | Situação |
|---|---|
| Início — Motorista | Fundo, barra inferior e ícone de notificação |
| Início — Auxiliar | Fundo e barra inferior |
| Início — Responsável | Fundo e barra inferior |
| Início — Administração | Fundo e barra inferior |

![Início — Motorista](imagens/05-home-motorista.png)

### Versão desktop

Painel **"Lumio — Planejamento de rotas"** com:

- menu de navegação (Rotas, Alunos, Minha perua), ajuda e perfil do usuário;
- título "Dashboard" e quatro cards de resumo;
- área grande reservada ao **mapa** e um painel lateral.

Os cards e o painel lateral ainda estão sem conteúdo. Os frames **Desktop - 1**, **Desktop - Etapa 1** e **Desktop - Etapa 2** foram criados, mas continuam vazios.

![Dashboard desktop](imagens/06-desktop-dashboard.png)

---

## 🔜 Próximos passos

- [ ] Desenhar o conteúdo das telas iniciais de Motorista, Auxiliar, Responsável e Administração
- [ ] Preencher os cards e o painel lateral do dashboard desktop
- [ ] Desenhar as telas de Desktop - Etapa 1 e Etapa 2