import { useEffect, useState } from "react";
import { useChamados } from "../../hooks/UseChamados";
import TableContainer from "@/components/shared/table/TableContainer";
import TableButton from "@/components/shared/table/TableButton";
import "../../assets/css/chamados.css";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import RenderStatus from "@/components/shared/RenderStatus";
import { useUserContext } from "../../context/user/UserContext";

const Chamados = () => {
  const { chamados, loading, error, loadChamados, createChamado } =
    useChamados();
  const { permissions } = useUserContext();

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
      [name]:
        name === "setorId" || name === "solicitanteId" ? Number(value) : value,
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

  const renderActions = (rowData) => (
    <div className="flex gap-2">
      {permissions.edit && (
        <>
          <TableButton
            tooltip={`Editar`}
            icon={"pi pi-pen-to-square"}
            iconPos="left"
            color="text-text-secondary bg-white border-none"
            onClick={() => {
              // setAtletaTarget(rowData);
              // setEditOpen(true);
            }}
          />
        </>
      )}

      {permissions.del && (
        <TableButton
          tooltip={`Excluir`}
          icon={"pi pi-trash"}
          color="text-danger bg-white border-none"
          onClick={() => {
            // setAtletaTarget(rowData);
            // setExcludeOpen(true);
          }}
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
                    <input
                      type="number"
                      value={filterSetor}
                      onChange={(e) => setFilterSetor(e.target.value)}
                      placeholder="ID do setor"
                    />
                  </div>
                </div>
                <div>
                  {/* <p className="text-xs text-text-muted">total: {total}</p> */}
                </div>
                {/* {permissions?.write && (
                  <div>
                    <Tooltip target=".add-bolsista-btn" position="bottom" />
                    <SpeedDial
                      className="relative"
                      model={renderItems}
                      direction="down"
                      type="linear"
                      style={{ right: 0 }}
                    ></SpeedDial>
                  </div>
                )} */}
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
              className="text-sm text-text-muted p-4 whitespace-nowrap"
            />
            {permissions && <Column header="Ações" body={renderActions} />}
          </DataTable>
        </TableContainer>
      </div>
    </div>
  );
};

export default Chamados;
