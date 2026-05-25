import { useCallback, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";
import API from "../../api/API";
import { useToast } from "../../components/shared/toast/ToastProvider";
import { useLoadingContext } from "../loading/LoadingContext";

export const UserProvider = ({ children }) => {
  let { showToast } = useToast();
  let { attIsLoading } = useLoadingContext();

  const [user, setUser] = useState({
    ip: null,
    name: null,
    auth: false,
    scopo: null,
  });
  const [services, setServices] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const [params, setParams] = useState({});

  const AttAuth = useCallback((value) => {
    setUser((e) => ({ ...e, auth: value }));
  }, []);

  const AttScopo = useCallback((value) => {
    setUser((e) => ({ ...e, scopo: value }));
  }, []);

  const attUser = useCallback((IP, username, scopo) => {
    setUser({
      ip: IP,
      name: username,
      scopo: scopo,
    });
  }, []);

  const getServices = useCallback(async () => {
    try {
      attIsLoading(true);

      const response = await API.get("/service/user");
      setServices(response.data.services); // Atualiza o estado com os serviços
    } catch (error) {
      showToast("error", "Error", error.response?.data?.message || "Erro ao carregar serviços");
      return []; // Retorna um array vazio em caso de erro
    } finally {
      attIsLoading(false);
    }
  }, [attIsLoading, showToast]);

  const switchPermissions = useCallback(async () => {
      let ServicePermissions = services.filter((service) => {
        return service.id === Number(params.id);
      });

      const serviceTarget = ServicePermissions[0];

      setPermissions(serviceTarget?.permissions[0]);
  }, [params.id, services]);

  useEffect(() => {
    switchPermissions();
  }, [switchPermissions]);

  const AttParams = useCallback((param) => {
    setParams(param);
  }, []);

  return (
    <UserContext.Provider
      value={{
        AttScopo,
        AttAuth,
        attUser,
        user,
        services,
        getServices,
        permissions,
        AttParams
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
