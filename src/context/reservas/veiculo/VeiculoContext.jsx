import { createContext, useContext } from "react";

export const VeiculoContext = createContext();

export const useVeiculoContext = () => {
  return useContext(VeiculoContext);
}
