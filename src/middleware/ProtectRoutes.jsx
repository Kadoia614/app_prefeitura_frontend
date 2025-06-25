import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

import { useUserContext } from "@/context/UserContext";
import API from "../service/API";
import Loading from "../components/layout/Loading";
import Error from "./HandleError";

const ProtectRoutes = () => {
  let { AttAuth, AttScopo } = useUserContext();
  let [isLoading, setIsLoading] = useState(true); // Para controlar a exibição enquanto carrega
  let [error, setError] = useState(null);
  const navigate = useNavigate();
  const authUser = async () => {
    try {
      const response = await API.get("/auth");
      let responseScopo = response.data.user.role;
      console.log("user autenticado");
      AttScopo(responseScopo);
      AttAuth(true);
    } catch (err) {
      if (err.status === 401) {
        AttAuth(false);
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
      <div className="container mx-auto my-4 bg-gray-100">
        <Outlet context={{ setIsLoading }} />
      </div>
    </>
  );
};

export default ProtectRoutes;
