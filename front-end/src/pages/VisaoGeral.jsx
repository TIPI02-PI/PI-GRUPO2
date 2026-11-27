import { useNavigate } from "react-router-dom";
import styles from "./VisaoGeral.module.css";

export default function VisaoGeral() {
  const navigate = useNavigate();

  const filaAnalise = [
    {
      id: 1,
      titulo: "CNH Motorista - Carlos Eduardo",
      meta: "Enviado há 15 min • Documentação",
      rota: "/documentos",
      docId: 1,
    },
    {
      id: 2,
      titulo: "Cadastro Van 04 - Lucas Oliveira",
      meta: "Enviado há 40 min • Frota",
      rota: "/motoristas",
    },
    {
      id: 3,
      titulo: "Ocorrência #OC-208 - Atraso matinal",
      meta: "Aberta há 18 min • Denúncias",
      rota: "/denuncias",
    },
  ];

  const acessosRapidos = [
    { titulo: "Validar documentos", desc: "4 pendentes", rota: "/documentos" },
    { titulo: "Gerenciar usuários", desc: "Responsáveis e alunos", rota: "/usuarios" },
    { titulo: "Frota e motoristas", desc: "12 vans cadastradas", rota: "/motoristas" },
    { titulo: "Acompanhar mapa", desc: "10 vans em rota", rota: "/monitoramento" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div className={styles.headerTitles}>
          <h1 className={styles.pageTitle}>Visão geral</h1>
          <p className={styles.pageSubtitle}>Resumo operacional da plataforma Lumio</p>
        </div>
        <button
          className={styles.primaryActionBtn}
          onClick={() => navigate("/monitoramento")}
        >
          Ver mapa ao vivo
        </button>
      </div>

      {/* KPIs clicáveis */}
      <section className={styles.kpiGrid}>
        <div className={styles.kpiCard} onClick={() => navigate("/motoristas")} style={{ cursor: "pointer" }}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Vans ativas</span>
          </div>
          <strong className={styles.kpiValue}>24</strong>
          <span className={styles.kpiTrend}>Ver frota →</span>
        </div>

        <div className={styles.kpiCard} onClick={() => navigate("/usuarios")} style={{ cursor: "pointer" }}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Usuários ativos</span>
          </div>
          <strong className={styles.kpiValue}>318</strong>
          <span className={styles.kpiTrend}>Gerenciar perfis →</span>
        </div>

        <div className={styles.kpiCard} onClick={() => navigate("/documentos")} style={{ cursor: "pointer" }}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Docs pendentes</span>
          </div>
          <strong className={styles.kpiValue}>04</strong>
          <span className={styles.kpiTrend}>Ir para fila →</span>
        </div>

        <div className={styles.kpiCard} onClick={() => navigate("/suporte")} style={{ cursor: "pointer" }}>
          <div className={styles.kpiHeader}>
            <span className={styles.kpiLabel}>Chamados abertos</span>
          </div>
          <strong className={styles.kpiValue}>04</strong>
          <span className={styles.kpiTrend}>Abrir suporte →</span>
        </div>
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
            {filaAnalise.map((item) => (
              <div key={item.id} className={styles.queueItem}>
                <div className={styles.queueItemInfo}>
                  <span className={styles.queueIndicator} />
                  <div>
                    <p className={styles.queueItemTitle}>{item.titulo}</p>
                    <span className={styles.queueItemMeta}>{item.meta}</span>
                  </div>
                </div>
                <button
                  className={styles.queueActionBtn}
                  onClick={() => navigate(item.rota, { state: { selectedId: item.docId } })}
                >
                  Analisar
                </button>
              </div>
            ))}
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
            {acessosRapidos.map((acesso) => (
              <button
                key={acesso.rota}
                className={styles.quickAccessItem}
                onClick={() => navigate(acesso.rota)}
              >
                <div className={styles.quickAccessLeft}>
                  <div>
                    <p className={styles.quickAccessTitle}>{acesso.titulo}</p>
                    <span className={styles.quickAccessDesc}>{acesso.desc}</span>
                  </div>
                </div>
                <span>→</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}