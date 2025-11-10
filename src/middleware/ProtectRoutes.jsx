import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";

import { useUserContext } from "@/context/user/UserContext";
import { useLoadingContext } from "../context/loading/LoadingContext";

import API from "../api/API";
import Error from "./HandleError";

const ProtectRoutes = () => {
  let { attIsLoading } = useLoadingContext();
  let { AttAuth, attUser, AttParams } = useUserContext();
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const param = useParams();

  const authUser = async () => {
    try {
      attIsLoading(true); // Quando os dados estiverem carregados

      const { data } = await API.get("/auth");
      console.log("user autenticado");
      attUser(data.user.ip, data.user.name, data.user.role);
      AttAuth(true);
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
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

  useEffect(() => {
    if (param.id) {
      AttParams(param);
    }
  }, [param.id]);

  if (error) {
    return <Error Error={error.response.data.message}></Error>;
  }

  return (
    <>
      <div className="container mx-auto my-4 bg-background-muted rounded-md">
        <Outlet />
      </div>
    </>
  );
};

export default ProtectRoutes;
