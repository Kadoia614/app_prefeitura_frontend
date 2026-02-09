import { useEffect, useState } from "react";
import Table from "../../shared/table/Table";
import RenderStatus from "../../shared/renderStatus";

const ReservasTable = () => {
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
          data_agendamento: "2026-02-02",
          hora_inicio: "08:34:30",
          hora_fim: "08:34:39",
          origem: "teste",
          destino: "teste",
          observacao: "teste",
          status: "cancelado",
          ownner_uuid: "cc01d93e-2c84-40c4-9c30-a04edfc0ce57",
          responsible_uuid: "cc01d93e-2c84-40c4-9c30-a04edfc0ce57",
          motorista: {
            uuid: "9879ae4c-e21e-4ce2-af4c-a883f4d9f0ce",
            nome: "miguel dsa",
            email: "m.morciellwa@gmail.com",
            telefone: "",
          },
          veiculo: {
            uuid: "adf84186-0f3a-4834-8f21-9e285aade30c",
            placa: "hbd-7097",
            marca: "fiat",
            modelo: "palio fire",
            cor: "cinza",
            ano: 2003,
            capacidade: "5",
          },
        },
        {
          uuid: "74384597-7a37-48f3-8108-135d6a4d745a",
          data_agendamento: "2026-02-02",
          hora_inicio: "08:34:30",
          hora_fim: "08:34:39",
          origem: "teste",
          destino: "teste",
          observacao: "teste",
          status: "confirmado",
          ownner_uuid: "cc01d93e-2c84-40c4-9c30-a04edfc0ce57",
          responsible_uuid: "cc01d93e-2c84-40c4-9c30-a04edfc0ce57",
          motorista: {
            uuid: "9879ae4c-e21e-4ce2-af4c-a883f4d9f0ce",
            nome: "miguel dsa",
            email: "m.morciellwa@gmail.com",
            telefone: "",
          },
          veiculo: {
            uuid: "adf84186-0f3a-4834-8f21-9e285aade30c",
            placa: "hbd-7097",
            marca: "fiat",
            modelo: "palio fire",
            cor: "cinza",
            ano: 2003,
            capacidade: "5",
          },
        },
        {
          uuid: "74384597-7a37-48f3-8108-135d6a4d745a",
          data_agendamento: "2026-02-02",
          hora_inicio: "08:34:30",
          hora_fim: "08:34:39",
          origem: "teste",
          destino: "teste",
          observacao: "teste",
          status: "solicitado",
          ownner_uuid: "cc01d93e-2c84-40c4-9c30-a04edfc0ce57",
          responsible_uuid: "cc01d93e-2c84-40c4-9c30-a04edfc0ce57",
          motorista: {
            uuid: "9879ae4c-e21e-4ce2-af4c-a883f4d9f0ce",
            nome: "miguel dsa",
            email: "m.morciellwa@gmail.com",
            telefone: "",
          },
          veiculo: {
            uuid: "adf84186-0f3a-4834-8f21-9e285aade30c",
            placa: "hbd-7097",
            marca: "fiat",
            modelo: "palio fire",
            cor: "cinza",
            ano: 2003,
            capacidade: "5",
          },
        },
        {
          uuid: "74384597-7a37-48f3-8108-135d6a4d745a",
          data_agendamento: "2026-02-02",
          hora_inicio: "08:34:30",
          hora_fim: "08:34:39",
          origem: "teste",
          destino: "teste",
          observacao: "teste",
          status: "teste",
          ownner_uuid: "cc01d93e-2c84-40c4-9c30-a04edfc0ce57",
          responsible_uuid: "cc01d93e-2c84-40c4-9c30-a04edfc0ce57",
          motorista: {
            uuid: "9879ae4c-e21e-4ce2-af4c-a883f4d9f0ce",
            nome: "miguel dsa",
            email: "m.morciellwa@gmail.com",
            telefone: "",
          },
          veiculo: {
            uuid: "adf84186-0f3a-4834-8f21-9e285aade30c",
            placa: "hbd-7097",
            marca: "fiat",
            modelo: "palio fire",
            cor: "cinza",
            ano: 2003,
            capacidade: "5",
          },
        },
        {
          uuid: "74384597-7a37-48f3-8108-135d6a4d745a",
          data_agendamento: "2026-02-02",
          hora_inicio: "08:34:30",
          hora_fim: "08:34:39",
          origem: "teste",
          destino: "teste",
          observacao: "teste",
          status: "concluido",
          ownner_uuid: "cc01d93e-2c84-40c4-9c30-a04edfc0ce57",
          responsible_uuid: "cc01d93e-2c84-40c4-9c30-a04edfc0ce57",
          motorista: {
            uuid: "9879ae4c-e21e-4ce2-af4c-a883f4d9f0ce",
            nome: "miguel dsa",
            email: "m.morciellwa@gmail.com",
            telefone: "",
          },
          veiculo: {
            uuid: "adf84186-0f3a-4834-8f21-9e285aade30c",
            placa: "hbd-7097",
            marca: "fiat",
            modelo: "palio fire",
            cor: "cinza",
            ano: 2003,
            capacidade: "5",
          },
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
    fetchData();
  }, []);

  return (
    <Table
      titulo={"Reserva de veículos"}
      query={query}
      setQuery={setQuery}
      data={data}
      cols={cols}
      total={total}
      id={"ReservasTable"}
      inputPlaceholder={"Buscar..."}
    ></Table>
  );
};

export default ReservasTable;
