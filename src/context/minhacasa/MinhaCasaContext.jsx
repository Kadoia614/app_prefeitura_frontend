import { createContext, useContext } from "react";

export const MinhaCasaContext = createContext();

export const useMinhaCasaContext = () => {
  return useContext(MinhaCasaContext);
}
