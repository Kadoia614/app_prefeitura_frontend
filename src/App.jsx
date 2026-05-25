import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";

import Header from "./pages/layout/Header";
import Login from "./pages/login/Login";

import ProtectRoutes from "./middleware/ProtectRoutes";
import HandleError from "./middleware/HandleError";
import Footer from "./pages/layout/Footer";

const ServicesCards = lazy(() => import("./pages/Services"));
const FT_APP = lazy(() => import("./pages/FT_APP"));
const Admin = lazy(() => import("./pages/admin/PainelAdmin"));
const UserConfig = lazy(() => import("./pages/user/UserConfig"));
const CertidaoIPTU = lazy(() => import("./pages/iptu/certidao/Certidao"));
const Esporte = lazy(() => import("./pages/esporte/Esporte"));
const MinhaCasa = lazy(() => import("./pages/minhacasa/MinhaCasa"));
const Reservas = lazy(() => import("./pages/Reservas"));
const TelaTeste = lazy(() => import("./pages/TelaTeste"));
const FormReservas = lazy(() => import("./pages/FormReservas"));
const Devs = lazy(() => import("./pages/devs/Devs"));
const Chamados = lazy(() => import("./pages/chamados/Chamados"));

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
      path: "chamados",
      component: <Chamados></Chamados>,
    },
    {
      path: "formreservas",
      component: <FormReservas></FormReservas>,
    },
    {
      path: "teste",
      component: <TelaTeste></TelaTeste>,
    },
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
              <Suspense fallback={<div className="loading">Carregando...</div>}>
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
                  <Route
                    path={"devs"}
                    element={<Devs/>}
                  />
                  <Route path="*" element={<HandleError />} />
                </Routes>
              </Suspense>
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
