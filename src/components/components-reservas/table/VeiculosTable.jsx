import { useEffect, useState } from "react";
import Table from "../../shared/table/Table";
import RenderStatus from "../../shared/renderStatus";

const VeiculosTable = () => {
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
          placa: "ABC-1234",
          modelo: "Civic",
          marca: "Honda",
          ano: "2020",
          cor: "Preto",
          status: "ativo",
        },
                {
          uuid: "74384597-7a37-48f3-8108-135d6a4d745a",
          placa: "ABC-1234",
          modelo: "Civic",
          marca: "Honda",
          ano: "2020",
          cor: "Preto",
          status: "inativo",
        },
                {
          uuid: "74384597-7a37-48f3-8108-135d6a4d745a",
          placa: "ABC-1234",
          modelo: "Civic",
          marca: "Honda",
          ano: "2020",
          cor: "Preto",
          status: "manutencao",
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
      case "manutencao":
        return <RenderStatus type={"warning"}> {rowData.status} </RenderStatus>;
      case "inativo":
        return <RenderStatus type={"danger"}> {rowData.status} </RenderStatus>;
      default:
        return <RenderStatus type={"default"}> {rowData.status} </RenderStatus>;
    }
  };
  //   Não coloca objeto para coluna
  const cols = [
    { key: "uuid", label: "Identificador" },
    { key: "placa", label: "Placa" },
    { key: "modelo", label: "Modelo" },
    { key: "marca", label: "Marca" },
    { key: "ano", label: "Ano" },
    { key: "cor", label: "Cor" },
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
        titulo={"Veiculos cadastrados"}
        query={query}
        setQuery={setQuery}
        data={data}
        cols={cols}
        total={total}
        id={"VeiculosTable"}
        inputPlaceholder={"Buscar..."}
      ></Table>
  );
};

export default VeiculosTable;
