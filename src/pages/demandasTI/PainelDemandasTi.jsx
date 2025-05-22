import { Outlet } from "react-router";
import { Link } from "react-router";
import Title from "../../components/shared/title/Title";

const DemandasTi = () => {
  return (
    <div id="DemandasTi">
      <Title>Gerenciamento de demandas</Title>

      <div>
        {/* navigation */}
        <div className="flex gap-3">
          <div className="px-2 py-1 bg-primary-500 hover:bg-primary-600 text-md font-bold text-white rounded-t-lg actived">
            <Link to={"/demandasti/"}>
              <h3>Todas Demandas</h3>
            </Link>
          </div>

          <div className="px-2 py-1 bg-primary-500 hover:bg-primary-600 text-md font-bold text-white rounded-t-lg">
            <Link to={"userdemandas"}>
              <h3>Minhas Demandas</h3>
            </Link>
          </div>

          <div className="px-2 py-1 bg-primary-500 hover:bg-primary-600 text-md font-bold text-white rounded-t-lg">
            <Link to={"history"}>
              <h3>Histórico de Demandas</h3>
            </Link>
          </div>
        </div>

        {/* outlet */}
        <div className=" p-5 rounded-b-sm bg-gray-50 shadow-md">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DemandasTi;
