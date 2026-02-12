import { useEffect, useState } from "react";
import Table from "../../shared/table/Table";
import RenderStatus from "../../shared/renderStatus";
import { useAgendamentoContext } from "../../../context/reservas/reservas/AgendamentoContext";
import { useUserContext } from "../../../context/user/UserContext";

const ReservasTable = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

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
  //   Não coloca objeto para coluna
  const cols = [
    { key: "uuid", label: "Identificador" },
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
  }, [query]);

  return (
    <Table
      titulo={"Reserva de veículos"}
      query={query}
      setQuery={setQuery}
      data={agendamento}
      cols={cols}
      total={total}
      id={"ReservasTable"}
      inputPlaceholder={"Buscar..."}
    ></Table>
  );
};

export default ReservasTable;
