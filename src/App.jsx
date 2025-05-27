import { Routes, Route } from "react-router";

import Header from "./components/layout/Header";
import Login from "./components/layout/Login";

import ServicesCards from "./pages/Services";
import Users from "./pages/admin/users/Users";
import Services from "./pages/admin/services/Services";
import Setor from "./pages/admin/setor/Setor";
import Roles from "./pages/admin/roles/Roles";

import DemandasTi from "./pages/demandasTI/PainelDemandasTi";
import Demandas from "./pages/demandasTI/AllDemandas";
import UserDemandas from "./pages/demandasTI/UserDemandas";
import HistoryDemandas from "./pages/demandasTI/HistoryDemandas";

import FT_APP from "./pages/FT/FT_APP";

import ProtectRoutes from "./middleware/ProtectRoutes";
import HandleError from "./middleware/HandleError";
import Admin from "./pages/admin/PainelAdmin";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <div id="Main" className="h-full flex flex-col">
        <Header />
        <Routes>
          <Route path="/login" index element={<Login />} />

          <Route path="/" element={<ProtectRoutes />}>
            <Route index element={<ServicesCards />} />

            <Route path="admin" element={<Admin />}>
              <Route index element={<Users />} />
              <Route path="service" element={<Services />} />
              <Route path="setor" element={<Setor />} />
              <Route path="roles" element={<Roles />} />
            </Route>

            <Route path="demandasti" element={<DemandasTi />}>
              <Route index element={<Demandas />} />
              <Route path="userdemandas" element={<UserDemandas />} />
              <Route path="history" element={<HistoryDemandas />} />
            </Route>
            <Route path="/ft-app" element={<FT_APP />}></Route>
          </Route>
          
          <Route path="*" element={<HandleError />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
