import styles from './Motoristas.module.css';

export default function Motoristas() {
  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitles}>
          <h1 className={styles.pageTitle}>Motoristas e vans</h1>
          <p className={styles.pageSubtitle}>Controle de frota, capacidade e status operacional</p>
        </div>
        <button className={styles.primaryDarkBtn}>+ Cadastrar veículo</button>
      </div>

      {/* 3 KPIs Superiores */}
      <section className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiIcon}>🚐</span>
            <span className={styles.kpiLabel}>Vans cadastradas</span>
          </div>
          <strong className={styles.kpiValue}>12</strong>
          <span className={styles.kpiMeta}>10 em operação regular</span>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiIcon}>🪪</span>
            <span className={styles.kpiLabel}>Motoristas ativos</span>
          </div>
          <strong className={styles.kpiValue}>14</strong>
          <span className={styles.kpiMeta}>100% com CNH verificada</span>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiIcon}>💺</span>
            <span className={styles.kpiLabel}>Ocupação média</span>
          </div>
          <strong className={styles.kpiValue}>84%</strong>
          <span className={styles.kpiMeta}>152 de 180 assentos</span>
        </div>
      </section>

      {/* Seção Principal */}
      <div className={styles.mainGrid}>
        {/* Veículos e disponibilidade */}
        <section className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Veículos e disponibilidade</h2>
              <p className={styles.panelSubtitle}>Ocupação atual por veículo ativo</p>
            </div>
          </div>

          <div className={styles.vansGrid}>
            {/* Van 01 */}
            <div className={styles.vanCard}>
              <div className={styles.vanTop}>
                <div className={styles.vanIdentity}>
                  <span className={styles.vanIconBox}>🚐</span>
                  <div>
                    <h3 className={styles.vanTitle}>Van 01 • ABC-1D23</h3>
                    <p className={styles.vanDriver}>Carlos Eduardo</p>
                  </div>
                </div>
                <span className={`${styles.vanBadge} ${styles.badgeActive}`}>Ativa</span>
              </div>

              <div className={styles.capacitySection}>
                <div className={styles.capacityHeader}>
                  <span>Ocupação</span>
                  <strong>13 / 15 alunos</strong>
                </div>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: '86%' }} />
                </div>
              </div>
            </div>

            {/* Van 03 (Exemplo em manutenção / alerta) */}
            <div className={styles.vanCard}>
              <div className={styles.vanTop}>
                <div className={styles.vanIdentity}>
                  <span className={`${styles.vanIconBox} ${styles.vanIconBoxWarning}`}>🚐</span>
                  <div>
                    <h3 className={styles.vanTitle}>Van 03 • XYZ-9K88</h3>
                    <p className={styles.vanDriver}>Roberto Almeida</p>
                  </div>
                </div>
                <span className={`${styles.vanBadge} ${styles.badgeMaintenance}`}>Revisão</span>
              </div>

              <div className={styles.capacitySection}>
                <div className={styles.capacityHeader}>
                  <span>Ocupação</span>
                  <strong>9 / 15 alunos</strong>
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={`${styles.progressFill} ${styles.progressFillWarning}`}
                    style={{ width: '60%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Status da frota */}
        <aside className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Status da frota</h2>
              <p className={styles.panelSubtitle}>Resumo por condição</p>
            </div>
          </div>

          <div className={styles.fleetStatusList}>
            <div className={styles.fleetStatusItem}>
              <div className={styles.fleetStatusLeft}>
                <span className={styles.fleetStatusIcon}>✅</span>
                <div>
                  <p className={styles.fleetStatusTitle}>Em rota</p>
                  <span className={styles.fleetStatusDesc}>Operando normalmente</span>
                </div>
              </div>
              <span className={styles.fleetStatusCount}>10</span>
            </div>

            <div className={styles.fleetStatusItem}>
              <div className={styles.fleetStatusLeft}>
                <span className={styles.fleetStatusIcon}>🔧</span>
                <div>
                  <p className={styles.fleetStatusTitle}>Manutenção</p>
                  <span className={styles.fleetStatusDesc}>Vistoria ou revisão</span>
                </div>
              </div>
              <span className={styles.fleetStatusCount}>2</span>
            </div>
          </div>

          <button className={styles.outlineFooterBtn}>Ver histórico da frota</button>
        </aside>
      </div>
    </div>
  );
}