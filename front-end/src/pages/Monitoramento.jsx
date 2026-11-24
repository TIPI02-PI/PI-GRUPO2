import { useState } from 'react';
import styles from './Monitoramento.module.css';

export default function Monitoramento() {
  const [vanSelecionada, setVanSelecionada] = useState(1);

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitles}>
          <h1 className={styles.pageTitle}>Monitoramento de motoristas</h1>
          <p className={styles.pageSubtitle}>Acompanhamento de rotas e localização em tempo real</p>
        </div>
        <button className={styles.primaryAmberBtn}>↻ Atualizar rotas</button>
      </div>

      {/* 3 KPIs Superiores */}
      <section className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>Vans em rota</span>
            <span className={styles.kpiBadgeLive}>
              <span className={styles.liveDot} /> Ao vivo
            </span>
          </div>
          <strong className={styles.kpiValue}>10</strong>
          <span className={styles.kpiMeta}>Turno vespertino ativo</span>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>Alunos embarcados</span>
          </div>
          <strong className={styles.kpiValue}>128</strong>
          <span className={styles.kpiMeta}>94% dos embarques concluídos</span>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>Previsão média de chegada</span>
          </div>
          <strong className={styles.kpiValue}>14 min</strong>
          <span className={styles.kpiMeta}>Sem atrasos críticos</span>
        </div>
      </section>

      {/* Mapa + Lista Lateral */}
      <div className={styles.mainGrid}>
        {/* Mapa de Acompanhamento */}
        <section className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Mapa de acompanhamento</h2>
              <p className={styles.panelSubtitle}>Trajeto em andamento • Van 01 selecionada</p>
            </div>
          </div>

          <div className={styles.mapWrapper}>
            {/* Aqui você monta o <MapContainer /> do Leaflet */}
            <div id="mapa-monitoramento" className={styles.mapCanvas} />
          </div>

          <div className={styles.mapLegend}>
            <span className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.dotMoving}`} /> Veículo em movimento
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.dotStop}`} /> Ponto de embarque
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.dotSchool}`} /> Escola destino
            </span>
          </div>
        </section>

        {/* Motoristas em Operação */}
        <aside className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Motoristas em operação</h2>
              <p className={styles.panelSubtitle}>Clique para centralizar no mapa</p>
            </div>
          </div>

          <div className={styles.driversList}>
            <div
              onClick={() => setVanSelecionada(1)}
              className={`${styles.driverCard} ${vanSelecionada === 1 ? styles.driverCardSelected : ''}`}
            >
              <div className={styles.driverTop}>
                <div className={styles.driverIdentity}>
                  <span className={styles.driverAvatar}>CE</span>
                  <div>
                    <p className={styles.driverName}>Carlos Eduardo</p>
                    <span className={styles.driverVan}>Van 01 • Rota Sul</span>
                  </div>
                </div>
                <span className={`${styles.routeBadge} ${styles.badgeOnRoute}`}>Em trajeto</span>
              </div>
              <div className={styles.driverRouteInfo}>
                <span>13/15 alunos</span>
                <span>ETA: 12 min</span>
              </div>
            </div>

            <div
              onClick={() => setVanSelecionada(2)}
              className={`${styles.driverCard} ${vanSelecionada === 2 ? styles.driverCardSelected : ''}`}
            >
              <div className={styles.driverTop}>
                <div className={styles.driverIdentity}>
                  <span className={styles.driverAvatar}>RA</span>
                  <div>
                    <p className={styles.driverName}>Roberto Almeida</p>
                    <span className={styles.driverVan}>Van 02 • Rota Centro</span>
                  </div>
                </div>
                <span className={`${styles.routeBadge} ${styles.badgeBoarding}`}>Embarque</span>
              </div>
              <div className={styles.driverRouteInfo}>
                <span>9/15 alunos</span>
                <span>ETA: 19 min</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}