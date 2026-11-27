import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Denuncias.module.css";

const OCORRENCIAS_INICIAIS = [
  {
    id: "OC-208",
    coluna: "recebidas",
    severidade: "Alta",
    titulo: "Atraso no embarque matinal",
    desc: "Responsável relatou atraso de 25 minutos na parada da Av. Paulista sem aviso prévio.",
    rodape: "Van 02 • Há 18 min",
    vanId: 2,
  },
  {
    id: "OC-207",
    coluna: "recebidas",
    severidade: "Média",
    titulo: "Dúvida sobre ponto de desembarque",
    desc: "Solicitação de conferência do portão lateral do Colégio Santa Cruz.",
    rodape: "Van 01 • Há 45 min",
    vanId: 1,
  },
  {
    id: "OC-205",
    coluna: "analise",
    severidade: "Média",
    titulo: "Desvio de trajeto reportado",
    desc: "Verificando logs de GPS da rota vespertina junto ao motorista Roberto Almeida.",
    rodape: "Van 03 • Ontem",
    vanId: 3,
  },
  {
    id: "OC-199",
    coluna: "resolvidas",
    severidade: "Concluída",
    titulo: "Falha na notificação de chegada",
    desc: "Sincronização de push reativada para o responsável e validada no embarque seguinte.",
    rodape: "Van 01 • 22/11",
    vanId: 1,
  },
];

export default function Denuncias() {
  const navigate = useNavigate();
  const [ocorrencias, setOcorrencias] = useState(OCORRENCIAS_INICIAIS);

  const avancarColuna = (id, proximaColuna) => {
    setOcorrencias((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, coluna: proximaColuna } : item
      )
    );
  };

  const recebidas = ocorrencias.filter((o) => o.coluna === "recebidas");
  const emAnalise = ocorrencias.filter((o) => o.coluna === "analise");
  const resolvidas = ocorrencias.filter((o) => o.coluna === "resolvidas");

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitles}>
          <h1 className={styles.pageTitle}>Denúncias e ocorrências</h1>
          <p className={styles.pageSubtitle}>Acompanhamento de relatos de rota, atrasos e conduta</p>
        </div>
        <button
          className={styles.primaryDarkBtn}
          onClick={() => navigate("/suporte")}
        >
          Ir para Central de Suporte
        </button>
      </div>

      {/* Banner Escuro Superior */}
      <section className={styles.summaryBanner}>
        <div className={styles.bannerStat}>
          <strong className={styles.bannerValue}>{String(recebidas.length).padStart(2, "0")}</strong>
          <span className={styles.bannerLabel}>Recebidas hoje</span>
        </div>
        <div className={styles.bannerStat}>
          <strong className={`${styles.bannerValue} ${styles.bannerValueHighlight}`}>
            {String(emAnalise.length).padStart(2, "0")}
          </strong>
          <span className={styles.bannerLabel}>Em análise</span>
        </div>
        <div className={styles.bannerStat}>
          <strong className={styles.bannerValue}>{String(resolvidas.length).padStart(2, "0")}</strong>
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
            <span className={styles.columnCount}>{recebidas.length}</span>
          </div>
          <div className={styles.cardsStack}>
            {recebidas.map((item) => (
              <article key={item.id} className={styles.incidentCard}>
                <div className={styles.cardTop}>
                  <span className={styles.incidentId}>#{item.id}</span>
                  <span
                    className={`${styles.severityBadge} ${
                      item.severidade === "Alta"
                        ? styles.severityHigh
                        : styles.severityMedium
                    }`}
                  >
                    {item.severidade}
                  </span>
                </div>
                <h3 className={styles.incidentTitle}>{item.titulo}</h3>
                <p className={styles.incidentDesc}>{item.desc}</p>
                <div className={styles.cardFooter}>
                  <span>{item.rodape}</span>
                  <button
                    className={styles.cardActionBtn}
                    onClick={() => avancarColuna(item.id, "analise")}
                  >
                    Analisar →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Coluna 2: Em análise */}
        <div className={`${styles.kanbanColumn} ${styles.colInProgress}`}>
          <div className={styles.columnHeader}>
            <h2 className={styles.columnTitle}>Em análise</h2>
            <span className={styles.columnCount}>{emAnalise.length}</span>
          </div>
          <div className={styles.cardsStack}>
            {emAnalise.map((item) => (
              <article key={item.id} className={styles.incidentCard}>
                <div className={styles.cardTop}>
                  <span className={styles.incidentId}>#{item.id}</span>
                  <span className={`${styles.severityBadge} ${styles.severityMedium}`}>
                    {item.severidade}
                  </span>
                </div>
                <h3 className={styles.incidentTitle}>{item.titulo}</h3>
                <p className={styles.incidentDesc}>{item.desc}</p>
                <div className={styles.cardFooter}>
                  <button
                    className={styles.cardActionBtn}
                    onClick={() =>
                      navigate("/monitoramento", { state: { vanId: item.vanId } })
                    }
                  >
                    Rastrear van
                  </button>
                  <button
                    className={styles.cardActionBtn}
                    onClick={() => avancarColuna(item.id, "resolvidas")}
                  >
                    Concluir →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Coluna 3: Resolvidas */}
        <div className={`${styles.kanbanColumn} ${styles.colResolved}`}>
          <div className={styles.columnHeader}>
            <h2 className={styles.columnTitle}>Resolvidas</h2>
            <span className={styles.columnCount}>{resolvidas.length}</span>
          </div>
          <div className={styles.cardsStack}>
            {resolvidas.map((item) => (
              <article key={item.id} className={styles.incidentCard}>
                <div className={styles.cardTop}>
                  <span className={styles.incidentId}>#{item.id}</span>
                  <span className={`${styles.severityBadge} ${styles.severityLow}`}>
                    Concluída
                  </span>
                </div>
                <h3 className={styles.incidentTitle}>{item.titulo}</h3>
                <p className={styles.incidentDesc}>{item.desc}</p>
                <div className={styles.cardFooter}>
                  <span>{item.rodape}</span>
                  <button
                    className={styles.cardActionBtn}
                    onClick={() => navigate("/suporte")}
                  >
                    Ver chamado
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}