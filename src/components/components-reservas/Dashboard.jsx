import { Chart } from 'primereact/chart';

import { useEffect, useState } from "react";

const Dashboard = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const Mocked = {
    motoristas: [
      {
        uuid: "74384597-7a37-48f3-8108-135d6a4d745a",
        nome: "motorista 1",
        quantidade_agendamentos: 5,
        pendentes: 1,
        concluidas: 2,
        solicitadas: 2,
        canceladas: 0,
      },
      {
        uuid: "74384597-7a37-48f3-8108-135d6a4d745a",
        nome: "motorista 2",
        quantidade_agendamentos: 3,
        pendentes: 1,
        concluidas: 1,
        solicitadas: 0,
        canceladas: 1,
      },
    ],
    agendamentos: {
      quantidade_agendamentos: 8,
      pendentes: 2,
      concluidas: 3,
      solicitadas: 2,
      canceladas: 1,
    },
    veiculos: [
      {
        uuid: "74384597-7a37-48f3-8108-135d6a4d745a",
        placa: "ABC-1234",
        quantidade_agendamentos: 5,
        pendentes: 1,
        concluidas: 2,
        solicitadas: 2,
        canceladas: 0,
      },
      {
        uuid: "74384597-7a37-48f3-8108-135d6a4d745a",
        placa: "ABC-4321",
        quantidade_agendamentos: 3,
        pendentes: 1,
        concluidas: 1,
        solicitadas: 0,
        canceladas: 1,
      },
    ],
  };

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);

    const data = {
      labels: ["Pendentes", "Solicitadas", "Concluídas", "Canceladas"],
      datasets: [
        {
          data: [
            Mocked.agendamentos.pendentes,
            Mocked.agendamentos.solicitadas,
            Mocked.agendamentos.concluidas,
            Mocked.agendamentos.canceladas,
          ],
          backgroundColor: [
            documentStyle.getPropertyValue("--yellow-100") || "#FEF3C7",
            documentStyle.getPropertyValue("--blue-100") || "#DBEAFE",
            documentStyle.getPropertyValue("--green-100") || "#DCFCE7",
            documentStyle.getPropertyValue("--red-100") || "#FEE2E2",
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--yellow-400") || "#FACC15",
            documentStyle.getPropertyValue("--blue-400") || "#60A5FA",
            documentStyle.getPropertyValue("--green-400") || "#4ADE80",
            documentStyle.getPropertyValue("--red-400") || "#F87171",
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      cutout: "60%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="Dashboard"
      className="p-4 bg-background w-full flex flex-row gap-2"
    >
      <div className="w-3/5 bg-success-soft"></div>
      <div className="w-2/5 flex flex-col gap-2 p-4" id="agendamentosGrafico">
        <div className='text-center'>
          <h1 className="text-2xl font-bold">Agendamentos Totais: {Mocked.agendamentos.quantidade_agendamentos}</h1>
        </div>
        <Chart
          type="doughnut"
          data={chartData}
          options={chartOptions}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Dashboard;
