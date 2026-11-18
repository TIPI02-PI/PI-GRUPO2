export default function Motoristas() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Motoristas e vans</h1>
          <p>Gestão de condutores cadastrados e ocupação dos veículos</p>
        </div>
        <button className="btn-primary">+ Cadastrar van</button>
      </div>

      <div className="grid-2-cols">
        <div className="card">
          <h3 style={{ marginBottom: "16px" }}>Veículos e disponibilidade</h3>

          <div
            className="list-item"
            style={{ flexDirection: "column", alignItems: "stretch", gap: "8px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Van 01 • Mercedes Sprinter (ABC-1234)</strong>
              <span className="badge success">Em rota</span>
            </div>
            <p style={{ fontSize: "13px", color: "#64748B" }}>
              Motorista: Carlos Eduardo • 14/16 assentos
            </p>
            <div style={{ background: "#E2E8F0", height: "8px", borderRadius: "4px" }}>
              <div
                style={{
                  background: "#16A34A",
                  width: "85%",
                  height: "100%",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          </div>

          <div
            className="list-item"
            style={{ flexDirection: "column", alignItems: "stretch", gap: "8px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Van 02 • Fiat Ducato (XYZ-9876)</strong>
              <span className="badge warning">Manutenção</span>
            </div>
            <p style={{ fontSize: "13px", color: "#64748B" }}>
              Motorista: Marcos Vinícius • 0/15 assentos
            </p>
            <div style={{ background: "#E2E8F0", height: "8px", borderRadius: "4px" }}>
              <div
                style={{
                  background: "#F5A623",
                  width: "10%",
                  height: "100%",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: "16px" }}>Controle de frota</h3>
          <div className="list-item">
            <span>Vans ativas hoje</span>
            <strong>42</strong>
          </div>
          <div className="list-item">
            <span>Vistorias em dia</span>
            <strong>39</strong>
          </div>
          <div className="list-item">
            <span>Documentação vencendo</span>
            <span className="badge danger">3 veículos</span>
          </div>
        </div>
      </div>
    </>
  );
}
