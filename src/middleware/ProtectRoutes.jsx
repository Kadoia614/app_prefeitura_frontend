import { useEffect, useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router";

import { UserContext } from "../context/UserContextFile";
import API from "../service/API";
import Loading from "../components/layout/Loading";
import Error from "./HandleError";

const ProtectRoutes = () => {
  let { setAuth, setScopo } = useContext(UserContext);
  let [isLoading, setIsLoading] = useState(true); // Para controlar a exibição enquanto carrega
  let [error, setError] = useState(null);
  const navigate = useNavigate();
  const authUser = async () => {
    try {
      const response = await API.get("/auth");
      let responseScopo = response.data.user.role;
      console.log("user autenticado");
      setScopo(responseScopo);
      setAuth(true);
    } catch (err) {
      if (err.status === 401) {
        setAuth(false);
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.log(err.response.data.message);
        setError(err);
      }
    } finally {
      setIsLoading(false); // Quando os dados estiverem carregados
    }
  };

  useEffect(() => {
    authUser();
  }, []);

  if (error) {
    return <Error Error={error.response.data.message}></Error>;
  }

  return (
    <>
      {isLoading && <Loading></Loading>}
      <div className="content">
        <div className="container mx-auto bg-gray-50">
          <Outlet context={{ setIsLoading }} />
        </div>
      </div>
    </>
  );
};

export default ProtectRoutes;
