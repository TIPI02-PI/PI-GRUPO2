export default function Configuracoes() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Configurações e segurança</h1>
          <p>Controle de acesso, permissões e políticas do sistema</p>
        </div>
        <button className="btn-primary">Salvar alterações</button>
      </div>

      {/* Banner Azul Escuro */}
      <div
        className="card"
        style={{
          background: "#0B213F",
          color: "#FFF",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3>Controle de privacidade e auditoria</h3>
          <p style={{ fontSize: "13px", color: "#CBD5E1", marginTop: "4px" }}>
            Todas as ações administrativas são registradas com data, hora e IP.
          </p>
        </div>
        <span className="badge success">Sistema Protegido</span>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: "16px" }}>Políticas de segurança</h3>

        <div className="list-item">
          <div>
            <strong>Autenticação em dois fatores (2FA)</strong>
            <p style={{ fontSize: "13px", color: "#64748B" }}>
              Exigir código de verificação para administradores
            </p>
          </div>
          <input
            type="checkbox"
            defaultChecked
            style={{ width: "20px", height: "20px" }}
          />
        </div>

        <div className="list-item">
          <div>
            <strong>Validação obrigatória de antecedentes</strong>
            <p style={{ fontSize: "13px", color: "#64748B" }}>
              Bloquear ativação de motoristas sem certidão aprovada
            </p>
          </div>
          <input
            type="checkbox"
            defaultChecked
            style={{ width: "20px", height: "20px" }}
          />
        </div>

        <div className="list-item">
          <div>
            <strong>Notificações de alerta crítico</strong>
            <p style={{ fontSize: "13px", color: "#64748B" }}>
              Enviar e-mail imediato em caso de denúncia grave
            </p>
          </div>
          <input
            type="checkbox"
            defaultChecked
            style={{ width: "20px", height: "20px" }}
          />
        </div>
      </div>
    </>
  );
}
