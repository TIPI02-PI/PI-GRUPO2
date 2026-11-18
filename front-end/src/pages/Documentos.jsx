export default function Documentos() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Documentos</h1>
          <p>Validação de CNH, antecedentes e licenciamento escolar</p>
        </div>
        <button className="btn-primary">Filtrar pendentes</button>
      </div>

      {/* Layout em 3 colunas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr 1fr",
          gap: "20px",
        }}
      >
        {/* Coluna 1: Lista de documentos */}
        <div className="card">
          <h3 style={{ marginBottom: "12px" }}>Fila de validação</h3>

          <div className="list-item">
            <div>
              <strong>CNH Categoria D</strong>
              <p style={{ fontSize: "12px", color: "#64748B" }}>
                Carlos Mendes
              </p>
            </div>
            <span className="badge warning">Pendente</span>
          </div>

          <div className="list-item">
            <div>
              <strong>CRLV 2026</strong>
              <p style={{ fontSize: "12px", color: "#64748B" }}>
                Fernanda Costa
              </p>
            </div>
            <span className="badge success">Validado</span>
          </div>
        </div>

        {/* Coluna 2: Pré-visualização */}
        <div className="card" style={{ textAlign: "center" }}>
          <h3 style={{ marginBottom: "16px" }}>
            Pré-visualização do documento
          </h3>
          <div
            style={{
              background: "#F1F5F9",
              border: "2px dashed #CBD5E1",
              borderRadius: "8px",
              height: "240px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748B",
            }}
          >
            [Imagem da CNH do Motorista]
          </div>
        </div>

        {/* Coluna 3: Painel de análise */}
        <div
          className="card"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3 style={{ marginBottom: "12px" }}>Análise</h3>
            <p style={{ fontSize: "14px", marginBottom: "8px" }}>
              <strong>Motorista:</strong> Carlos Mendes
            </p>
            <p style={{ fontSize: "14px", marginBottom: "16px" }}>
              <strong>Validade:</strong> 10/08/2029
            </p>
            <textarea
              placeholder="Observações..."
              rows="4"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #CBD5E1",
              }}
            ></textarea>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: "16px",
            }}
          >
            <button
              style={{
                background: "#16A34A",
                color: "#FFF",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Aprovar Documento
            </button>
            <button
              style={{
                background: "#DC2626",
                color: "#FFF",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Recusar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
