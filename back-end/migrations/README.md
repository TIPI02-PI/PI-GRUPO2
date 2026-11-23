# Contratos e vínculos

Em um banco existente, execute uma vez `001_contratos_vinculos.sql` com o banco Lumio selecionado. O arquivo `db.sql` recria o banco e deve ser usado apenas para uma instalação nova. Na migração, os vínculos anteriores recebem o motorista atualmente associado à van. Os arquivos referenciados pelo campo legado `arquivo` continuam preservados; a rota de download serve PDFs enviados pela nova API.

Todas as rotas exigem o token Bearer do login existente.

| Método | Rota | Uso |
| --- | --- | --- |
| GET | /api/vans?escola=Modelo&regiao=Centro | Busca pelo nome da escola e pelo bairro ou cidade da escola. Ambos os filtros são opcionais. A cobertura vem de van_escola ou de alunos já cadastrados na van. |
| POST | /api/vinculos | Envia {"aluno_id":1,"van_id":2}. A API identifica responsável e motorista e devolve vinculo_id e contrato_id. |
| GET | /api/vinculos | Lista solicitações recebidas pelo motorista ou enviadas pelo responsável autenticado. |
| PUT | /api/contratos/:id/pdf | Envia o PDF no corpo com Content-Type application/pdf (até 2 MiB). Ambas as partes podem enviar até a primeira confirmação. |
| GET | /api/contratos/:id/pdf | Baixa o PDF para um dos participantes. |
| POST | /api/contratos/:id/confirmacoes | Registra o aceite do usuário autenticado. O segundo aceite distinto ativa contrato e vínculo na mesma transação. |

O teste de integração usa um banco temporário criado e removido pelo próprio teste. Configure DB_HOST, DB_PORT, DB_USER e DB_PASSWORD para uma instância de testes, defina LUMIO_TEST_MYSQL=1 e execute `node --test tests/vinculos.test.js` na pasta back-end.
