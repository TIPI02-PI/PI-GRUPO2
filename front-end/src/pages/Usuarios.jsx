import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Usuarios.module.css";

const USUARIOS_MOCK = [
  {
    id: 1,
    iniciais: "MS",
    nome: "Mariana Silva",
    tipo: "Responsáveis",
    detalhe: "Responsável • 2 alunos vinculados",
    email: "mariana.silva@email.com • São Paulo, SP",
    status: "Ativo",
    permissoes: [
      "Cadastro verificado",
      "Notificações de embarque ativas",
      "Contrato vigente",
    ],
  },
  {
    id: 2,
    iniciais: "CE",
    nome: "Carlos Eduardo",
    tipo: "Motoristas",
    detalhe: "Motorista • Van 01 (ABC-1D23)",
    email: "carlos.eduardo@lumio.com • São Paulo, SP",
    status: "Ativo",
    permissoes: [
      "CNH Categoria D verificada",
      "Curso de transporte escolar ativo",
      "Veículo vistoriado",
    ],
  },
  {
    id: 3,
    iniciais: "RA",
    nome: "Roberto Almeida",
    tipo: "Motoristas",
    detalhe: "Motorista • Van 03 (XYZ-9K88)",
    email: "roberto.almeida@lumio.com • São Paulo, SP",
    status: "Pendente",
    permissoes: [
      "CNH Categoria D verificada",
      "Aguardando renovação do CRLV",
    ],
  },
  {
    id: 4,
    iniciais: "LP",
    nome: "Lucas Pereira",
    tipo: "Alunos",
    detalhe: "Aluno • Colégio Santa Cruz (Turno Manhã)",
    email: "Resp.: Mariana Silva • Rota Sul",
    status: "Ativo",
    permissoes: [
      "Ponto de embarque cadastrado",
      "Autorização de desembarque ativa",
    ],
  },
];

export default function Usuarios() {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [selecionadoId, setSelecionadoId] = useState(1);

  // Filtra por aba e pelo campo de busca
  const usuariosFiltrados = USUARIOS_MOCK.filter((user) => {
    const bateAba = abaAtiva === "Todos" || user.tipo === abaAtiva;
    const bateBusca =
      user.nome.toLowerCase().includes(busca.toLowerCase()) ||
      user.detalhe.toLowerCase().includes(busca.toLowerCase());
    return bateAba && bateBusca;
  });

  // Encontra o objeto completo do usuário selecionado (ou cai no primeiro da lista)
  const usuarioSelecionado =
    USUARIOS_MOCK.find((u) => u.id === selecionadoId) || USUARIOS_MOCK[0];

  // Define para qual tela o botão direito leva de acordo com o perfil
  const handleAcaoPerfil = () => {
    if (usuarioSelecionado.tipo === "Motoristas") {
      navigate("/motoristas", { state: { driverId: usuarioSelecionado.id } });
    } else {
      navigate("/suporte", { state: { userId: usuarioSelecionado.id } });
    }
  };

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitles}>
          <h1 className={styles.pageTitle}>Usuários e perfis</h1>
          <p className={styles.pageSubtitle}>
            Gerencie responsáveis, motoristas e estudantes cadastrados
          </p>
        </div>
        <button className={styles.primaryDarkBtn}>+ Novo usuário</button>
      </div>

      {/* Filtros / Abas */}
      <div className={styles.tabsBar}>
        {["Todos", "Responsáveis", "Motoristas", "Alunos"].map((aba) => (
          <button
            key={aba}
            onClick={() => setAbaAtiva(aba)}
            className={`${styles.tabBtn} ${
              abaAtiva === aba ? styles.tabBtnActive : ""
            }`}
          >
            {aba}
          </button>
        ))}
      </div>

      {/* Conteúdo Dividido */}
      <div className={styles.splitGrid}>
        {/* Lista Esquerda */}
        <section className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Lista de usuários</h2>
            <span className={styles.panelCount}>
              {usuariosFiltrados.length} resultados
            </span>
          </div>

          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome, van ou escola..."
              className={styles.searchInput}
            />
          </div>

          <div className={styles.userList}>
            {usuariosFiltrados.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelecionadoId(user.id)}
                className={`${styles.userRow} ${
                  usuarioSelecionado.id === user.id ? styles.userRowSelected : ""
                }`}
              >
                <div className={styles.userRowLeft}>
                  <div className={styles.avatar}>{user.iniciais}</div>
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{user.nome}</span>
                    <span className={styles.userRole}>{user.detalhe}</span>
                  </div>
                </div>
                <span
                  className={`${styles.badge} ${
                    user.status === "Ativo"
                      ? styles.badgeActive
                      : styles.badgePending
                  }`}
                >
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Card de Detalhes Direita */}
        <aside className={styles.profileCard}>
          <span className={styles.profileTopBadge}>Perfil selecionado</span>
          <div className={styles.profileAvatarLarge}>
            {usuarioSelecionado.iniciais}
          </div>
          <div className={styles.profileIdentity}>
            <h3 className={styles.profileName}>{usuarioSelecionado.nome}</h3>
            <p className={styles.profileMeta}>{usuarioSelecionado.email}</p>
          </div>

          <div className={styles.divider} />

          <div className={styles.permissionsSection}>
            <span className={styles.permissionsTitle}>Permissões e status</span>
            <ul className={styles.permissionList}>
              {usuarioSelecionado.permissoes.map((perm, index) => (
                <li key={index} className={styles.permissionItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>{perm}</span>
                </li>
              ))}
            </ul>
          </div>

          <button className={styles.profileActionBtn} onClick={handleAcaoPerfil}>
            {usuarioSelecionado.tipo === "Motoristas"
              ? "Ver veículo e frota"
              : "Ver chamados de suporte"}
          </button>
        </aside>
      </div>
    </div>
  );
}