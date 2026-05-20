import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="footer w-full z-1">
      <div className="footer_container bg-primary text-on-primary p-4 text-center">
        <h2 className="text-sm">
          {" "}
          Equipe de desenvolvimento de Itapecerica da Serra © Todos os direitos
          reservados: 2025
        </h2>
        <Link
        to={"/devs"}
          className="dev-badge"
          title="Conheça os desenvolvedores"
        >
          <div className="dev-symbol">
            <i
              className="pi pi-code
"
            ></i>
          </div>
          <span>Desenvolvedores</span>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
