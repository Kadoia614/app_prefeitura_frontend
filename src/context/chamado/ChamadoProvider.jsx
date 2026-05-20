import React, { createContext, useState, useCallback } from "react";
import chamadoService from "../../service/chamadoService";

export const ChamadoContext = createContext();

export const ChamadoProvider = ({ children }) => {
  const [chamados, setChamados] = useState([]);
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
      setChamados([...chamados, newChamado]);
      return newChamado;
    } catch (err) {
      setError(err.message);
      console.error("Erro ao criar chamado:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [chamados]);

  /**
   * Atualiza um chamado existente
   */
  const updateChamado = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await chamadoService.update(id, data);
      setChamados(chamados.map((c) => (c.id === id ? updated : c)));
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
  }, [chamados, currentChamado]);

  /**
   * Deleta um chamado
   */
  const deleteChamado = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await chamadoService.delete(id);
      setChamados(chamados.filter((c) => c.id !== id));
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
  }, [chamados, currentChamado]);

  /**
   * Atribui o chamado ao usuário autenticado
   */
  const assignChamado = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await chamadoService.assign(id);
      setChamados(chamados.map((c) => (c.id === id ? updated : c)));
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
  }, [chamados, currentChamado]);

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
    loadReport,
    loadFullReport,
    setError,
  };

  return (
    <ChamadoContext.Provider value={value}>{children}</ChamadoContext.Provider>
  );
};

export default ChamadoContext;
