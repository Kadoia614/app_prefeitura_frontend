import { useState } from "react";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";

export const UserProvider = ({ children }) => {
  let [auth, setAuth] = useState(false);
  let [scopo, setScopo] = useState(null);
  let [userServices, setUserServices] = useState([]);

  const AttAuth = (value) => {
    setAuth(value);
  };

  const AttScopo = (value) => {
    setScopo(value);
  };

  const AttUserServices = (value) => {
    setUserServices(value);
  };

  return (
    <UserContext.Provider
      value={{ scopo, auth, AttScopo, AttAuth, userServices, AttUserServices }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
