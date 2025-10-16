import { createContext, useContext } from "react";

export const EditalContext = createContext();

export const useEditalContext = () => {
  return useContext(EditalContext);
}
