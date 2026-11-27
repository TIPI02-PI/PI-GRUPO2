import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Monitoramento.module.css";

const MOTORISTAS_ROTA = [
  {
    id: 1,
    iniciais: "CE",
    nome: "Carlos Eduardo",
    van: "Van 01 • Rota Sul",
    status: "Em trajeto",
    alunos: "13/15 alunos",
    eta: "ETA: 12 min",
    destino: "Colégio Santa Cruz",
  },
  {
    id: 2,
    iniciais: "LO",
    nome: "Lucas Oliveira",
    van: "Van 02 • Rota Centro",
    status: "Embarque",
    alunos: "14/15 alunos",
    eta: "ETA: 18 min",
    destino: "Escola Etapa",
  },
  {
    id: 3,
    iniciais: "RA",
    nome: "Roberto Almeida",
    van: "Van 03 • Rota Oeste",
    status: "Em trajeto",
    alunos: "9/15 alunos",
    eta: "ETA: 22 min",
    destino: "Colégio Objetivo",
  },
];

export default function Monitoramento() {
  const location = useLocation();
  const navigate = useNavigate();

  const [vanSelecionadaId, setVanSelecionadaId] = useState(
    () => location.state?.vanId || 1
  );

  const vanAtiva =
    MOTORISTAS_ROTA.find((v) => v.id === vanSelecionadaId) || MOTORISTAS_ROTA[0];

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div className={styles.headerTitles}>
          <h1 className={styles.pageTitle}>Monitoramento de motoristas</h1>
          <p className={styles.pageSubtitle}>
            Acompanhamento de rotas e localização em tempo real
          </p>
        </div>
        <button
          type="button"
          className={styles.primaryAmberBtn}
          onClick={() => navigate("/motoristas")}
        >
          Ver detalhes da frota
        </button>
      </div>

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

      <div className={styles.mainGrid}>
        <section className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Mapa de acompanhamento</h2>
              <p className={styles.panelSubtitle}>
                Foco atual: {vanAtiva.van} ({vanAtiva.nome}) • Destino:{" "}
                {vanAtiva.destino}
              </p>
            </div>
          </div>

          <div className={styles.mapWrapper}>
            <div id="mapa-monitoramento" className={styles.mapCanvas} />
          </div>

          <div className={styles.mapLegend}>
            <span className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.dotMoving}`} />{" "}
              Veículo em movimento
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.dotStop}`} /> Ponto
              de embarque
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.dotSchool}`} />{" "}
              Escola destino
            </span>
          </div>
        </section>

        <aside className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Motoristas em operação</h2>
              <p className={styles.panelSubtitle}>
                Clique para centralizar no mapa
              </p>
            </div>
          </div>

          <div className={styles.driversList}>
            {MOTORISTAS_ROTA.map((item) => (
              <div
                key={item.id}
                onClick={() => setVanSelecionadaId(item.id)}
                className={`${styles.driverCard} ${
                  vanAtiva.id === item.id ? styles.driverCardSelected : ""
                }`}
              >
                <div className={styles.driverTop}>
                  <div className={styles.driverIdentity}>
                    <span className={styles.driverAvatar}>{item.iniciais}</span>
                    <div>
                      <p className={styles.driverName}>{item.nome}</p>
                      <span className={styles.driverVan}>{item.van}</span>
                    </div>
                  </div>
                  <span
                    className={`${styles.routeBadge} ${
                      item.status === "Em trajeto"
                        ? styles.badgeOnRoute
                        : styles.badgeBoarding
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className={styles.driverRouteInfo}>
                  <span>{item.alunos}</span>
                  <span>{item.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}