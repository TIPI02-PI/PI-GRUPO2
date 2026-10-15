# Lumio

Plataforma de gestão e acompanhamento de transporte escolar para responsáveis, motoristas e auxiliares.

> **Status do projeto:** planejamento

## Sobre o projeto

O Lumio foi pensado para tornar o transporte escolar mais seguro, organizado e transparente. A plataforma reúne, em um só lugar, o acompanhamento das viagens, a gestão de alunos e vans, o controle de embarques e desembarques, contratos, rotas, notificações e estimativas de gastos.

Para os responsáveis, o sistema oferece uma forma prática de encontrar transportadores, acompanhar o trajeto dos filhos e receber atualizações durante a viagem. Para motoristas e auxiliares, centraliza a operação diária das vans e facilita o controle de passageiros, horários, documentos e custos.

## Sumário

- [Objetivos](#objetivos)
- [Perfis de usuário](#perfis-de-usuário)
- [Modelo de acesso](#modelo-de-acesso)
- [Modelo de assinatura](#modelo-de-assinatura)
- [Pesquisa de vans](#pesquisa-de-vans)
- [Contratos e vínculos](#contratos-e-vínculos)
- [Gestão de vans](#gestão-de-vans)
- [Rotas e viagens](#rotas-e-viagens)
- [Status da criança](#status-da-criança)
- [Localização e notificações](#localização-e-notificações)
- [Controle de combustível](#controle-de-combustível)
- [Pagamentos](#pagamentos)
- [Áreas do sistema](#áreas-do-sistema)
- [Segurança e privacidade](#segurança-e-privacidade)
- [Regras de negócio](#regras-de-negócio)

## Objetivos

O Lumio busca atender quatro necessidades principais:

- permitir que responsáveis encontrem transporte escolar e acompanhem as viagens de seus filhos;
- ajudar motoristas a administrar vans, alunos, contratos, auxiliares, horários, rotas e custos;
- oferecer aos auxiliares uma lista confiável para conferência de embarques e desembarques;
- fornecer à administração da plataforma os recursos necessários para manter a operação organizada e segura.

## Perfis de usuário

### Responsável

O responsável poderá cadastrar gratuitamente as crianças sob sua responsabilidade, informar escola, turno e pontos de embarque e desembarque, além de:

- pesquisar motoristas e vans disponíveis;
- solicitar ou aceitar um vínculo com um transportador;
- enviar e consultar o contrato firmado com o motorista;
- consultar horários e viagens programadas;
- informar quando a criança não utilizará o transporte;
- acompanhar a van durante uma viagem autorizada;
- receber notificações de embarque, chegada, atraso e ocorrências;
- consultar o status da criança e o histórico de viagens;
- pagar o serviço de transporte pela plataforma, caso o recurso seja disponibilizado.

### Criança ou aluno

A criança não terá conta própria nem acesso direto ao Lumio. Seu cadastro será administrado pelo responsável, e os profissionais autorizados verão somente as informações necessárias para executar o transporte.

O cadastro poderá conter:

- nome e foto autorizada;
- data de nascimento ou faixa etária;
- escola, unidade e turno;
- pontos de embarque e desembarque;
- dias e horários de utilização;
- contatos dos responsáveis;
- observações autorizadas;
- motorista, auxiliar e van vinculados.

### Motorista ou transportador

Depois de contratar um plano, o motorista poderá ativar o perfil profissional e:

- cadastrar uma ou mais vans;
- manter os dados e documentos dos veículos;
- informar escolas e regiões atendidas;
- definir dias, turnos e horários;
- administrar listas de alunos;
- solicitar ou aceitar vínculos com responsáveis;
- enviar e consultar contratos;
- criar rotas e iniciar viagens;
- compartilhar a localização da van durante o trajeto;
- registrar embarques, ausências, desembarques e chegadas;
- cadastrar auxiliares;
- acompanhar distância, consumo e custo estimado de combustível;
- receber pagamentos pela plataforma, caso o recurso seja disponibilizado.

### Auxiliar

O auxiliar será cadastrado ou convidado por um motorista com plano ativo. Seu acesso será limitado às vans, rotas e crianças às quais estiver vinculado.

Entre suas funções estarão:

- consultar a lista de passageiros esperados;
- confirmar embarques e desembarques;
- marcar ausências ou crianças não localizadas;
- registrar ocorrências dentro das permissões recebidas.

### Administrador

A administração do Lumio será responsável por contas, perfis, permissões, planos, cobranças e suporte. Também poderá consultar registros de segurança, analisar denúncias e documentos autorizados e suspender acessos quando necessário.

## Modelo de acesso

Todo usuário começará com um cadastro comum, informando seus dados básicos, criando as credenciais de acesso e aceitando os termos da plataforma.

A partir desse cadastro:

- responsáveis poderão completar o perfil e cadastrar filhos gratuitamente;
- motoristas terão acesso à área de planos e mensalidades;
- as funções profissionais serão liberadas após a confirmação do pagamento;
- auxiliares serão cadastrados ou convidados por motoristas com plano ativo;
- uma mesma pessoa poderá exercer mais de uma função, desde que atenda às regras de cada perfil.

## Modelo de assinatura

O acesso profissional do motorista será pago. A faixa de preço inicialmente considerada para a mensalidade é de **R$ 15,00 a R$ 20,00**, com valor definitivo a ser estabelecido.

A cobrança será organizada por van:

- o plano principal incluirá uma van;
- cada van adicional terá uma cobrança extra;
- cada veículo manterá seus próprios alunos, auxiliares, contratos, rotas, viagens e custos;
- contas com mensalidade pendente poderão ter as funções profissionais limitadas;
- o motorista terá acesso ao plano contratado, vencimentos, vans incluídas e histórico de pagamentos.

## Pesquisa de vans

Responsáveis poderão pesquisar transportadores antes de firmar um vínculo. A busca poderá considerar:

- escola ou unidade escolar;
- região da escola;
- bairro ou região de residência;
- turno e horários de entrada e saída;
- trajeto de ida, volta ou ida e volta;
- disponibilidade informada pelo motorista.

Os resultados poderão exibir o nome do transportador, uma identificação básica da van, regiões e escolas atendidas, turnos, horários, vagas disponíveis e uma opção de contato ou solicitação de atendimento.

Endereços detalhados, localização em tempo real e dados de crianças não serão exibidos publicamente.

## Contratos e vínculos

O Lumio aceitará contratos de transporte escolar celebrados fora da plataforma. Para concluir o vínculo de uma criança com uma van, responsável e motorista deverão enviar o documento firmado entre as partes ou confirmar a mesma cópia anexada ao vínculo.

### Gestão do contrato

O sistema deverá permitir:

- envio do documento pelo responsável e pelo motorista;
- consulta pelas duas partes;
- confirmação do conteúdo acordado;
- registro das datas de envio e confirmação;
- substituição do arquivo em caso de renovação ou correção;
- acompanhamento do estado do contrato: aguardando envio, aguardando confirmação, ativo, encerrado ou vencido;
- acesso restrito às partes e aos administradores autorizados.

O armazenamento do documento no Lumio não substitui as responsabilidades legais do responsável ou do transportador. A plataforma servirá como meio de registro e organização do contrato.

### Fluxo de vínculo

1. O responsável cria sua conta e aceita os termos aplicáveis.
2. A criança é cadastrada gratuitamente.
3. Escola, turno e pontos de embarque e desembarque são informados.
4. O responsável pesquisa uma van ou recebe um convite do motorista.
5. Uma das partes envia a solicitação de vínculo.
6. A outra parte aceita a solicitação.
7. Responsável e motorista enviam ou confirmam o contrato.
8. O motorista associa a criança à van e à rota corretas.
9. Dias e horários são definidos.
10. O responsável revisa os dados.
11. A criança passa a integrar as viagens programadas.

O vínculo registrará o responsável contratante, a criança, o transportador, a van, o auxiliar quando houver, a escola, o turno, os trajetos, os horários e a situação do contrato.

## Gestão de vans

Cada van terá um cadastro independente, com dados como:

- identificação, placa e capacidade;
- documentos do veículo;
- tipo de combustível e consumo médio em km/L;
- motorista principal e possíveis substitutos;
- auxiliares vinculados;
- escolas e regiões atendidas;
- rotas e horários;
- crianças e contratos vinculados;
- situação da assinatura.

Uma van desativada não poderá ser usada em novas viagens. Seus contratos, vínculos, custos e históricos serão preservados conforme as regras de retenção da plataforma.

## Rotas e viagens

As rotas serão planejadas a partir da van selecionada, do ponto inicial, dos locais de embarque e das escolas de destino. O sistema deverá considerar horários escolares, crianças previstas ou ausentes, ordem das paradas e trajetos de ida e volta.

Quando um responsável informar que a criança não utilizará o transporte, a parada poderá ser retirada da rota do dia e a sequência poderá ser recalculada.

### Viagem de ida

1. O sistema prepara a lista de crianças esperadas.
2. Motorista ou auxiliar verifica os avisos de ausência.
3. O motorista inicia a viagem.
4. A localização da van é compartilhada com os responsáveis autorizados.
5. O embarque de cada criança é confirmado.
6. O responsável recebe a notificação de embarque.
7. Na escola, o desembarque é confirmado.
8. O responsável recebe a notificação de chegada.
9. Depois da conferência dos alunos, a viagem é encerrada.
10. A distância percorrida é registrada para o controle operacional.

### Viagem de retorno

1. O sistema prepara a lista de crianças previstas para a volta.
2. Os embarques na escola são confirmados.
3. O responsável recebe a notificação de início do retorno.
4. A localização permanece disponível durante o trajeto.
5. O desembarque é confirmado no destino autorizado.
6. O responsável recebe a confirmação da entrega.
7. Depois da conferência, a viagem é encerrada e a distância é adicionada ao total diário.

## Status da criança

| Status | Significado |
| --- | --- |
| Previsto | A criança está programada para utilizar a van. |
| Não irá | O responsável informou a ausência antecipadamente. |
| Aguardando embarque | A criança ainda não entrou na van. |
| Embarcado | A entrada na van foi confirmada. |
| Não localizado | A van chegou ao ponto, mas a criança não foi encontrada. |
| A caminho da escola | A criança está embarcada no trajeto de ida. |
| Chegou à escola | O desembarque na escola foi confirmado. |
| Aguardando retorno | A criança está prevista para a viagem de volta. |
| Em retorno | A criança está embarcada no trajeto de volta. |
| Entregue ao responsável | O desembarque no destino final foi confirmado. |
| Ausente sem aviso | A criança não embarcou e não havia aviso anterior. |
| Viagem cancelada | A viagem programada foi cancelada. |

Cada alteração de status deverá registrar o usuário responsável, a data, o horário e, quando necessário, o motivo.

### Lista de embarque

A lista de cada viagem exibirá nome e foto autorizada da criança, ponto e horário de embarque, status, aviso de ausência e observações relevantes. Motoristas e auxiliares poderão confirmar embarques, desembarques, ausências ou problemas.

O sistema deverá destacar quem está aguardando, quem já está a bordo, quem não será transportado, quem não foi localizado e quem já desembarcou. Uma viagem não poderá ser encerrada enquanto houver uma criança sem status final ou justificativa.

## Localização e notificações

A localização da van será compartilhada somente durante uma viagem ativa e apenas com os responsáveis das crianças vinculadas àquele trajeto. O motorista verá claramente quando o compartilhamento estiver ativo, e o sistema avisará quando os dados estiverem indisponíveis ou desatualizados.

A posição da van não será exibida nos resultados públicos de pesquisa. O histórico de localização terá acesso restrito e prazo de retenção definido.

As notificações poderão incluir:

- início da viagem;
- aproximação do ponto de embarque;
- embarque ou criança não localizada;
- atraso ou alteração de rota;
- chegada à escola;
- início do retorno e desembarque final;
- cancelamento ou mudança de horário;
- solicitação ou confirmação de vínculo;
- pendências, confirmação ou vencimento de contrato;
- vencimento da assinatura do motorista;
- confirmação ou falha de pagamento.

Na aplicação web, as notificações serão exibidas dentro do sistema e poderão ser enviadas pelo navegador quando houver autorização.

## Controle de combustível

Cada van terá um painel para estimar o consumo e o custo de combustível por viagem, dia e mês.

### Dados considerados

- distância percorrida;
- tipo de combustível;
- consumo médio da van em km/L;
- preço local de referência por litro, quando disponível;
- preço real informado pelo motorista.

O motorista poderá ajustar o tipo de combustível, o consumo médio e o preço por litro. Toda mudança de preço terá uma data de vigência para preservar os cálculos históricos.

### Cálculo

```text
Litros estimados = distância percorrida ÷ consumo médio em km/L
Custo estimado   = litros estimados × preço por litro
```

Uma van que percorre 100 km, com consumo médio de 10 km/L e combustível a R$ 6,00 por litro, terá consumo estimado de 10 litros e custo estimado de R$ 60,00.

O painel poderá apresentar quilômetros percorridos, litros consumidos, custo diário e mensal, valor por viagem ou rota, histórico de preços, comparação entre períodos e o total de todas as vans do transportador.

Os valores serão identificados como estimativas, pois o consumo real varia conforme trânsito, carga, manutenção, condições da via e forma de condução.

## Pagamentos

O sistema poderá trabalhar com dois pagamentos distintos.

### Assinatura do Lumio

É a mensalidade paga pelo motorista para utilizar as funções profissionais. Inclui a primeira van, com cobrança adicional para cada veículo extra.

### Serviço de transporte escolar

É o valor pago pelo responsável diretamente ao transportador. Esse pagamento poderá continuar acontecendo fora da plataforma. Caso a função seja implementada, o Lumio poderá processar o pagamento e registrar valores recebidos, pendências, taxas, repasses, comprovantes, cancelamentos e reembolsos.

O pagamento do transporte será sempre separado da assinatura do motorista.

## Áreas do sistema

### Conta comum

- cadastro e autenticação;
- recuperação de senha;
- aceite dos termos;
- configuração dos perfis.

### Área do responsável

- resumo do dia;
- cadastro de crianças;
- pesquisa de vans;
- vínculos e contratos;
- horários e viagens;
- aviso de ausência;
- status e mapa da viagem;
- notificações e histórico;
- pagamentos, quando disponíveis.

### Área do motorista

- planos e mensalidades;
- cadastro de vans adicionais;
- escolas e regiões atendidas;
- gestão de responsáveis, crianças e contratos;
- rotas, horários e mapa;
- lista diária de passageiros;
- início e encerramento de viagens;
- gestão de auxiliares;
- registro de ocorrências;
- painel de combustível;
- pagamentos da plataforma e recebimentos.

### Área do auxiliar

- viagens atribuídas;
- lista de embarque e desembarque;
- atualização de status;
- registro de ocorrências autorizadas.

### Área administrativa

- usuários, perfis e permissões;
- planos e cobranças;
- documentos e contratos autorizados;
- atendimento e suporte;
- registros de segurança;
- configurações gerais.

## Segurança e privacidade

O Lumio tratará dados de crianças, endereços, contratos e localização em tempo real. Por isso, segurança e privacidade fazem parte dos requisitos centrais do produto.

O sistema deverá contar com:

- autorização do responsável para o tratamento dos dados da criança;
- aceite dos termos antes do cadastro de menores;
- acesso restrito conforme o perfil e os vínculos do usuário;
- proteção de credenciais e sessões;
- registro de alterações relevantes;
- proteção dos documentos contratuais;
- regras de retenção para contratos, localização e histórico;
- revogação de acessos e encerramento de vínculos;
- limitação das informações disponíveis na pesquisa pública;
- procedimentos para incidentes e recuperação de conta;
- adequação à Lei Geral de Proteção de Dados (LGPD).

## Regras de negócio

- Todo acesso começa por uma conta comum de usuário.
- O cadastro de responsáveis e crianças é gratuito.
- Crianças não possuem conta nem acesso direto à plataforma.
- Toda criança deve estar associada a pelo menos um responsável.
- O perfil profissional do motorista depende de uma assinatura ativa.
- A assinatura principal inclui uma van; veículos adicionais são cobrados separadamente.
- Apenas vans regulares podem iniciar novas viagens.
- Cada van mantém seus próprios vínculos, contratos, rotas, viagens e custos.
- O vínculo definitivo exige o envio ou a confirmação do contrato pelas duas partes.
- Contratos firmados fora do Lumio são aceitos.
- Somente as partes e administradores autorizados podem acessar o contrato.
- O pagamento do transporte pela plataforma será opcional, quando disponível.
- Uma criança só integra uma viagem quando está vinculada à van e à rota correspondentes.
- Apenas usuários autorizados podem alterar o status da criança.
- Avisos de ausência devem ser apresentados imediatamente ao motorista e ao auxiliar.
- A localização só pode ser compartilhada durante uma viagem ativa.
- O responsável só acompanha viagens relacionadas às crianças sob sua responsabilidade.
- Embarques e desembarques registram usuário, data e horário.
- Viagens não podem ser encerradas com passageiros sem status final ou justificativa.
- Mudanças relevantes de horário ou rota devem gerar uma notificação.
- O custo de combustível é calculado separadamente para cada van.
- Alterações no preço do combustível não modificam períodos históricos já fechados.
- Custos calculados são apresentados como estimativas, salvo quando substituídos por valores reais informados pelo motorista.
