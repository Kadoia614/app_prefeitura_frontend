import { useEffect } from "react";
import Table from "../../shared/table/Table";
import RenderStatus from "../../shared/renderStatus";
import { useMotoristaContext } from "../../../context/reservas/motorista/MotoristaContext";

const MotoristasTable = () => {
  let { query, setQuery, motorista, fetchMotorista, total } =
    useMotoristaContext();

  useEffect(() => {
    fetchMotorista();
  }, [query]);

  const status = (rowData) => {
    switch (rowData.status) {
      case "ativo":
        return <RenderStatus type={"success"}> {rowData.status} </RenderStatus>;
      case "inativo":
        return <RenderStatus type={"warning"}> {rowData.status} </RenderStatus>;
      case "suspenso":
        return <RenderStatus type={"danger"}> {rowData.status} </RenderStatus>;
      default:
        return <RenderStatus type={"default"}> {rowData.status} </RenderStatus>;
    }
  };
  //   Não coloca objeto para coluna
  const cols = [
    { key: "uuid", label: "Identificador" },
    { key: "nome", label: "Nome" },
    { key: "cnh", label: "CNH" },
    {
      key: "status",
      label: "Status",
      body: (rowData) => status(rowData),
    },
  ];

  return (
      <Table
        titulo={"Motoristas cadastrados"}
        query={query}
        setQuery={setQuery}
        data={motorista}
        cols={cols}
        total={total}
        id={"MotoristasTable"}
        inputPlaceholder={"Buscar..."}
      ></Table>
  );
};

export default MotoristasTable;
