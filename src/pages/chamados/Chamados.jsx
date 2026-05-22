import { useEffect, useState } from "react";
import { useChamados } from "../../hooks/UseChamados";
import API from "../../api/API";
import chamadoService from "../../service/chamadoService";
import TableContainer from "@/components/shared/table/TableContainer";
import TableButton from "@/components/shared/table/TableButton";
import Modal from "@/components/shared/modal/Modal";
import "../../assets/css/chamados.css";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import RenderStatus from "@/components/shared/RenderStatus";
import { useUserContext } from "../../context/user/UserContext";

const Chamados = () => {
  const {
    chamados,
    loading,
    error,
    loadChamados,
    createChamado,
    updateChamado,
    assignChamadoToUser,
    startChamadoStream,
  } = useChamados();
  const { permissions } = useUserContext();

  const [showForm, setShowForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedChamado, setSelectedChamado] = useState(null);
  const [selectedAssignChamado, setSelectedAssignChamado] = useState(null);
  const [selectedAssignedUserId, setSelectedAssignedUserId] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");
  const [observacoesUpdate, setObservacoesUpdate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSetor, setFilterSetor] = useState("");
  const [setores, setSetores] = useState([]);
  const [users, setUsers] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportFilters, setReportFilters] = useState({
    period: "mensal",
    year: new Date().getFullYear(),
    setorId: "",
    tipo: "",
  });
  const [formData, setFormData] = useState({
    patrimonio: "",
    tipo: "manutencao",
    setorId: "",
    solicitanteId: "",
    descricao: "",
    prioridade: "media",
    observacoes: "",
  });

  useEffect(() => {
    loadChamados({ status: filterStatus, setorId: filterSetor || undefined });
    startChamadoStream();
  }, [filterStatus, filterSetor, loadChamados, startChamadoStream]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "setorId") {
        const selectedSetorId = Number(value);
        return {
          ...prev,
          setorId: selectedSetorId,
          solicitanteId: "",
        };
      }

      return {
        ...prev,
        [name]:
          name === "solicitanteId"
            ? value === ""
              ? ""
              : Number(value)
            : value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        solicitanteId: formData.solicitanteId === "" ? null : formData.solicitanteId,
      };

      await createChamado(payload);
      alert("Chamado criado com sucesso!");
      setFormData({
        patrimonio: "",
        tipo: "manutencao",
        setorId: "",
        solicitanteId: "",
        descricao: "",
        prioridade: "media",
        observacoes: "",
      });
      setShowForm(false);
    } catch (err) {
      alert("Erro ao criar chamado: " + err.message);
    }
  };

  const loadSetores = async () => {
    try {
      const response = await API.get("/setores");
      setSetores(response.data.setores || []);
    } catch (err) {
      console.error("Erro ao carregar setores:", err);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await API.get("/user?limit=1000");
      setUsers(response.data.user || []);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    }
  };

  useEffect(() => {
    loadSetores();
    loadUsers();
  }, []);

  const isFinalizado = (status) =>
    ["resolvido", "fechado", "cancelado"].includes(status);

  const openChamadoDetail = (rowData) => {
    setSelectedChamado(rowData);
    setStatusUpdate(rowData.status || "aberto");
    setObservacoesUpdate(rowData.observacoes || "");
    setShowDetailModal(true);
  };

  const handleSaveChamado = async () => {
    if (!selectedChamado) return;

    if (isFinalizado(selectedChamado.status)) {
      setShowDetailModal(false);
      return;
    }

    try {
      await updateChamado(selectedChamado.id, {
        status: statusUpdate,
        observacoes: observacoesUpdate,
      });
      alert("Chamado atualizado com sucesso!");
      setShowDetailModal(false);
    } catch (err) {
      alert("Erro ao salvar chamado: " + err.message);
    }
  };

  const openAssignModal = (rowData) => {
    setSelectedAssignChamado(rowData);
    setSelectedAssignedUserId("");
    setShowAssignModal(true);
  };

  const handleSaveAssignChamado = async () => {
    if (!selectedAssignChamado) return;
    if (!selectedAssignedUserId) {
      alert("Selecione um usuário para assumir o chamado.");
      return;
    }

    try {
      await assignChamadoToUser(selectedAssignChamado.id, Number(selectedAssignedUserId));
      alert("Chamado atribuído com sucesso e movido para em progresso.");
      setShowAssignModal(false);
      setSelectedAssignChamado(null);
      setSelectedAssignedUserId(null);
    } catch (err) {
      alert("Erro ao atribuir chamado: " + err.message);
    }
  };

  const getResponsavelName = (responsavelId) => {
    if (!responsavelId) return "Não atribuído";
    const user = users.find((user) => user.id === Number(responsavelId));
    return user?.name || responsavelId;
  };

  const getSolicitanteName = (id) => {
    if (!id) return "Não atribuído";
    const user = users.find((user) => user.id === Number(id));
    return user?.name || id;
  };

  const getSetorName = (id) => {
    if (!id) return "Não informado";
    const setor = setores.find((setor) => setor.id === Number(id));
    return setor?.name || id;
  };

  const handleFetchReport = async () => {
    setReportLoading(true);
    try {
      const filters = {
        period: reportFilters.period,
        year: reportFilters.year,
      };
      if (reportFilters.setorId) {
        filters.setorId = reportFilters.setorId;
      }
      if (reportFilters.tipo) {
        filters.tipo = reportFilters.tipo;
      }
      const data = await chamadoService.getAverageTimeReport(filters);
      setReportData(data);
    } catch (err) {
      alert("Erro ao gerar relatório: " + err.message);
    } finally {
      setReportLoading(false);
    }
  };

  const assignableUsers = users.filter((user) => user.setor_id === 1);

  const renderActions = (rowData) => (
    <div className="flex flex-wrap gap-2">
      <TableButton
        tooltip={`Visualizar`}
        icon={"pi pi-eye"}
        color="text-primary bg-white border-none"
        onClick={() => openChamadoDetail(rowData)}
      />
      {!isFinalizado(rowData.status) && rowData.status === "aberto" && (
        <TableButton
          tooltip={`Assumir chamado`}
          icon={"pi pi-user-plus"}
          color="text-info bg-white border-none"
          onClick={() => openAssignModal(rowData)}
        />
      )}
    </div>
  );

  const renderStatus = (rowData) => {
    switch (rowData.status) {
      case "aberto":
        return <RenderStatus type={"warning"}> {rowData.status} </RenderStatus>;
      case "em_progresso":
        return <RenderStatus type={"info"}> {rowData.status} </RenderStatus>;
      case "resolvido":
        return <RenderStatus type={"success"}> {rowData.status} </RenderStatus>;
      case "fechado":
        return <RenderStatus type={"success"}> {rowData.status} </RenderStatus>;
      case "cancelado":
        return <RenderStatus type={"danger"}> {rowData.status} </RenderStatus>;
      default:
        return <RenderStatus type={"default"}> {rowData.status} </RenderStatus>;
    }
  };

  const renderPrioridade = (rowData) => {
    const colors = {
      baixa: "status status-sucess",
      media: "status status-info",
      alta: "status status-warning",
      critica: "status status-danger",
    };
    // return colors[priority] || "";
    return <p className={colors[rowData.prioridade]}>{rowData.prioridade}</p>
  };

  if (loading) return <div className="loading">Carregando chamados...</div>;

  return (
    <div className="content">
      <header className="chamados-header">
        <h1>Gerenciamento de Chamados</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancelar" : "+ Novo Chamado"}
          </button>
          <button className="btn-secondary" onClick={() => {
            setShowReportModal(true);
            setReportData(null);
          }}>
            📊 Relatório de Tempo
          </button>
        </div>
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
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
              >
                <option value="manutencao">Manutenção</option>
                <option value="reparo">Reparo</option>
                <option value="instalacao">Instalação</option>
                <option value="suporte">Suporte</option>
                <option value="outros">Outros</option>
              </select>
            </div>
            <div className="form-group">
              <label>Setor *</label>
              <select
                name="setorId"
                value={formData.setorId}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  {setores.length ? "Selecione um setor" : "Carregando setores..."}
                </option>
                {setores.map((setor) => (
                  <option key={setor.id} value={setor.id}>
                    {setor.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Solicitante (opcional)</label>
              <select
                name="solicitanteId"
                value={formData.solicitanteId}
                onChange={handleInputChange}
                disabled={!formData.setorId}
              >
                <option value="">
                  {formData.setorId
                    ? "Selecione um solicitante do setor (opcional)"
                    : "Selecione um setor primeiro"}
                </option>
                {users
                  .filter((user) => user.setor_id === Number(formData.setorId))
                  .map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
              </select>
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

      <div className="chamados-list">
        <TableContainer>
          <DataTable
            id="BolsistaTable"
            value={chamados}
            size="small"
            stripedRows
            rowClassName="hover:bg-gray-100 transition duration-200"
            header={
              <div className="relative flex justify-between items-center px-4">
                <div className="filters">
                  <div className="filter-group">
                    <label>Status:</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
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
                    <select
                      value={filterSetor}
                      onChange={(e) => setFilterSetor(e.target.value)}
                    >
                      <option value="">Todos</option>
                      {setores.map((setor) => (
                        <option key={setor.id} value={setor.id}>
                          {setor.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  {/* <p className="text-xs text-text-muted">total: {total}</p> */}
                </div>
              </div>
            }
          >
            <Column
              field="id"
              header="Id"
              className="text-sm text-text-muted p-4 whitespace-nowrap"
            />
            <Column
              field="patrimonio"
              header="Patrimônio"
              className="text-sm text-text-muted p-4"
            />
            <Column
              field="tipo"
              header="Tipo"
              className="text-sm text-text-muted p-4"
            />
            <Column
              field="descricao"
              header="Descrição"
              className="text-sm text-text-muted p-4"
            />
            <Column
              field="prioridade"
              header="Prioridade"
              body={(rowData) => renderPrioridade(rowData)}
            />
            <Column
              field="status"
              header="Status"
              body={(rowData) => renderStatus(rowData)}
              sortable
              className="text-sm text-text-muted p-4"
            />

            <Column
              field={"responsavelId"}
              header="Responsável"
              body={(rowData) => getResponsavelName(rowData.responsavelId)}
              className="text-sm text-text-muted p-4 whitespace-nowrap"
            />
            {permissions && <Column header="Ações" body={renderActions} />}
          </DataTable>
        </TableContainer>
      </div>

      <Modal
        title={selectedChamado ? `Chamado ${selectedChamado.id}` : "Detalhes do Chamado"}
        isOpen={showDetailModal}
        setIsOpen={setShowDetailModal}
        onHide={() => setShowDetailModal(false)}
        onAcept={handleSaveChamado}
        onRefuse={() => setShowDetailModal(false)}
        aceptLabel={isFinalizado(selectedChamado?.status) ? "Fechar" : "Salvar"}
        refuseLabel="Fechar"
        typeAction="btn-primary"
        typeCancel="btn-secondary"
        isDisabled={false}
      >
        {selectedChamado ? (
          <div className="grid gap-4">
            <div>
              <strong>Patrimônio:</strong> {selectedChamado.patrimonio}
            </div>
            <div>
              <strong>Tipo:</strong> {selectedChamado.tipo}
            </div>
            <div>
              <strong>Setor:</strong> {getSetorName(selectedChamado.setorId)}
            </div>
            <div>
              <strong>Solicitante:</strong> {getSolicitanteName(selectedChamado.solicitanteId)}
            </div>
            <div>
              <strong>Responsável:</strong>{" "}
              {getResponsavelName(selectedChamado.responsavelId)}
            </div>
            <div>
              <strong>Data de Entrada:</strong>{" "}
              {new Date(selectedChamado.dataEntrada).toLocaleString()}
            </div>
            <div>
              <strong>Prioridade:</strong> {selectedChamado.prioridade}
            </div>
            <div>
              <strong>Status atual:</strong> {selectedChamado.status}
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={statusUpdate}
                onChange={(e) => setStatusUpdate(e.target.value)}
                disabled={isFinalizado(selectedChamado.status)}
              >
                <option value="aberto">Aberto</option>
                <option value="em_progresso">Em Progresso</option>
                <option value="resolvido">Resolvido</option>
                <option value="fechado">Fechado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Descrição</label>
              <textarea
                value={selectedChamado.descricao}
                readOnly
                rows="4"
              />
            </div>
            <div className="form-group full-width">
              <label>Observações</label>
              <textarea
                value={observacoesUpdate}
                onChange={(e) => setObservacoesUpdate(e.target.value)}
                rows="4"
                disabled={isFinalizado(selectedChamado.status)}
              />
            </div>
            <div>
              <strong>Data de Resolução:</strong>{" "}
              {selectedChamado.dataResolucao
                ? new Date(selectedChamado.dataResolucao).toLocaleString()
                : "Não resolvido"}
            </div>
          </div>
        ) : (
          <p>Selecione um chamado para ver os detalhes.</p>
        )}
      </Modal>

      <Modal
        title={selectedAssignChamado ? `Assumir Chamado ${selectedAssignChamado.id}` : "Assumir Chamado"}
        isOpen={showAssignModal}
        setIsOpen={setShowAssignModal}
        onHide={() => setShowAssignModal(false)}
        onAcept={handleSaveAssignChamado}
        onRefuse={() => setShowAssignModal(false)}
        aceptLabel="Salvar"
        refuseLabel="Cancelar"
        typeAction="btn-primary"
        typeCancel="btn-secondary"
        isDisabled={false}
      >
        {selectedAssignChamado ? (
          <div className="grid gap-4">
            <div>
              <strong>Chamado:</strong> {selectedAssignChamado.patrimonio}
            </div>
            <div>
              <strong>Setor atual:</strong> {getSetorName(selectedAssignChamado.setorId)}
            </div>
            <div className="form-group">
              <label>Responsável (Setor 1)</label>
              <select
                value={selectedAssignedUserId || ""}
                onChange={(e) => setSelectedAssignedUserId(e.target.value)}
              >
                <option value="" disabled>
                  Selecione um usuário do setor 1
                </option>
                {assignableUsers.length ? (
                  assignableUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Nenhum usuário encontrado no setor 1
                  </option>
                )}
              </select>
            </div>
          </div>
        ) : (
          <p>Selecione um chamado para atribuir.</p>
        )}
      </Modal>

      <Modal
        title="Relatório de Tempo Médio de Resolução"
        isOpen={showReportModal}
        setIsOpen={setShowReportModal}
        onHide={() => setShowReportModal(false)}
        onAcept={handleFetchReport}
        onRefuse={() => setShowReportModal(false)}
        aceptLabel="Gerar Relatório"
        refuseLabel="Fechar"
        typeAction="btn-primary"
        typeCancel="btn-secondary"
        isDisabled={reportLoading}
      >
        <div className="grid gap-4">
          <div className="form-group">
            <label>Período:</label>
            <select
              value={reportFilters.period}
              onChange={(e) => setReportFilters({ ...reportFilters, period: e.target.value })}
            >
              <option value="mensal">Mensal</option>
              <option value="semestral">Semestral</option>
              <option value="anual">Anual</option>
            </select>
          </div>

          <div className="form-group">
            <label>Ano:</label>
            <input
              type="number"
              value={reportFilters.year}
              onChange={(e) => setReportFilters({ ...reportFilters, year: Number(e.target.value) })}
              min={2020}
              max={2099}
            />
          </div>

          <div className="form-group">
            <label>Setor (opcional):</label>
            <select
              value={reportFilters.setorId}
              onChange={(e) => setReportFilters({ ...reportFilters, setorId: e.target.value })}
            >
              <option value="">Todos os setores</option>
              {setores.map((setor) => (
                <option key={setor.id} value={setor.id}>
                  {setor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Tipo (opcional):</label>
            <select
              value={reportFilters.tipo}
              onChange={(e) => setReportFilters({ ...reportFilters, tipo: e.target.value })}
            >
              <option value="">Todos os tipos</option>
              <option value="manutencao">Manutenção</option>
              <option value="reparo">Reparo</option>
              <option value="atualizacao">Atualização</option>
              <option value="consultoria">Consultoria</option>
              <option value="instalacao">Instalação</option>
            </select>
          </div>

          {reportData && (
            <div className="report-results">
              <h3>Resultados:</h3>
              <div className="report-summary">
                <p><strong>Período:</strong> {reportFilters.period} de {reportFilters.year}</p>
                <p><strong>Total de Chamados:</strong> {reportData.totalChamados}</p>
                <p><strong>Tempo Médio:</strong> {reportData.tempoMedioHoras?.toFixed(2) || 0} horas ({reportData.tempoMedioDias?.toFixed(2) || 0} dias)</p>
                <p><strong>Tempo Mínimo:</strong> {reportData.tempoMinimoHoras?.toFixed(2) || 0} horas</p>
                <p><strong>Tempo Máximo:</strong> {reportData.tempoMaximoHoras?.toFixed(2) || 0} horas</p>
              </div>

              {reportData.dados && reportData.dados.length > 0 && (
                <div className="report-table">
                  <h4>Detalhes por Período:</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Período</th>
                        <th>Chamados</th>
                        <th>Tempo Médio (h)</th>
                        <th>Tempo Médio (dias)</th>
                        <th>Mínimo (h)</th>
                        <th>Máximo (h)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.dados.map((row, idx) => (
                        <tr key={idx}>
                          <td>{row.periodo}</td>
                          <td>{row.totalChamados}</td>
                          <td>{row.tempoMedioHoras?.toFixed(2) || 0}</td>
                          <td>{row.tempoMedioDias?.toFixed(2) || 0}</td>
                          <td>{row.tempoMinimoHoras?.toFixed(2) || 0}</td>
                          <td>{row.tempoMaximoHoras?.toFixed(2) || 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {reportData.dados && reportData.dados.length === 0 && (
                <p style={{ color: "#999", marginTop: "10px" }}>Nenhum dado disponível para o período selecionado.</p>
              )}
            </div>
          )}

          {reportLoading && <p>Carregando relatório...</p>}
        </div>
      </Modal>
    </div>
  );
};

export default Chamados;
