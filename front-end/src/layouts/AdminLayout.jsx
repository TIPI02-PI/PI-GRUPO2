import { Outlet, NavLink } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-container">
      {/* Barra Lateral */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>LUMIO</h2>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/visao-geral" className="nav-item">
            Visão Geral
          </NavLink>
          <NavLink to="/usuarios" className="nav-item">
            Usuários
          </NavLink>
          <NavLink to="/documentos" className="nav-item">
            Documentos
          </NavLink>
          <NavLink to="/denuncias" className="nav-item">
            Denúncias
          </NavLink>
          <NavLink to="/configuracoes" className="nav-item">
            Configurações
          </NavLink>
          <NavLink to="/monitoramento" className="nav-item">
            Monitoramento
          </NavLink>
        </nav>
      </aside>

      {/* Área Direita (Topo + Conteúdo) */}
      <div className="main-wrapper">
        <header className="topbar">
          <span>Painel Administrativo</span>
          <div className="user-profile">Admin</div>
        </header>

        <main className="page-content">
          {/* O React Router injeta a página atual aqui dentro */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
