import { Link } from "react-router";
import "../../assets/css/devs.css";

const Devs = () => {
  return (
    <>
      <div className="dev-page-container">
        <Link to="/" className="back-link">
          <i className="fas fa-home"></i> Voltar ao Início
        </Link>

        <h1>Equipe de Desenvolvimento</h1>
        <p className="subtitle">
          Departamento de Tecnologia - Prefeitura de Itapecerica da Serra
        </p>

        <div className="dev-grid">
          <div className="dev-card">
            <img
              src="/Avatar_Miguel.png"
              alt="Miguel Moraes"
              className="dev-avatar"
            />
            <h3 className="dev-name">Miguel Moraes</h3>
            <span className="dev-role">Chefe de Divisão de Sistemas</span>
            <span className="dev-role">Desenvolvedor Fullstack</span>
            <a
              href="https://br.linkedin.com/in/miguel-moraes-46a383235"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-link"
            >
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
          </div>

          <div className="dev-card">
            <img
              src="/Avatar_Anderson.png"
              alt="Anderson Muniz"
              className="dev-avatar"
            />
            <h3 className="dev-name">Anderson Muniz</h3>
            <span className="dev-role">Tec. em Informática</span>
            <span className="dev-role">SysAdmin - Infraestrutura</span>
            <a
              href="https://www.linkedin.com/in/anderson-mz"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-link"
            >
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
          </div>
        </div>

        <div className="animar-girafa absolute bottom-0">
          {/* <!-- Corpo --> */}
          <div className="w-30 h-20 bg-yellow-300 rounded-lg relative">
            {/* <!-- Pescoço --> */}
            <div className="absolute -top-24 w-5 h-24 bg-yellow-300 rounded-lg"></div>

            {/* <!-- Cabeça --> */}
            <div className="absolute -top-32 right-25 w-12 h-12 bg-yellow-300 rounded-l-4xl rounded-r-3xl border-1 border-black">

              {/* <!-- Olhos --> */}
              <div className="olho absolute top-3 left-2 w-2 h-2 rounded-full"></div>
              <div className="olho absolute top-3 right-2 w-2 h-2 rounded-full"></div>
            </div>
            {/* <!-- Pernas --> */}
            <div className="perna2 absolute top-15 left-2 w-4 h-20 bg-yellow-300"></div>
            <div className="perna1 absolute top-15 left-24 w-4 h-20 bg-yellow-300"></div>
            {/* <!-- Cauda --> */}
            <div className="cauda absolute bottom-4 left-28 w-2 h-16 bg-yellow-300 rounded-full"></div>
            {/* <!-- Manchas --> */}
            <div className="mancha absolute top-5 left-4 w-4 h-4 bg-orange-600 rounded-full"></div>
            <div className="mancha absolute top-10 left-15 w-5 h-5 bg-orange-600 rounded-full"></div>
            <div className="mancha absolute top-15 left-6 w-3 h-3 bg-orange-600 rounded-full"></div>
            <div className="mancha absolute top-7 left-20 w-3 h-3 bg-orange-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Devs;
