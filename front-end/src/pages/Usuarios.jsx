export default function Usuarios() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Usuários e perfis</h1>
          <p>Gerencie passageiros, responsáveis e permissões</p>
        </div>
        <button className="btn-primary">+ Novo usuário</button>
      </div>

      <div className="grid-2-cols">
        {/* Lista à esquerda */}
        <div className="card">
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "16px",
              borderRadius: "8px",
              border: "1px solid #CBD5E1",
            }}
          />

          <div className="list-item">
            <div>
              <strong>Mariana Silva</strong>
              <p style={{ fontSize: "13px", color: "#64748B" }}>
                Responsável • mariana@email.com
              </p>
            </div>
            <span className="badge success">Ativo</span>
          </div>

          <div className="list-item">
            <div>
              <strong>João Pedro</strong>
              <p style={{ fontSize: "13px", color: "#64748B" }}>
                Passageiro • joao@email.com
              </p>
            </div>
            <span className="badge warning">Pendente</span>
          </div>
        </div>

        {/* Detalhe do Perfil à direita */}
        <div className="card" style={{ textAlign: "center" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "#0B213F",
              color: "#FFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            MS
          </div>
          <h3>Mariana Silva</h3>
          <p style={{ color: "#64748B", fontSize: "14px", marginBottom: "16px" }}>
            mariana@email.com
          </p>

          <div
            style={{
              textAlign: "left",
              borderTop: "1px solid #E2E8F0",
              paddingTop: "16px",
              marginBottom: "16px",
            }}
          >
            <p><strong>Telefone:</strong> (11) 99999-0000</p>
            <p><strong>Perfil:</strong> Responsável</p>
            <p><strong>Cadastro:</strong> 12/10/2026</p>
          </div>

          <button className="btn-primary" style={{ width: "100%" }}>
            Editar Perfil
          </button>
        </div>
      </div>
    </>
  );
}
