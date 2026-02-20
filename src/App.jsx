import { Routes, Route } from "react-router";

import Header from "./pages/layout/Header";
import Login from "./pages/login/Login";

import ServicesCards from "./pages/Services";

// import DemandasTi from "./pages/demandasTI/PainelDemandasTi";
// import Demandas from "./pages/demandasTI/AllDemandas";
// import UserDemandas from "./pages/demandasTI/UserDemandas";
// import HistoryDemandas from "./pages/demandasTI/HistoryDemandas";

import FT_APP from "./pages/FT_APP";
import ProtectRoutes from "./middleware/ProtectRoutes";
import HandleError from "./middleware/HandleError";
import Admin from "./pages/admin/PainelAdmin";
import UserConfig from "./pages/user/UserConfig";
import Footer from "./pages/layout/Footer";
import CertidaoIPTU from "./pages/iptu/certidao/Certidao";
import Esporte from "./pages/esporte/Esporte";
import MinhaCasa from "./pages/minhacasa/MinhaCasa";
import Reservas from "./pages/Reservas";
import TelaTeste from "./pages/TelaTeste";

function App() {
  const Env = import.meta.env.VITE_APP_NODE_ENV;

  const servicos = [
    {
      path: "config",
      component: <UserConfig></UserConfig>,
    },
    {
      path: "certidao",
      component: <CertidaoIPTU></CertidaoIPTU>,
    },
    {
      path: "esporte",
      component: <Esporte></Esporte>,
    },
    {
      path: "frente-de-trabalho",
      component: <FT_APP></FT_APP>,
    },
    {
      path: "admin",
      component: <Admin></Admin>,
    },
    {
      path: "minha-casa-minha-vida",
      component: <MinhaCasa></MinhaCasa>,
    },
    {
      path: "reservas",
      component: <Reservas></Reservas>,
    },
    {
      path: "teste",
      component: <TelaTeste></TelaTeste>
    }
  ];

  return (
    <>
      {Env === "manutencao" ? (
        <div className=" bg-background">
          <Header />

          <div className="absolute w-full bg-background-muted h-full md:max-w-[50vw] md:max-h-[50vh] rounded-md left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="animate-pulse flex justify-center items-center h-full w-full">
              <h1 className="text-center text-2xl text-text-secondary mt-5">
                {" "}
                Sistema em manutenção, tente novamente em alguns minutos...
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div id="Main" className="min-h-full flex flex-col bg-background">
            <Header />
            <div className="flex flex-col justify-between h-[100%] overflow-auto">
              <Routes>
                <Route path="/" index element={<Login />} />

                <Route path="/services/:id?" element={<ProtectRoutes />}>
                  <Route index element={<ServicesCards />} />

                  {servicos.map((servico) => (
                    <Route
                      key={servico.path}
                      path={servico.path}
                      element={servico.component}
                    />
                  ))}
                </Route>

                <Route path="*" element={<HandleError />} />
              </Routes>
              {Env === "development" && (
                <div className="bg-background-muted text-danger fixed rounded-md p-4 left-2 bottom-2 z-999">
                  Sistema em ambiente de desenvolvimento...
                </div>
              )}
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
