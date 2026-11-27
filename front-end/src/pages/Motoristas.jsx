import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Motoristas.module.css";

const VANS_MOCK = [
  {
    id: 1,
    titulo: "Van 01 • ABC-1D23",
    motorista: "Carlos Eduardo",
    status: "Ativa",
    ocupacaoAtual: 13,
    capacidade: 15,
    alerta: false,
  },
  {
    id: 2,
    titulo: "Van 02 • DEF-4G56",
    motorista: "Lucas Oliveira",
    status: "Ativa",
    ocupacaoAtual: 14,
    capacidade: 15,
    alerta: false,
  },
  {
    id: 3,
    titulo: "Van 03 • XYZ-9K88",
    motorista: "Roberto Almeida",
    status: "Revisão",
    ocupacaoAtual: 9,
    capacidade: 15,
    alerta: true,
  },
];

export default function Motoristas() {
  const navigate = useNavigate();
  const [vans] = useState(VANS_MOCK);

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitles}>
          <h1 className={styles.pageTitle}>Motoristas e vans</h1>
          <p className={styles.pageSubtitle}>Controle de frota, capacidade e status operacional</p>
        </div>
        <button
          className={styles.primaryDarkBtn}
          onClick={() => navigate("/usuarios")}
        >
          + Cadastrar veículo
        </button>
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
              <p className={styles.panelSubtitle}>Clique em um veículo para acompanhar no mapa ao vivo</p>
            </div>
          </div>

          <div className={styles.vansGrid}>
            {vans.map((van) => {
              const percentual = Math.round((van.ocupacaoAtual / van.capacidade) * 100);
              return (
                <div
                  key={van.id}
                  className={styles.vanCard}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/monitoramento", { state: { vanId: van.id } })}
                >
                  <div className={styles.vanTop}>
                    <div className={styles.vanIdentity}>
                      <span
                        className={`${styles.vanIconBox} ${
                          van.alerta ? styles.vanIconBoxWarning : ""
                        }`}
                      >
                        🚐
                      </span>
                      <div>
                        <h3 className={styles.vanTitle}>{van.titulo}</h3>
                        <p className={styles.vanDriver}>{van.motorista}</p>
                      </div>
                    </div>
                    <span
                      className={`${styles.vanBadge} ${
                        van.alerta ? styles.badgeMaintenance : styles.badgeActive
                      }`}
                    >
                      {van.status}
                    </span>
                  </div>

                  <div className={styles.capacitySection}>
                    <div className={styles.capacityHeader}>
                      <span>Ocupação</span>
                      <strong>
                        {van.ocupacaoAtual} / {van.capacidade} alunos
                      </strong>
                    </div>
                    <div className={styles.progressTrack}>
                      <div
                        className={`${styles.progressFill} ${
                          van.alerta ? styles.progressFillWarning : ""
                        }`}
                        style={{ width: `${percentual}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
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

          <button
            className={styles.outlineFooterBtn}
            onClick={() => navigate("/documentos")}
          >
            Validar documentação da frota →
          </button>
        </aside>
      </div>
    </div>
  );
}