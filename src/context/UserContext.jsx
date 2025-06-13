import { useState, createContext } from "react";


export const UserProvider = ({ children }) => {
  let [scopo, setScopo] = useState(null);
  let [auth, setAuth] = useState(false);
  let [userServices, setUserServices] = useState([]);
const UserContext = createContext();

  return (
    <UserContext.Provider value={{ scopo, setScopo, auth, setAuth, userServices, setUserServices }}>
      {children}
    </UserContext.Provider>
  );
};