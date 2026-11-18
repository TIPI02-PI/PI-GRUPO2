export default function Denuncias() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Denúncias e ocorrências</h1>
          <p>Acompanhamento de relatos de segurança e conduta</p>
        </div>
        <button className="btn-primary">Exportar relatório</button>
      </div>

      {/* 4 Cards Escuros do Topo */}
      <div className="kpi-grid">
        <div className="card" style={{ background: "#0B213F", color: "#FFF" }}>
          <span style={{ fontSize: "12px", color: "#94A3B8" }}>Total no Mês</span>
          <h2 style={{ fontSize: "28px", marginTop: "4px" }}>24</h2>
        </div>

        <div className="card" style={{ background: "#0B213F", color: "#FFF" }}>
          <span style={{ fontSize: "12px", color: "#94A3B8" }}>Recebidas</span>
          <h2 style={{ fontSize: "28px", marginTop: "4px", color: "#F5A623" }}>08</h2>
        </div>

        <div className="card" style={{ background: "#0B213F", color: "#FFF" }}>
          <span style={{ fontSize: "12px", color: "#94A3B8" }}>Em Análise</span>
          <h2 style={{ fontSize: "28px", marginTop: "4px" }}>05</h2>
        </div>

        <div className="card" style={{ background: "#0B213F", color: "#FFF" }}>
          <span style={{ fontSize: "12px", color: "#94A3B8" }}>Resolvidas</span>
          <h2 style={{ fontSize: "28px", marginTop: "4px", color: "#4ADE80" }}>11</h2>
        </div>
      </div>

      {/* 3 Colunas Kanban */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        <div className="card">
          <h3 style={{ marginBottom: "12px", borderBottom: "2px solid #F5A623", paddingBottom: "8px" }}>
            Recebidas
          </h3>
          <div style={{ background: "#F8FAFC", padding: "12px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
            <span className="badge danger">Alta Prioridade</span>
            <h4 style={{ margin: "8px 0 4px" }}>Atraso recorrente na rota</h4>
            <p style={{ fontSize: "12px", color: "#64748B" }}>Relatado por: Ana Paula • Hoje, 08:15</p>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: "12px", borderBottom: "2px solid #2563EB", paddingBottom: "8px" }}>
            Em análise
          </h3>
          <div style={{ background: "#F8FAFC", padding: "12px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
            <span className="badge warning">Em verificação</span>
            <h4 style={{ margin: "8px 0 4px" }}>Alteração de itinerário</h4>
            <p style={{ fontSize: "12px", color: "#64748B" }}>Van 04 • Ontem</p>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: "12px", borderBottom: "2px solid #16A34A", paddingBottom: "8px" }}>
            Resolvidas
          </h3>
          <div style={{ background: "#F8FAFC", padding: "12px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
            <span className="badge success">Concluído</span>
            <h4 style={{ margin: "8px 0 4px" }}>Dúvida sobre cobrança</h4>
            <p style={{ fontSize: "12px", color: "#64748B" }}>Resolvido em 16/11</p>
          </div>
        </div>
      </div>
    </>
  );
}
