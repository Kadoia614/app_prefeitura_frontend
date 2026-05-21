import { useContext } from "react";
import { ChamadoContext } from "../context/chamado/ChamadoProvider";

/**
 * Hook customizado para usar o contexto de chamados
 * @returns {Object} Valores e métodos do contexto de chamados
 */
export const useChamados = () => {
  const context = useContext(ChamadoContext);
  if (!context) {
    throw new Error("useChamados deve ser usado dentro de ChamadoProvider");
  }
  return context;
};

export default useChamados;
