import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Suporte.module.css";

const TICKETS_INICIAIS = [
  {
    id: 1042,
    iniciais: "AL",
    nome: "Ana Luiza",
    perfil: "Responsável",
    hora: "14:20",
    assunto: "Alteração de ponto de embarque",
    status: "Em atendimento",
    nota: "O motorista Carlos Eduardo será notificado automaticamente após a alteração da rota.",
    mensagens: [
      { autor: "usuario", texto: "Olá! Preciso atualizar o endereço de embarque do meu filho para amanhã.", hora: "14:20" },
      { autor: "admin", texto: "Olá, Ana! Já localizei o cadastro da Van 01. Qual será o novo endereço?", hora: "14:22" },
    ],
  },
  {
    id: 1041,
    iniciais: "CE",
    nome: "Carlos Eduardo",
    perfil: "Motorista • Van 01",
    hora: "11:05",
    assunto: "Atualização de CNH no sistema",
    status: "Em atendimento",
    nota: "Documento anexado na fila de validação administrativa.",
    mensagens: [
      { autor: "usuario", texto: "Bom dia! Acabei de enviar a foto da minha CNH renovada.", hora: "11:05" },
    ],
  },
];

export default function Suporte() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(TICKETS_INICIAIS);
  const [ticketAtivoId, setTicketAtivoId] = useState(1042);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [busca, setBusca] = useState("");

  const ticketAtual = tickets.find((t) => t.id === ticketAtivoId) || tickets[0];

  const handleEnviar = (e) => {
    e.preventDefault();
    if (!novaMensagem.trim()) return;

    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketAtual.id
          ? {
              ...t,
              mensagens: [
                ...t.mensagens,
                { autor: "admin", texto: novaMensagem, hora: "Agora" },
              ],
            }
          : t
      )
    );
    setNovaMensagem("");
  };

  const marcarResolvido = () => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketAtual.id ? { ...t, status: "Resolvido" } : t
      )
    );
  };

  const ticketsFiltrados = tickets.filter(
    (t) =>
      t.nome.toLowerCase().includes(busca.toLowerCase()) ||
      t.assunto.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitles}>
          <h1 className={styles.pageTitle}>Central de suporte</h1>
          <p className={styles.pageSubtitle}>Atendimento a responsáveis, motoristas e escolas</p>
        </div>
        <button
          className={styles.primaryDarkBtn}
          onClick={() => navigate("/usuarios")}
        >
          Consultar usuários
        </button>
      </div>

      {/* Área Dividida */}
      <div className={styles.chatLayout}>
        {/* Caixa de Entrada */}
        <aside className={styles.inboxPanel}>
          <div className={styles.inboxHeader}>
            <h2 className={styles.inboxTitle}>Caixa de entrada</h2>
            <span className={styles.inboxBadge}>{tickets.length} chamados</span>
          </div>

          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar chamado ou usuário..."
            className={styles.searchInput}
          />

          <div className={styles.ticketList}>
            {ticketsFiltrados.map((ticket) => {
              const ultimaMsg = ticket.mensagens[ticket.mensagens.length - 1]?.texto || "";
              return (
                <div
                  key={ticket.id}
                  onClick={() => setTicketAtivoId(ticket.id)}
                  className={`${styles.ticketCard} ${
                    ticketAtual.id === ticket.id ? styles.ticketCardActive : ""
                  }`}
                >
                  <div className={styles.ticketTop}>
                    <div className={styles.ticketUser}>
                      <span className={styles.ticketAvatar}>{ticket.iniciais}</span>
                      <span>{ticket.nome}</span>
                    </div>
                    <span className={styles.ticketTime}>{ticket.hora}</span>
                  </div>
                  <p className={styles.ticketSubject}>{ticket.assunto}</p>
                  <p className={styles.ticketPreview}>{ultimaMsg}</p>
                  <span
                    className={`${styles.statusTag} ${
                      ticket.status === "Resolvido"
                        ? styles.statusResolved
                        : styles.statusOpen
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Janela do Chat */}
        <section className={styles.chatPanel}>
          <div className={styles.chatHeader}>
            <div className={styles.chatUserInfo}>
              <div className={styles.chatAvatar}>{ticketAtual.iniciais}</div>
              <div>
                <h3 className={styles.chatTitle}>{ticketAtual.assunto}</h3>
                <p className={styles.chatMeta}>
                  Chamado #{ticketAtual.id} • {ticketAtual.nome} ({ticketAtual.perfil})
                </p>
              </div>
            </div>
            <button className={styles.resolveBtn} onClick={marcarResolvido}>
              {ticketAtual.status === "Resolvido" ? "✓ Resolvido" : "Marcar como resolvido"}
            </button>
          </div>

          <div className={styles.messagesArea}>
            {ticketAtual.mensagens.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.messageGroup} ${
                  msg.autor === "admin"
                    ? styles.messageOutgoing
                    : styles.messageIncoming
                }`}
              >
                <div
                  className={`${styles.bubble} ${
                    msg.autor === "admin"
                      ? styles.bubbleOutgoing
                      : styles.bubbleIncoming
                  }`}
                >
                  {msg.texto}
                </div>
                <span className={styles.messageTime}>
                  {msg.autor === "admin" ? "Suporte Lumio" : ticketAtual.nome} • {msg.hora}
                </span>
              </div>
            ))}

            {ticketAtual.nota && (
              <div className={styles.systemNote}>
                <span className={styles.systemNoteTitle}>Nota operacional</span>
                <span>{ticketAtual.nota}</span>
              </div>
            )}
          </div>

          <form className={styles.chatInputBar} onSubmit={handleEnviar}>
            <input
              type="text"
              value={novaMensagem}
              onChange={(e) => setNovaMensagem(e.target.value)}
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