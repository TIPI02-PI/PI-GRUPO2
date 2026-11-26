import './LumioAdminAcesso.css';

export default function LumioAdminAccess() {
  const handleRequestAccess = () => {
    alert('Solicitação de acesso enviada para a equipe Lumio.');
  };

  return (
    <div className="lumio-register">
      {/* Card Principal */}
      <div className="lumio-register__card">
        <div className="lumio-register__top-bar" />

        <div className="lumio-register__content">
          <h1 className="lumio-register__logo">Lumio</h1>

          <span className="lumio-register__step">
            ETAPA 01 • CONTA AUTORIZADA
          </span>

          <h2 className="lumio-register__title">Acesso administrativo</h2>
          <p className="lumio-register__subtitle">
            O cadastro administrativo é feito pela equipe do Lumio.
          </p>

          <div className="lumio-register__alert">
            <div className="lumio-register__alert-border" />
            <div className="lumio-register__alert-body">
              <h3>Acesso restrito à equipe Lumio</h3>
              <p>Não é possível criar uma conta admin pelo cadastro público.</p>
            </div>
          </div>

          <button 
            type="button" 
            className="lumio-register__button"
            onClick={handleRequestAccess}
          >
            Solicitar acesso à equipe
          </button>

          <p className="lumio-register__footer-note">
            Sem coleta de endereço, CEP ou dados de localização.
          </p>
        </div>
      </div>
    </div>
  );
}