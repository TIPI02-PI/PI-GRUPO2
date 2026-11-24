import { useState } from 'react';
import styles from './Suporte.module.css';

export default function Suporte() {
  const [ticketAtivo, setTicketAtivo] = useState(1);
  const [mensagem, setMensagem] = useState('');

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitles}>
          <h1 className={styles.pageTitle}>Central de suporte</h1>
          <p className={styles.pageSubtitle}>Atendimento a responsáveis, motoristas e escolas</p>
        </div>
        <button className={styles.primaryDarkBtn}>+ Novo chamado</button>
      </div>

      {/* Área Dividida */}
      <div className={styles.chatLayout}>
        {/* Caixa de Entrada */}
        <aside className={styles.inboxPanel}>
          <div className={styles.inboxHeader}>
            <h2 className={styles.inboxTitle}>Caixa de entrada</h2>
            <span className={styles.inboxBadge}>4 abertos</span>
          </div>

          <input
            type="text"
            placeholder="Buscar chamado ou usuário..."
            className={styles.searchInput}
          />

          <div className={styles.ticketList}>
            <div
              onClick={() => setTicketAtivo(1)}
              className={`${styles.ticketCard} ${ticketAtivo === 1 ? styles.ticketCardActive : ''}`}
            >
              <div className={styles.ticketTop}>
                <div className={styles.ticketUser}>
                  <span className={styles.ticketAvatar}>AL</span>
                  <span>Ana Luiza</span>
                </div>
                <span className={styles.ticketTime}>14:20</span>
              </div>
              <p className={styles.ticketSubject}>Alteração de ponto de embarque</p>
              <p className={styles.ticketPreview}>Preciso atualizar o endereço de busca para amanhã...</p>
              <span className={`${styles.statusTag} ${styles.statusOpen}`}>Em atendimento</span>
            </div>
          </div>
        </aside>

        {/* Janela do Chat */}
        <section className={styles.chatPanel}>
          <div className={styles.chatHeader}>
            <div className={styles.chatUserInfo}>
              <div className={styles.chatAvatar}>AL</div>
              <div>
                <h3 className={styles.chatTitle}>Alteração de ponto de embarque</h3>
                <p className={styles.chatMeta}>Chamado #1042 • Ana Luiza (Responsável)</p>
              </div>
            </div>
            <button className={styles.resolveBtn}>Marcar como resolvido</button>
          </div>

          <div className={styles.messagesArea}>
            <div className={`${styles.messageGroup} ${styles.messageIncoming}`}>
              <div className={`${styles.bubble} ${styles.bubbleIncoming}`}>
                Olá! Preciso atualizar o endereço de embarque do meu filho para amanhã.
              </div>
              <span className={styles.messageTime}>Ana Luiza • 14:20</span>
            </div>

            <div className={`${styles.messageGroup} ${styles.messageOutgoing}`}>
              <div className={`${styles.bubble} ${styles.bubbleOutgoing}`}>
                Olá, Ana! Já localizei o cadastro da Van 02. Qual será o novo endereço?
              </div>
              <span className={styles.messageTime}>Suporte Lumio • 14:22</span>
            </div>

            <div className={styles.systemNote}>
              <span className={styles.systemNoteTitle}>Nota operacional</span>
              <span>O motorista Carlos Eduardo será notificado automaticamente após a alteração da rota.</span>
            </div>
          </div>

          <form
            className={styles.chatInputBar}
            onSubmit={(e) => {
              e.preventDefault();
              setMensagem('');
            }}
          >
            <input
              type="text"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Escreva sua resposta..."
              className={styles.messageInput}
            />
            <button type="submit" className={styles.sendBtn}>Enviar</button>
          </form>
        </section>
      </div>
    </div>
  );
}