import { createContext, useContext } from "react";

export const BolsistaContext = createContext();

export const useBolsistaContext = () => {
  return useContext(BolsistaContext);
}
