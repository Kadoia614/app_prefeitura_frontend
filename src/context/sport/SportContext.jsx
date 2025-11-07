import { createContext, useContext } from "react";

export const SportContext = createContext();

export const useSportContext = () => {
  return useContext(SportContext);
}
