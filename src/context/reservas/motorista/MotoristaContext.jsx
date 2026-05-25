import { createContext, useContext } from "react";

export const MotoristaContext = createContext();

export const useMotoristaContext = () => {
  return useContext(MotoristaContext);
}
