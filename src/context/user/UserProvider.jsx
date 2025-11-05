import { useState } from "react";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";
import API from "../../api/API";
import { useToast } from "../../components/shared/toast/ToastProvider";

export const UserProvider = ({ children }) => {
  let { showToast } = useToast();

  const [user, setUser] = useState({
    ip: null,
    name: null,
    auth: false,
    scopo: null,
  });
  const [services, setServices] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const AttAuth = (value) => {
    setUser((e) => ({ ...e, auth: value }));
  };

  const AttScopo = (value) => {
    setUser((e) => ({ ...e, scopo: value }));
  };

  const attUser = (IP, username, scopo) => {
    setUser({
      ip: IP,
      name: username,
      scopo: scopo,
    });
  };

  const getServices = async () => {
    try {
      const response = await API.get("/service/user");
      setServices(response.data.services); // Atualiza o estado com os serviços
    } catch (error) {
      console.log(error.response.data.message);
      showToast("error", "Error", error.response.data.message);
      return []; // Retorna um array vazio em caso de erro
    }
  };

  const setServicesTarget = async (target) => {
    console.log(target);
    let ServicePermissions = services.filter((service) => {
      return service.id == target;
    });
    console.log(ServicePermissions[0]?.permission || []);

    setPermissions(ServicePermissions[0]?.permission || []);
  };

  return (
    <UserContext.Provider
      value={{
        AttScopo,
        AttAuth,
        attUser,
        user,
        services,
        getServices,
        setServicesTarget,
        permissions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
