import { useEffect, useState } from "react";
import Table from "../../shared/table/Table";

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
          uuid: "969afc64-6f7a-42cc-bbd9-57d8d063da5e",
          data_agendamento: "2026-02-02",
          hora_inicio: "08:34:30",
          hora_fim: "08:37:39",
          origem: "teste",
          destino: "teste",
          observacao: "teste",
          status: "solicitado",
          ownner_uuid: "cc01d93e-2c84-40c4-9c30-a04edfc0ce57",
          responsible_uuid: "",
          motorista: {},
          veiculo: {},
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
      ];
      setData(response);
      setTotal(response.length);
    } catch (error) {
      console.log(error);
    }
  };

  const renderStatus = (rowData) => {
    const status = rowData.status; // Pega a string do status

    // Mapeamento de cores (Tailwind precisa das classes completas)
    const statusConfig = {
      solicitado: "bg-blue-100 text-blue-800 border-blue-200",
      confirmado: "bg-green-100 text-green-800 border-green-200",
      cancelado: "bg-red-100 text-red-800 border-red-200",
      default: "bg-gray-100 text-gray-800 border-gray-200",
    };

    const style = statusConfig[status] || statusConfig.default;

    return (
      <div
        className={`flex gap-2 items-center px-2 py-1 rounded-full border text-xs font-semibold w-fit uppercase ${style}`}
      >
        <span className="w-2 h-2 rounded-full bg-current"></span>
        {status}
      </div>
    );
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
      body: (rowData) => renderStatus(rowData),
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
