import { createContext, useContext } from "react";

export const AgendamentoContext = createContext();

export const useAgendamentoContext = () => {
  return useContext(AgendamentoContext);
}
