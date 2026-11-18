export default function Monitoramento() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Monitoramento de motoristas</h1>
          <p>Acompanhamento de rotas e localização em tempo real</p>
        </div>
        <button className="btn-yellow">Atualizar mapa</button>
      </div>

      <div className="grid-2-cols">
        {/* Área do Mapa */}
        <div className="card">
          <h3 style={{ marginBottom: "12px" }}>Mapa de acompanhamento</h3>
          <div
            style={{
              background: "#E2E8F0",
              borderRadius: "8px",
              height: "340px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#475569",
              border: "1px solid #CBD5E1",
            }}
          >
            <strong>[ Área do Mapa Interativo ]</strong>
            <p style={{ fontSize: "13px", marginTop: "6px" }}>
              3 vans operando na região neste momento
            </p>
          </div>
        </div>

        {/* Lista de Motoristas */}
        <div className="card">
          <h3 style={{ marginBottom: "12px" }}>Motoristas em operação</h3>

          <div className="list-item">
            <div>
              <strong>Carlos Eduardo • Van 01</strong>
              <p style={{ fontSize: "12px", color: "#64748B" }}>
                Rota: Colégio Santa Maria
              </p>
            </div>
            <span className="badge success">Online</span>
          </div>

          <div className="list-item">
            <div>
              <strong>Roberto Alves • Van 03</strong>
              <p style={{ fontSize: "12px", color: "#64748B" }}>
                Rota: Escola Objetivo
              </p>
            </div>
            <span className="badge success">Online</span>
          </div>

          <div className="list-item">
            <div>
              <strong>Marcos Vinícius • Van 02</strong>
              <p style={{ fontSize: "12px", color: "#64748B" }}>
                Último sinal há 25 min
              </p>
            </div>
            <span className="badge warning">Parado</span>
          </div>
        </div>
      </div>
    </>
  );
}
