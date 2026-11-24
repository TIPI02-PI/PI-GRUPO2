import styles from './Denuncias.module.css';

export default function Denuncias() {
  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitles}>
          <h1 className={styles.pageTitle}>Denúncias e ocorrências</h1>
          <p className={styles.pageSubtitle}>Acompanhamento de relatos de rota, atrasos e conduta</p>
        </div>
        <button className={styles.primaryDarkBtn}>+ Registrar ocorrência</button>
      </div>

      {/* Banner Escuro Superior */}
      <section className={styles.summaryBanner}>
        <div className={styles.bannerStat}>
          <strong className={styles.bannerValue}>04</strong>
          <span className={styles.bannerLabel}>Recebidas hoje</span>
        </div>
        <div className={styles.bannerStat}>
          <strong className={`${styles.bannerValue} ${styles.bannerValueHighlight}`}>03</strong>
          <span className={styles.bannerLabel}>Em análise</span>
        </div>
        <div className={styles.bannerStat}>
          <strong className={styles.bannerValue}>12</strong>
          <span className={styles.bannerLabel}>Resolvidas no mês</span>
        </div>
        <div className={styles.bannerStat}>
          <strong className={styles.bannerValue}>1h 20m</strong>
          <span className={styles.bannerLabel}>Tempo médio de resposta</span>
        </div>
      </section>

      {/* Quadro Kanban */}
      <section className={styles.kanbanGrid}>
        {/* Coluna 1: Recebidas */}
        <div className={`${styles.kanbanColumn} ${styles.colReceived}`}>
          <div className={styles.columnHeader}>
            <h2 className={styles.columnTitle}>Recebidas</h2>
            <span className={styles.columnCount}>2</span>
          </div>

          <div className={styles.cardsStack}>
            <article className={styles.incidentCard}>
              <div className={styles.cardTop}>
                <span className={styles.incidentId}>#OC-208</span>
                <span className={`${styles.severityBadge} ${styles.severityHigh}`}>Alta</span>
              </div>
              <h3 className={styles.incidentTitle}>Atraso no embarque matinal</h3>
              <p className={styles.incidentDesc}>
                Responsável relatou atraso de 25 minutos na parada da Av. Paulista sem aviso prévio.
              </p>
              <div className={styles.cardFooter}>
                <span>Van 02 • Há 18 min</span>
                <button className={styles.cardActionBtn}>Iniciar análise →</button>
              </div>
            </article>
          </div>
        </div>

        {/* Coluna 2: Em análise */}
        <div className={`${styles.kanbanColumn} ${styles.colInProgress}`}>
          <div className={styles.columnHeader}>
            <h2 className={styles.columnTitle}>Em análise</h2>
            <span className={styles.columnCount}>1</span>
          </div>

          <div className={styles.cardsStack}>
            <article className={styles.incidentCard}>
              <div className={styles.cardTop}>
                <span className={styles.incidentId}>#OC-205</span>
                <span className={`${styles.severityBadge} ${styles.severityMedium}`}>Média</span>
              </div>
              <h3 className={styles.incidentTitle}>Desvio de trajeto reportado</h3>
              <p className={styles.incidentDesc}>
                Verificando logs de GPS da rota vespertina junto ao motorista Roberto Almeida.
              </p>
              <div className={styles.cardFooter}>
                <span>Van 03 • Ontem</span>
                <button className={styles.cardActionBtn}>Concluir →</button>
              </div>
            </article>
          </div>
        </div>

        {/* Coluna 3: Resolvidas */}
        <div className={`${styles.kanbanColumn} ${styles.colResolved}`}>
          <div className={styles.columnHeader}>
            <h2 className={styles.columnTitle}>Resolvidas</h2>
            <span className={styles.columnCount}>1</span>
          </div>

          <div className={styles.cardsStack}>
            <article className={styles.incidentCard}>
              <div className={styles.cardTop}>
                <span className={styles.incidentId}>#OC-199</span>
                <span className={`${styles.severityBadge} ${styles.severityLow}`}>Concluída</span>
              </div>
              <h3 className={styles.incidentTitle}>Falha na notificação de chegada</h3>
              <p className={styles.incidentDesc}>
                Sincronização de push reativada para o responsável e validada no embarque seguinte.
              </p>
              <div className={styles.cardFooter}>
                <span>Van 01 • 22/11</span>
                <button className={styles.cardActionBtn}>Ver detalhes</button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}