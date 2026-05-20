import { useEffect, useState } from "react";
import { useChamados } from "../../hooks/UseChamados";
import "../../assets/css/chamados.css";

const Chamados = () => {
  const { chamados, loading, error, loadChamados, createChamado } = useChamados();
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSetor, setFilterSetor] = useState("");
  const [formData, setFormData] = useState({
    patrimonio: "",
    tipo: "manutencao",
    setorId: 1,
    solicitanteId: 1,
    descricao: "",
    prioridade: "media",
    observacoes: "",
  });

  useEffect(() => {
    loadChamados({ status: filterStatus, setorId: filterSetor || undefined });
  }, [filterStatus, filterSetor, loadChamados]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "setorId" || name === "solicitanteId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createChamado(formData);
      alert("Chamado criado com sucesso!");
      setFormData({
        patrimonio: "",
        tipo: "manutencao",
        setorId: 1,
        solicitanteId: 1,
        descricao: "",
        prioridade: "media",
        observacoes: "",
      });
      setShowForm(false);
    } catch (err) {
      alert("Erro ao criar chamado: " + err.message);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      aberto: "status-aberto",
      em_progresso: "status-progresso",
      resolvido: "status-resolvido",
      fechado: "status-fechado",
      cancelado: "status-cancelado",
    };
    return colors[status] || "";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      baixa: "priority-low",
      media: "priority-medium",
      alta: "priority-high",
      critica: "priority-critical",
    };
    return colors[priority] || "";
  };

  if (loading) return <div className="loading">Carregando chamados...</div>;

  return (
    <div className="chamados-container">
      <header className="chamados-header">
        <h1>Gerenciamento de Chamados</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancelar" : "+ Novo Chamado"}
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form className="form-chamado" onSubmit={handleSubmit}>
          <h2>Criar Novo Chamado</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Patrimônio *</label>
              <input
                type="text"
                name="patrimonio"
                value={formData.patrimonio}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Tipo *</label>
              <select name="tipo" value={formData.tipo} onChange={handleInputChange}>
                <option value="manutencao">Manutenção</option>
                <option value="reparo">Reparo</option>
                <option value="instalacao">Instalação</option>
                <option value="suporte">Suporte</option>
                <option value="outros">Outros</option>
              </select>
            </div>
            <div className="form-group">
              <label>Setor *</label>
              <input
                type="number"
                name="setorId"
                value={formData.setorId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Solicitante *</label>
              <input
                type="number"
                name="solicitanteId"
                value={formData.solicitanteId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Prioridade *</label>
              <select
                name="prioridade"
                value={formData.prioridade}
                onChange={handleInputChange}
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Descrição *</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                required
                rows="4"
              />
            </div>
            <div className="form-group full-width">
              <label>Observações</label>
              <textarea
                name="observacoes"
                value={formData.observacoes}
                onChange={handleInputChange}
                rows="3"
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Criar Chamado
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="filters">
        <div className="filter-group">
          <label>Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">Todos</option>
            <option value="aberto">Aberto</option>
            <option value="em_progresso">Em Progresso</option>
            <option value="resolvido">Resolvido</option>
            <option value="fechado">Fechado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Setor:</label>
          <input
            type="number"
            value={filterSetor}
            onChange={(e) => setFilterSetor(e.target.value)}
            placeholder="ID do setor"
          />
        </div>
      </div>

      <div className="chamados-list">
        {chamados.length === 0 ? (
          <p className="no-data">Nenhum chamado encontrado</p>
        ) : (
          <table className="chamados-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patrimônio</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Responsável</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {chamados.map((chamado) => (
                <tr key={chamado.id}>
                  <td>{chamado.id.substring(0, 8)}...</td>
                  <td>{chamado.patrimonio}</td>
                  <td>{chamado.tipo}</td>
                  <td>{chamado.descricao.substring(0, 30)}...</td>
                  <td>
                    <span className={`priority ${getPriorityColor(chamado.prioridade)}`}>
                      {chamado.prioridade}
                    </span>
                  </td>
                  <td>
                    <span className={`status ${getStatusColor(chamado.status)}`}>
                      {chamado.status}
                    </span>
                  </td>
                  <td>{chamado.responsavelId || "Não atribuído"}</td>
                  <td>
                    <button className="btn-small">Ver</button>
                    <button className="btn-small">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Chamados;
