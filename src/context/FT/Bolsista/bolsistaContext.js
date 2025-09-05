import { createContext, useContext } from "react";

export const BolsistaContext = createContext();

export const useBolsista = () => {
  return useContext(BolsistaContext);
};
