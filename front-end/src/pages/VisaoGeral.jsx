import styles from './VisaoGeral.module.css';

export default function VisaoGeral() {
  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitles}>
          <h1 className={styles.pageTitle}>Visão geral</h1>
          <p className={styles.pageSubtitle}>Resumo operacional da plataforma Lumio</p>
        </div>
        <button className={styles.primaryActionBtn}>
          + Novo registro
        </button>
      </div>

      {/* 4 KPIs */}
      <section className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Vans ativas</span>
            <span className={styles.kpiIcon}>🚐</span>
          </div>
          <strong className={styles.kpiValue}>24</strong>
          <span className={styles.kpiTrend}>+2 esta semana</span>
        </div>
        {/* Repita os outros 3 cards aqui */}
      </section>

      {/* Fila de Análise + Acesso Rápido */}
      <section className={styles.middleGrid}>
        <div className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Fila de análise</h2>
              <p className={styles.panelSubtitle}>Itens aguardando validação administrativa</p>
            </div>
          </div>

          <div className={styles.queueList}>
            <div className={styles.queueItem}>
              <div className={styles.queueItemInfo}>
                <span className={styles.queueIndicator} />
                <div>
                  <p className={styles.queueItemTitle}>CNH Motorista - Carlos Eduardo</p>
                  <span className={styles.queueItemMeta}>Enviado há 15 min • Documentação</span>
                </div>
              </div>
              <button className={styles.queueActionBtn}>Analisar</button>
            </div>
          </div>
        </div>

        <div className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Acesso rápido</h2>
              <p className={styles.panelSubtitle}>Atalhos frequentes</p>
            </div>
          </div>

          <div className={styles.quickAccessList}>
            <button className={styles.quickAccessItem}>
              <div className={styles.quickAccessLeft}>
                <span className={styles.quickAccessIcon}>📄</span>
                <div>
                  <p className={styles.quickAccessTitle}>Validar documentos</p>
                  <span className={styles.quickAccessDesc}>4 pendentes</span>
                </div>
              </div>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Atividades Recentes */}
      <section className={styles.panelCard}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Atividades recentes</h2>
        </div>
        <div className={styles.activitiesList}>
          <div className={styles.activityRow}>
            <div className={styles.activityLeft}>
              <span className={styles.activityDot} />
              <span className={styles.activityText}>Documento aprovado para Van 02</span>
            </div>
            <span className={styles.activityTime}>Há 10 min</span>
          </div>
        </div>
      </section>
    </div>
  );
}