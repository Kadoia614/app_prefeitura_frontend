import { useEffect, useState } from "react";
import Table from "../../shared/table/Table";
import RenderStatus from "../../shared/RenderStatus";
import { useAgendamentoContext } from "../../../context/reservas/reservas/AgendamentoContext";
import { useUserContext } from "../../../context/user/UserContext";
import TableButton from "../../shared/table/TableButton";
import ReservaSidePanel from "../sidePainel/ReservasSidePanel";
import ReservasAcceptModal from "../modal/ReservasAcceptModal";
import { Button } from "primereact/button";
import ReservasCreateModal from "../modal/ReservasCreateModal";
import ReservasRejectModal from "../modal/ReservasRejectModal";

const ReservasTable = () => {
  const [isAcceptOpen, setIsAcceptOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isRefuseOpen, setIsRefuseOpen] = useState(false);

  let {
    query,
    setQuery,
    agendamento,
    fetchAgendamento,
    total,
    setTarget,
    panel,
    setPanel,
  } = useAgendamentoContext();

  const { permissions } = useUserContext();

  const status = (rowData) => {
    switch (rowData.status) {
      case "concluido":
        return <RenderStatus type={"info"}> {rowData.status} </RenderStatus>;
      case "solicitado":
        return <RenderStatus type={"warning"}> {rowData.status} </RenderStatus>;
      case "confirmado":
        return <RenderStatus type={"success"}> {rowData.status} </RenderStatus>;
      case "cancelado":
        return <RenderStatus type={"danger"}> {rowData.status} </RenderStatus>;
      default:
        return <RenderStatus type={"default"}> {rowData.status} </RenderStatus>;
    }
  };

  const renderActions = (rowData) => (
    <div className="flex gap-2">
      {(permissions.edit && rowData.status === "solicitado") && (
        <TableButton
          tooltip={`Aceitar`}
          icon={"pi pi-check-square"}
          color="table-button-success"
          onClick={() => {
            setTarget(rowData);
            setIsAcceptOpen(true);
          }}
        />
      )}

      {(permissions.edit && rowData.status === "solicitado") && (
        <TableButton
          tooltip={`Recusar`}
          icon={"pi pi-times-circle"}
          color="table-button-danger"
          onClick={() => {
            setTarget(rowData);
            setIsRefuseOpen(true);
          }}
        />
      )}
    </div>
  );

  //   Não coloca objeto para coluna
  const cols = [
    { key: "data_agendamento", label: "Data agendamento" },
    { key: "hora_inicio", label: "Hora inicio" },
    { key: "hora_fim", label: "Hora fim" },
    { key: "origem", label: "Origem" },
    { key: "destino", label: "Destino" },
    { key: "observacao", label: "Observacao" },
    {
      key: "status",
      label: "Status",
      body: (rowData) => status(rowData),
    },
  ];

  useEffect(() => {
    fetchAgendamento();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
    <ReservasAcceptModal isOpen={isAcceptOpen} setIsOpen={setIsAcceptOpen}></ReservasAcceptModal>
    <ReservasCreateModal isOpen={isCreateOpen} setIsOpen={setIsCreateOpen}></ReservasCreateModal>
    <ReservasRejectModal isOpen={isRefuseOpen} setIsOpen={setIsRefuseOpen}></ReservasRejectModal>
      <div className="flex md:flex-row flex-col w-full">
        <Table
          titulo={"Reserva de veículos"}
          adc={<Button icon={"pi pi-plus"} className="btn-adc" onClick={() => setIsCreateOpen(true)}/>}
          query={query}
          setQuery={setQuery}
          data={agendamento}
          cols={cols}
          inputType={"calendar"}
          total={total}
          onRowClick={(rowData) => {setPanel(rowData.data); console.log(rowData)}}
          id={"ReservasTable"}
          inputPlaceholder={"Buscar..."}
          actions={renderActions}
        ></Table>

        <ReservaSidePanel panelData={panel} header={<h3 className="text-lg text-primary"> Detalhes da reserva</h3>}/>
      </div>
    </>
  );
};

export default ReservasTable;
