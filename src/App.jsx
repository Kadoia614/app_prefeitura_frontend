import { Routes, Route } from "react-router";

import Header from "./pages/layout/Header";
import Login from "./pages/login/Login";

import ServicesCards from "./pages/Services";

// import DemandasTi from "./pages/demandasTI/PainelDemandasTi";
// import Demandas from "./pages/demandasTI/AllDemandas";
// import UserDemandas from "./pages/demandasTI/UserDemandas";
// import HistoryDemandas from "./pages/demandasTI/HistoryDemandas";

import FT_APP from "./pages/FT/FT_APP";

import ProtectRoutes from "./middleware/ProtectRoutes";
import HandleError from "./middleware/HandleError";
import Admin from "./pages/admin/PainelAdmin";
import UserConfig from "./pages/user/UserConfig";
import Footer from "./pages/layout/Footer";
import CertidaoIPTU from "./pages/iptu/certidao/Certidao";

function App() {
  return (
    <>
      <div id="Main" className="min-h-full flex flex-col">
        <Header />
        <div className="flex flex-col justify-between h-[100%] overflow-scroll">
          <Routes>
            <Route path="/" index element={<Login />} />

            <Route path="/services" element={<ProtectRoutes />}>
              <Route index element={<ServicesCards />} />
              <Route path="config" element={<UserConfig />} />
              <Route path="admin" element={<Admin />} />
              <Route path="ft-app" element={<FT_APP />}></Route>
              <Route path="iptu/certidao" element={<CertidaoIPTU></CertidaoIPTU>}></Route>
            </Route>

            <Route path="*" element={<HandleError />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
