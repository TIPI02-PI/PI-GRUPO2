import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">LUMIO</div>

        <nav className="sidebar-nav">
          <NavLink to="/visao-geral" className="nav-item">Visão Geral</NavLink>
          <NavLink to="/usuarios" className="nav-item">Usuários e Perfis</NavLink>
          <NavLink to="/motoristas" className="nav-item">Motoristas e Vans</NavLink>
          <NavLink to="/documentos" className="nav-item">Documentos</NavLink>
          <NavLink to="/denuncias" className="nav-item">Denúncias</NavLink>
          <NavLink to="/suporte" className="nav-item">Central de Suporte</NavLink>
          <NavLink to="/configuracoes" className="nav-item">Configurações</NavLink>
          <NavLink to="/monitoramento" className="nav-item">Monitoramento</NavLink>
        </nav>
      </div>

      <div className="sidebar-footer">
        <p>Admin Lumio</p>
        <span>admin@lumio.com.br</span>
      </div>
    </aside>
  );
}
