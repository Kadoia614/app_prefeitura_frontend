import { useEffect, useState } from "react";
import Table from "../../shared/table/Table";
import RenderStatus from "../../shared/renderStatus";

const MotoristasTable = () => {
  const [query, setQuery] = useState({
    search: "",
    page: 0,
    limit: 10,
  });

  const [data, setData] = useState([]);

  const [total, setTotal] = useState(10);

  const fetchData = async () => {
    try {
      const response = [
        {
          uuid: "74384597-7a37-48f3-8108-135d6a4d745a",
          nome: "Motorista 1",
          cnh: "123456789",
          telefone: "(11) 99999-9999",
          email: "miguel.moraes@itapecerica.sp.gov.br",
          status: "ativo",
        },
        {
          uuid: "74384597-7a37-48f3-8108-135d6a4d745a",
          nome: "Motorista 1",
          cnh: "123456789",
          telefone: "(11) 99999-9999",
          email: "miguel.moraes@itapecerica.sp.gov.br",
          status: "inativo",
        },
        {
          uuid: "74384597-7a37-48f3-8108-135d6a4d745a",
          nome: "Motorista 1",
          cnh: "123456789",
          telefone: "(11) 99999-9999",
          email: "miguel.moraes@itapecerica.sp.gov.br",
          status: "suspenso",
        },
      ];
      setData(response);
      setTotal(response.length);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <Table
        titulo={"Motoristas cadastrados"}
        query={query}
        setQuery={setQuery}
        data={data}
        cols={cols}
        total={total}
        id={"MotoristasTable"}
        inputPlaceholder={"Buscar..."}
      ></Table>
  );
};

export default MotoristasTable;
