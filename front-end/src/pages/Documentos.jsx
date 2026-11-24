import { useState } from 'react';
import styles from './Documentos.module.css';

export default function Documentos() {
  const [docSelecionado, setDocSelecionado] = useState(1);

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitles}>
          <h1 className={styles.pageTitle}>Documentos</h1>
          <p className={styles.pageSubtitle}>Validação de CNH, CRLV e autorizações de transporte escolar</p>
        </div>
        <button className={styles.primaryDarkBtn}>+ Solicitar documento</button>
      </div>

      {/* Grid de 3 Colunas */}
      <div className={styles.threeColGrid}>
        {/* Coluna 1: Fila de Documentos */}
        <aside className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Documentos recebidos</h2>
              <p className={styles.panelSubtitle}>4 arquivos na fila</p>
            </div>
          </div>

          <div className={styles.docList}>
            <div
              onClick={() => setDocSelecionado(1)}
              className={`${styles.docCard} ${docSelecionado === 1 ? styles.docCardSelected : ''}`}
            >
              <div className={styles.docCardTop}>
                <span className={styles.docFileIcon}>📄</span>
                <div>
                  <p className={styles.docName}>CNH Categoria D</p>
                  <span className={styles.docOwner}>Carlos Eduardo • Van 01</span>
                </div>
              </div>
              <div className={styles.docCardFooter}>
                <span className={`${styles.docBadge} ${styles.badgePending}`}>Pendente</span>
                <span className={styles.docDate}>Hoje, 10:15</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Coluna 2: Pré-visualização */}
        <section className={styles.panelCard}>
          <div className={styles.previewToolbar}>
            <div>
              <h2 className={styles.panelTitle}>Pré-visualização do documento</h2>
              <p className={styles.panelSubtitle}>cnh_carlos_eduardo.pdf</p>
            </div>
            <div className={styles.zoomControls}>
              <button className={styles.iconBtn} title="Diminuir zoom">-</button>
              <button className={styles.iconBtn} title="Aumentar zoom">+</button>
            </div>
          </div>

          <div className={styles.previewCanvas}>
            <div className={styles.documentSheet}>
              <div className={styles.sheetHeader}>
                <p className={styles.sheetTitle}>Carteira Nacional de Habilitação</p>
              </div>
              <div className={styles.sheetBody}>
                <div className={styles.sheetPhotoPlaceholder}>Foto</div>
                <div className={styles.sheetFields}>
                  <div className={styles.sheetFieldRow}>
                    <span className={styles.sheetFieldLabel}>Nome completo</span>
                    <span className={styles.sheetFieldValue}>Carlos Eduardo Souza</span>
                  </div>
                  <div className={styles.sheetFieldRow}>
                    <span className={styles.sheetFieldLabel}>Categoria / EAR</span>
                    <span className={styles.sheetFieldValue}>D • Exerce Atividade Remunerada</span>
                  </div>
                  <div className={styles.sheetFieldRow}>
                    <span className={styles.sheetFieldLabel}>Validade</span>
                    <span className={styles.sheetFieldValue}>18/09/2029</span>
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

          <span className={styles.statusPillWarning}>Aguardando validação</span>

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
              <input type="checkbox" />
              <span>Observação EAR e curso escolar</span>
            </label>
          </div>

          <div className={styles.notesField}>
            <span className={styles.checklistLabel}>Observação interna</span>
            <textarea
              className={styles.notesTextarea}
              placeholder="Adicione um comentário caso solicite revisão..."
            />
          </div>

          <div className={styles.actionsStack}>
            <button className={styles.approveBtn}>Aprovar documento</button>
            <button className={styles.revisionBtn}>Solicitar revisão</button>
          </div>
        </aside>
      </div>
    </div>
  );
}