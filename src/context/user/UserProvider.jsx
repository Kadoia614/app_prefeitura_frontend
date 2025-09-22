import { useState } from "react";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";

export const UserProvider = ({ children }) => {
  let [user, setUser] = useState({
    ip: null,
    name: null,
    auth: false,
    scopo: null,
  });

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

  return (
    <UserContext.Provider
      value={{
        AttScopo,
        AttAuth,
        attUser,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
