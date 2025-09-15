import { createContext, useContext } from "react";

export const LoadingContext = createContext(false);

export const useLoadingContext = () => {
  return useContext(LoadingContext);
}
