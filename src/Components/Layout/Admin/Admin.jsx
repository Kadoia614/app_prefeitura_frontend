import { Outlet } from "react-router";
import { Link } from "react-router";
import Title from "../../shared/Title";

const Admin = () => {
  return (
    <div id="Admin">
      <Title>Com grandes poderes vêm grandes responsabilidades</Title>
      <div>
        <div className="flex gap-3 mt-10">
          <div className="px-2 py-1 bg-primary-500 hover:bg-primaryhover text-md font-bold text-white rounded-t-lg">
            <Link to={"/admin/"}>
              <h3>Painel de Admin</h3>
            </Link>
          </div>
          <div className="px-2 py-1 bg-primary-500 hover:bg-primaryhover text-md font-bold text-white rounded-t-lg">
            <Link to={"service"}>
              <h3>Painel de Serviços</h3>
            </Link>
          </div>
          <div className="px-2 py-1 bg-primary-500 hover:bg-primaryhover text-md font-bold text-white rounded-t-lg">
            <Link to={"setor"}>
              <h3>Setores</h3>
            </Link>
          </div>
          <div className="px-2 py-1 bg-primary-500 hover:bg-primaryhover text-md font-bold text-white rounded-t-lg">
            <Link to={"roles"}>
              <h3>Roles</h3>
            </Link>
          </div>
        </div>
        <div className=" p-5 rounded-b-sm bg-gray-50 shadow-md">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Admin;
