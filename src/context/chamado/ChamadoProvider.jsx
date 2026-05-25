import {
  createContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import chamadoService from "../../service/chamadoService";

// eslint-disable-next-line react-refresh/only-export-components
export const ChamadoContext = createContext();

export const ChamadoProvider = ({ children }) => {
  const [chamados, setChamados] = useState([]);
  const eventSourceRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentChamado, setCurrentChamado] = useState(null);

  /**
   * Carrega lista de chamados com filtros opcionais
   */
  const loadChamados = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await chamadoService.list(filters);
      setChamados(data);
    } catch (err) {
      setError(err.message);
      console.error("Erro ao carregar chamados:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Carrega um chamado específico pelo ID
   */
  const loadChamadoById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await chamadoService.getById(id);
      setCurrentChamado(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Erro ao carregar chamado:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Cria um novo chamado
   */
  const createChamado = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const newChamado = await chamadoService.create(data);
      setChamados((current) => {
        if (current.some((item) => item.id === newChamado.id)) {
          return current.map((item) =>
            item.id === newChamado.id ? newChamado : item,
          );
        }
        return [...current, newChamado];
      });
      return newChamado;
    } catch (err) {
      setError(err.message);
      console.error("Erro ao criar chamado:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Atualiza um chamado existente
   */
  const updateChamado = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await chamadoService.update(id, data);
      setChamados((current) => current.map((c) => (c.id === id ? updated : c)));
      if (currentChamado?.id === id) {
        setCurrentChamado(updated);
      }
      return updated;
    } catch (err) {
      setError(err.message);
      console.error("Erro ao atualizar chamado:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentChamado]);

  /**
   * Deleta um chamado
   */
  const deleteChamado = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await chamadoService.delete(id);
      setChamados((current) => current.filter((c) => c.id !== id));
      if (currentChamado?.id === id) {
        setCurrentChamado(null);
      }
    } catch (err) {
      setError(err.message);
      console.error("Erro ao deletar chamado:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentChamado]);

  /**
   * Atribui o chamado ao usuário autenticado
   */
  const assignChamado = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await chamadoService.assign(id);
      setChamados((current) => current.map((c) => (c.id === id ? updated : c)));
      if (currentChamado?.id === id) {
        setCurrentChamado(updated);
      }
      return updated;
    } catch (err) {
      setError(err.message);
      console.error("Erro ao atribuir chamado:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentChamado]);

  const assignChamadoToUser = useCallback(async (id, responsavelId) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await chamadoService.assignToUser(id, responsavelId);
      setChamados((current) => current.map((c) => (c.id === id ? updated : c)));
      if (currentChamado?.id === id) {
        setCurrentChamado(updated);
      }
      return updated;
    } catch (err) {
      setError(err.message);
      console.error("Erro ao atribuir chamado ao usuário:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentChamado]);

  /**
   * Carrega relatório de chamados
   */
  const loadReport = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await chamadoService.getReport(filters);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Erro ao carregar relatório:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Carrega relatório completo de chamados
   */
  const loadFullReport = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await chamadoService.getFullReport(filters);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Erro ao carregar relatório completo:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const startChamadoStream = useCallback(() => {
    if (
      eventSourceRef.current &&
      eventSourceRef.current.readyState !== EventSource.CLOSED
    ) {
      return;
    }

    const source = chamadoService.subscribeToEvents(
      ({ type, payload }) => {
        setChamados((current) => {
          switch (type) {
            case "CHAMADO_CREATED":
              if (current.some((item) => item.id === payload.id)) {
                return current.map((item) =>
                  item.id === payload.id ? payload : item,
                );
              }
              return [...current, payload];
            case "CHAMADO_UPDATED":
            case "CHAMADO_ASSIGNED":
              return current.map((item) =>
                item.id === payload.id ? payload : item,
              );
            case "CHAMADO_DELETED":
              return current.filter((item) => item.id !== payload.id);
            default:
              return current;
          }
        });

        setCurrentChamado((current) =>
          current?.id === payload.id ? payload : current,
        );
      },
      (error) => {
        console.error("Erro na conexão SSE de chamados:", error);
        if (eventSourceRef.current?.readyState === EventSource.CLOSED) {
          eventSourceRef.current = null;
        }
      },
    );

    source.onopen = () => {
      console.debug("Conexão SSE de chamados aberta");
    };

    source.onerror = () => {
      if (source.readyState === EventSource.CLOSED) {
        eventSourceRef.current = null;
      }
    };

    eventSourceRef.current = source;
  }, []);

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const value = {
    chamados,
    currentChamado,
    loading,
    error,
    loadChamados,
    loadChamadoById,
    createChamado,
    updateChamado,
    deleteChamado,
    assignChamado,
    assignChamadoToUser,
    loadReport,
    loadFullReport,
    startChamadoStream,
    setError,
  };

  return (
    <ChamadoContext.Provider value={value}>{children}</ChamadoContext.Provider>
  );
};

export default ChamadoProvider;

ChamadoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
