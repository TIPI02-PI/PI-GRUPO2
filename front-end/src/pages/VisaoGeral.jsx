export default function VisaoGeral() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Visão geral</h1>
          <p>Resumo operacional da plataforma Lumio</p>
        </div>
        <button className="btn-yellow">Atualizar dados</button>
      </div>

      {/* 5 Cards do Topo */}
      <div className="kpi-grid">
        <div className="card kpi-card">
          <span className="kpi-title">Total de Usuários</span>
          <strong className="kpi-value">1.482</strong>
        </div>
        <div className="card kpi-card yellow">
          <span className="kpi-title">Motoristas Ativos</span>
          <strong className="kpi-value">312</strong>
        </div>
        <div className="card kpi-card">
          <span className="kpi-title">Docs Pendentes</span>
          <strong className="kpi-value">28</strong>
        </div>
        <div className="card kpi-card yellow">
          <span className="kpi-title">Denúncias Abertas</span>
          <strong className="kpi-value">9</strong>
        </div>
        <div className="card kpi-card">
          <span className="kpi-title">Vans em Rota</span>
          <strong className="kpi-value">184</strong>
        </div>
      </div>

      {/* Duas Colunas Inferiores */}
      <div className="grid-2-cols">
        <div className="card">
          <h3>Fila de análise</h3>
          <div className="list-item">
            <div>
              <strong>Carlos Mendes</strong>
              <p style={{ fontSize: "13px", color: "#64748B" }}>CNH e Documento do Veículo</p>
            </div>
            <span className="badge warning">Pendente</span>
          </div>
          <div className="list-item">
            <div>
              <strong>Fernanda Costa</strong>
              <p style={{ fontSize: "13px", color: "#64748B" }}>Comprovante de Residência</p>
            </div>
            <span className="badge warning">Pendente</span>
          </div>
          <div className="list-item">
            <div>
              <strong>Roberto Alves</strong>
              <p style={{ fontSize: "13px", color: "#64748B" }}>Vistoria Escolar</p>
            </div>
            <span className="badge success">Aprovado</span>
          </div>
        </div>

        <div className="card">
          <h3>Alertas rápidos</h3>
          <div className="list-item">
            <span>3 documentos vencem hoje</span>
            <span className="badge danger">Urgente</span>
          </div>
          <div className="list-item">
            <span>Nova denúncia registrada</span>
            <span className="badge warning">Atenção</span>
          </div>
        </div>
      </div>
    </>
  );
}
