export default function Suporte() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Central de suporte</h1>
          <p>Atendimento direto aos usuários e motoristas</p>
        </div>
        <button className="btn-primary">Novo chamado</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "20px",
          minHeight: "420px",
        }}
      >
        <div className="card">
          <h3 style={{ marginBottom: "12px" }}>Caixa de entrada</h3>
          <div
            className="list-item"
            style={{ background: "#EFF6FF", padding: "12px", borderRadius: "8px" }}
          >
            <div>
              <strong>Lucas Martins</strong>
              <p style={{ fontSize: "12px", color: "#64748B" }}>
                Não consigo atualizar minha CNH
              </p>
            </div>
            <span className="badge warning">Aberto</span>
          </div>
          <div className="list-item">
            <div>
              <strong>Juliana Rocha</strong>
              <p style={{ fontSize: "12px", color: "#64748B" }}>
                Como cadastrar segundo filho?
              </p>
            </div>
            <span className="badge success">Respondido</span>
          </div>
        </div>

        <div
          className="card"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                borderBottom: "1px solid #E2E8F0",
                paddingBottom: "12px",
                marginBottom: "16px",
              }}
            >
              <strong>Lucas Martins</strong> •{" "}
              <span style={{ fontSize: "13px", color: "#64748B" }}>
                Chamado #1042
              </span>
            </div>

            <div
              style={{
                background: "#F1F5F9",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "12px",
                maxWidth: "80%",
              }}
            >
              Olá, enviei a foto da minha nova CNH mas o aplicativo deu erro ao salvar.
            </div>

            <div
              style={{
                background: "#0B213F",
                color: "#FFF",
                padding: "12px",
                borderRadius: "8px",
                marginLeft: "auto",
                maxWidth: "80%",
              }}
            >
              Olá Lucas! Já liberamos o envio manual no seu perfil. Pode tentar novamente?
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
            <input
              type="text"
              placeholder="Digite sua resposta..."
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #CBD5E1",
              }}
            />
            <button className="btn-yellow">Enviar</button>
          </div>
        </div>
      </div>
    </>
  );
}
