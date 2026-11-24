import { useState } from 'react';
import styles from './Usuarios.module.css';

export default function Usuarios() {
  const [abaAtiva, setAbaAtiva] = useState('Todos');
  const [selecionadoId, setSelecionadoId] = useState(1);

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitles}>
          <h1 className={styles.pageTitle}>Usuários e perfis</h1>
          <p className={styles.pageSubtitle}>Gerencie responsáveis, motoristas e estudantes cadastrados</p>
        </div>
        <button className={styles.primaryDarkBtn}>+ Novo usuário</button>
      </div>

      {/* Filtros / Abas */}
      <div className={styles.tabsBar}>
        {['Todos', 'Responsáveis', 'Motoristas', 'Alunos'].map((aba) => (
          <button
            key={aba}
            onClick={() => setAbaAtiva(aba)}
            className={`${styles.tabBtn} ${abaAtiva === aba ? styles.tabBtnActive : ''}`}
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
            <span className={styles.panelCount}>4 resultados</span>
          </div>

          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Buscar por nome, e-mail ou CPF..."
              className={styles.searchInput}
            />
          </div>

          <div className={styles.userList}>
            <div
              onClick={() => setSelecionadoId(1)}
              className={`${styles.userRow} ${selecionadoId === 1 ? styles.userRowSelected : ''}`}
            >
              <div className={styles.userRowLeft}>
                <div className={styles.avatar}>MS</div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>Mariana Silva</span>
                  <span className={styles.userRole}>Responsável • 2 alunos vinculados</span>
                </div>
              </div>
              <span className={`${styles.badge} ${styles.badgeActive}`}>Ativo</span>
            </div>
          </div>
        </section>

        {/* Card de Detalhes Direita */}
        <aside className={styles.profileCard}>
          <span className={styles.profileTopBadge}>Perfil selecionado</span>
          <div className={styles.profileAvatarLarge}>MS</div>
          <div className={styles.profileIdentity}>
            <h3 className={styles.profileName}>Mariana Silva</h3>
            <p className={styles.profileMeta}>mariana.silva@email.com • São Paulo, SP</p>
          </div>

          <div className={styles.divider} />

          <div className={styles.permissionsSection}>
            <span className={styles.permissionsTitle}>Permissões e status</span>
            <ul className={styles.permissionList}>
              <li className={styles.permissionItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Cadastro verificado</span>
              </li>
              <li className={styles.permissionItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Notificações de embarque ativas</span>
              </li>
              <li className={styles.permissionItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Contrato vigente</span>
              </li>
            </ul>
          </div>

          <button className={styles.profileActionBtn}>Gerenciar perfil</button>
        </aside>
      </div>
    </div>
  );
}