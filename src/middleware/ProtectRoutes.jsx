import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

import { useUserContext } from "@/context/user/UserContext";
import API from "../api/API";
import Error from "./HandleError";
import { useLoadingContext } from "../context/loading/LoadingContext";

const ProtectRoutes = () => {
  let { attIsLoading } = useLoadingContext();
  let { AttAuth, attUser } = useUserContext();
  let [error, setError] = useState(null);
  const navigate = useNavigate();
  const authUser = async () => {
    try {
      const { data } = await API.get("/auth");
      console.log("user autenticado");
      attUser(data.user.ip, data.user.name, data.user.scopo);
      AttAuth(true);
    } catch (err) {
      if (err.status === 401) {
        AttAuth(false);
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.log(err.response.data.message);
        setError(err);
      }
    } finally {
      attIsLoading(false); // Quando os dados estiverem carregados
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
      <div className="container mx-auto my-4 bg-gray-100">
        <Outlet context={{ attIsLoading }} />
      </div>
    </>
  );
};

export default ProtectRoutes;
