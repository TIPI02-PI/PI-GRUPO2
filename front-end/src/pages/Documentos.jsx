import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Documentos.module.css";

const DOCS_MOCK = [
  {
    id: 1,
    titulo: "CNH Categoria D",
    dono: "Carlos Eduardo • Van 01",
    arquivo: "cnh_carlos_eduardo.pdf",
    status: "Pendente",
    data: "Hoje, 10:15",
    nomeCompleto: "Carlos Eduardo Souza",
    detalhe: "D • Exerce Atividade Remunerada",
    validade: "18/09/2029",
    observacaoSalva: "",
  },
  {
    id: 2,
    titulo: "CRLV 2026 - Van 03",
    dono: "Roberto Almeida • Van 03",
    arquivo: "crlv_van03_2026.pdf",
    status: "Pendente",
    data: "Hoje, 09:40",
    nomeCompleto: "Roberto Almeida Lima",
    detalhe: "Placa XYZ-9K88 • Transporte Escolar",
    validade: "30/11/2026",
    observacaoSalva: "",
  },
  {
    id: 3,
    titulo: "Certidão Negativa",
    dono: "Lucas Oliveira • Van 02",
    arquivo: "certidao_lucas.pdf",
    status: "Aprovado",
    data: "Ontem",
    nomeCompleto: "Lucas Oliveira Santos",
    detalhe: "Registro Municipal Regular",
    validade: "12/05/2027",
    observacaoSalva: "",
  },
];

export default function Documentos() {
  const location = useLocation();
  const navigate = useNavigate();

  const [docs, setDocs] = useState(DOCS_MOCK);
  const [docSelecionadoId, setDocSelecionadoId] = useState(
    () => location.state?.selectedId || 1
  );
  const [observacao, setObservacao] = useState("");
  const [zoom, setZoom] = useState(1);

  const docAtual = docs.find((d) => d.id === docSelecionadoId) || docs[0];

  const handleSelecionarDoc = (doc) => {
    setDocSelecionadoId(doc.id);
    setObservacao(doc.observacaoSalva || "");
    setZoom(1);
  };

  const atualizarStatus = (novoStatus) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === docAtual.id
          ? {
              ...d,
              status: novoStatus,
              observacaoSalva:
                novoStatus === "Revisão solicitada" ? observacao : "",
            }
          : d
      )
    );
  };

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitles}>
          <h1 className={styles.pageTitle}>Documentos</h1>
          <p className={styles.pageSubtitle}>
            Validação de CNH, CRLV e autorizações de transporte escolar
          </p>
        </div>
        <button
          type="button"
          className={styles.primaryDarkBtn}
          onClick={() => navigate("/motoristas")}
        >
          Ver motoristas e vans
        </button>
      </div>

      {/* Grid de 3 Colunas */}
      <div className={styles.threeColGrid}>
        {/* Coluna 1: Fila de Documentos */}
        <aside className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Documentos recebidos</h2>
              <p className={styles.panelSubtitle}>{docs.length} arquivos na fila</p>
            </div>
          </div>

          <div className={styles.docList}>
            {docs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleSelecionarDoc(doc)}
                className={`${styles.docCard} ${
                  docAtual.id === doc.id ? styles.docCardSelected : ""
                }`}
              >
                <div className={styles.docCardTop}>
                  <span className={styles.docFileIcon}>📄</span>
                  <div>
                    <p className={styles.docName}>{doc.titulo}</p>
                    <span className={styles.docOwner}>{doc.dono}</span>
                  </div>
                </div>
                <div className={styles.docCardFooter}>
                  <span
                    className={`${styles.docBadge} ${
                      doc.status === "Aprovado"
                        ? styles.badgeApproved
                        : styles.badgePending
                    }`}
                  >
                    {doc.status}
                  </span>
                  <span className={styles.docDate}>{doc.data}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Coluna 2: Pré-visualização */}
        <section className={styles.panelCard}>
          <div className={styles.previewToolbar}>
            <div>
              <h2 className={styles.panelTitle}>Pré-visualização do documento</h2>
              <p className={styles.panelSubtitle}>{docAtual.arquivo}</p>
            </div>
            <div className={styles.zoomControls}>
              <button
                type="button"
                className={styles.iconBtn}
                title="Diminuir zoom"
                onClick={() =>
                  setZoom((z) => Math.max(0.8, Number((z - 0.1).toFixed(1))))
                }
              >
                -
              </button>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  minWidth: "38px",
                  textAlign: "center",
                }}
              >
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                className={styles.iconBtn}
                title="Aumentar zoom"
                onClick={() =>
                  setZoom((z) => Math.min(1.2, Number((z + 0.1).toFixed(1))))
                }
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.previewCanvas}>
            <div
              className={styles.documentSheet}
              style={{
                transform: `scale(${zoom})`,
                transition: "transform 150ms ease",
              }}
            >
              <div className={styles.sheetHeader}>
                <p className={styles.sheetTitle}>{docAtual.titulo}</p>
              </div>
              <div className={styles.sheetBody}>
                <div className={styles.sheetPhotoPlaceholder}>Foto</div>
                <div className={styles.sheetFields}>
                  <div className={styles.sheetFieldRow}>
                    <span className={styles.sheetFieldLabel}>Titular</span>
                    <span className={styles.sheetFieldValue}>
                      {docAtual.nomeCompleto}
                    </span>
                  </div>
                  <div className={styles.sheetFieldRow}>
                    <span className={styles.sheetFieldLabel}>Dados</span>
                    <span className={styles.sheetFieldValue}>
                      {docAtual.detalhe}
                    </span>
                  </div>
                  <div className={styles.sheetFieldRow}>
                    <span className={styles.sheetFieldLabel}>Validade</span>
                    <span className={styles.sheetFieldValue}>
                      {docAtual.validade}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.sheetFooter}>
                Documento digital verificado via QR Code
              </div>
            </div>
          </div>
        </section>

        {/* Coluna 3: Análise e Aprovação */}
        <aside className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Análise de documento</h2>
          </div>

          <span
            className={`${styles.docBadge} ${
              docAtual.status === "Aprovado"
                ? styles.badgeApproved
                : styles.badgePending
            }`}
            style={{ alignSelf: "flex-start" }}
          >
            {docAtual.status}
          </span>

          <div className={styles.checklistSection}>
            <span className={styles.checklistLabel}>Critérios obrigatórios</span>
            <label className={styles.checkItem}>
              <input type="checkbox" defaultChecked />
              <span>Documento legível e sem cortes</span>
            </label>
            <label className={styles.checkItem}>
              <input type="checkbox" defaultChecked />
              <span>Dentro do prazo de validade</span>
            </label>
            <label className={styles.checkItem}>
              <input type="checkbox" defaultChecked />
              <span>Dados conferem com o cadastro</span>
            </label>
          </div>

          <div className={styles.notesField}>
            <span className={styles.checklistLabel}>Observação interna</span>
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              className={styles.notesTextarea}
              placeholder="Adicione um comentário caso solicite revisão..."
            />
          </div>

          <div className={styles.actionsStack}>
            <button
              type="button"
              className={styles.approveBtn}
              onClick={() => atualizarStatus("Aprovado")}
            >
              Aprovar documento
            </button>
            <button
              type="button"
              className={styles.revisionBtn}
              onClick={() => atualizarStatus("Revisão solicitada")}
            >
              Solicitar revisão
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}