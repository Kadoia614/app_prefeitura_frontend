import API from "../api/API";

/**
 * Serviço para gerenciar chamados via API
 * Endpoints: /chamados
 */
const chamadoService = {
  /**
   * Cria um novo chamado
   * @param {Object} data - Dados do chamado
   * @param {string} data.patrimonio - Identificação do patrimônio
   * @param {string} data.tipo - Tipo do chamado (manutencao, reparo, instalacao, suporte, outros)
   * @param {number} data.setorId - ID do setor vinculado
   * @param {number} data.solicitanteId - ID do usuário solicitante
   * @param {string} data.descricao - Descrição detalhada
   * @param {string} data.prioridade - Prioridade (baixa, media, alta, critica)
   * @param {number} [data.responsavelId] - ID do responsável (opcional)
   * @param {string} [data.observacoes] - Observações (opcional)
   * @returns {Promise<Object>} Chamado criado
   */
  create: async (data) => {
    try {
      const response = await API.post("/chamados", data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Erro ao criar chamado");
    }
  },

  /**
   * Lista todos os chamados com filtros opcionais
   * @param {Object} [filters] - Filtros de busca
   * @param {string} [filters.status] - Filtrar por status
   * @param {number} [filters.setorId] - Filtrar por setor
   * @param {number} [filters.solicitanteId] - Filtrar por solicitante
   * @param {number} [filters.responsavelId] - Filtrar por responsável
   * @param {string} [filters.tipo] - Filtrar por tipo
   * @param {string} [filters.prioridade] - Filtrar por prioridade
   * @param {number} [filters.page] - Página
   * @param {number} [filters.limit] - Quantidade por página
   * @returns {Promise<Array>} Lista de chamados
   */
  list: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await API.get(`/chamados${params ? `?${params}` : ""}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Erro ao listar chamados");
    }
  },

  /**
   * Busca um chamado pelo ID
   * @param {string} id - ID do chamado (UUID)
   * @returns {Promise<Object>} Dados do chamado
   */
  getById: async (id) => {
    try {
      const response = await API.get(`/chamados/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Chamado não encontrado");
    }
  },

  /**
   * Atualiza um chamado existente
   * @param {string} id - ID do chamado
   * @param {Object} data - Dados a atualizar
   * @param {string} [data.status] - Novo status
   * @param {number} [data.responsavelId] - Novo responsável
   * @param {string} [data.observacoes] - Observações
   * @param {string} [data.dataResolucao] - Data de resolução
   * @param {string} [data.prioridade] - Prioridade
   * @returns {Promise<Object>} Chamado atualizado
   */
  update: async (id, data) => {
    try {
      const response = await API.put(`/chamados/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Erro ao atualizar chamado");
    }
  },

  /**
   * Deleta um chamado
   * @param {string} id - ID do chamado
   * @returns {Promise<Object>} Resposta com sucesso
   */
  delete: async (id) => {
    try {
      const response = await API.delete(`/chamados/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Erro ao deletar chamado");
    }
  },

  /**
   * Atribui o chamado ao usuário autenticado
   * @param {string} id - ID do chamado
   * @returns {Promise<Object>} Chamado com novo responsável
   */
  assign: async (id) => {
    try {
      const response = await API.patch(`/chamados/${id}/assign`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Erro ao atribuir chamado");
    }
  },

  /**
   * Gera relatório de chamados filtrado
   * @param {Object} filters - Filtros do relatório
   * @param {number} [filters.setorId] - ID do setor
   * @param {string} [filters.dateFrom] - Data inicial
   * @param {string} [filters.dateTo] - Data final
   * @returns {Promise<Array>} Dados do relatório
   */
  getReport: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await API.get(
        `/chamados/reports${params ? `?${params}` : ""}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Erro ao gerar relatório");
    }
  },

  /**
   * Gera relatório completo de chamados
   * @param {Object} filters - Filtros do relatório
   * @param {number} [filters.setorId] - ID do setor
   * @param {string} [filters.status] - Status
   * @param {string} [filters.dateFrom] - Data inicial
   * @param {string} [filters.dateTo] - Data final
   * @returns {Promise<Array>} Dados do relatório completo
   */
  getFullReport: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await API.get(
        `/chamados/reports/all${params ? `?${params}` : ""}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Erro ao gerar relatório completo");
    }
  },
};

export default chamadoService;
