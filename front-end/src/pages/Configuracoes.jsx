import { useState } from 'react';
import styles from './Configuracoes.module.css';

export default function Configuracoes() {
  const [secaoAtiva, setSecaoAtiva] = useState('Segurança');

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitles}>
          <h1 className={styles.pageTitle}>Configurações e segurança</h1>
          <p className={styles.pageSubtitle}>Políticas de acesso, permissões e parâmetros do sistema</p>
        </div>
        <button className={styles.primaryDarkBtn}>Exportar logs</button>
      </div>

      {/* Banner de Alerta */}
      <div className={styles.alertBanner}>
        <div className={styles.alertLeft}>
          <span className={styles.alertIcon}>!</span>
          <div>
            <h2 className={styles.alertTitle}>Controles de administração</h2>
            <p className={styles.alertDesc}>
              Alterações nas políticas de segurança afetam imediatamente todos os operadores do painel.
            </p>
          </div>
        </div>
        <button className={styles.alertActionBtn}>Ver histórico</button>
      </div>

      {/* Área Dividida */}
      <div className={styles.settingsGrid}>
        {/* Menu Lateral Interno */}
        <aside className={styles.panelCard}>
          <nav className={styles.navMenu}>
            <span className={styles.navMenuHeader}>Categorias</span>
            {['Geral', 'Segurança', 'Notificações', 'Integrações', 'Auditoria'].map((item) => (
              <button
                key={item}
                onClick={() => setSecaoAtiva(item)}
                className={`${styles.navItem} ${secaoAtiva === item ? styles.navItemActive : ''}`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Formulário de Políticas */}
        <section className={styles.panelCard}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Políticas de segurança</h2>
            <p className={styles.panelSubtitle}>Gerencie autenticação e proteção de sessão</p>
          </div>

          <div className={styles.settingsList}>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>Autenticação em duas etapas (2FA)</h3>
                <p className={styles.settingDesc}>Exigir código adicional no login de administradores</p>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" defaultChecked />
                <span className={styles.slider} />
              </label>
            </div>

            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>Bloqueio por tentativas inválidas</h3>
                <p className={styles.settingDesc}>Suspender acesso temporariamente após 5 falhas seguidas</p>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" defaultChecked />
                <span className={styles.slider} />
              </label>
            </div>

            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>Auditoria de alterações críticas</h3>
                <p className={styles.settingDesc}>Registrar IP e horário em aprovações de documentos e bloqueios</p>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" />
                <span className={styles.slider} />
              </label>
            </div>

            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h3 className={styles.settingTitle}>Expiração automática de sessão</h3>
                <p className={styles.settingDesc}>Encerrar sessão inativa após 30 minutos</p>
              </div>
              <label className={styles.switch}>
                <input type="checkbox" defaultChecked />
                <span className={styles.slider} />
              </label>
            </div>
          </div>

          <div className={styles.panelFooter}>
            <span className={styles.footerNote}>Última atualização: hoje às 15:40</span>
            <button className={styles.saveAmberBtn}>Salvar alterações</button>
          </div>
        </section>
      </div>
    </div>
  );
}