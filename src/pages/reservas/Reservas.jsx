import ReservationTable from "../../components/components-reservas/table/ReservasTable";
import Title from "../../components/shared/title/Title";
import ReservasNav from "../../components/components-reservas/nav/ReservasNav";
import { useState } from "react";
import MotoristasTable from "../../components/components-reservas/table/MotoristasTable";
import Dashboard from "../../components/components-reservas/Dashboard";
import VeiculosTable from "../../components/components-reservas/table/VeiculosTable";
import { MotoristaProvider } from "../../context/reservas/motorista/MotoristaProvider";
import { VeiculoProvider } from "../../context/reservas/veiculo/VeiculoProvider";
import { AgendamentoProvider } from "../../context/reservas/reservas/AgendamentoProvider";

const Reservas = () => {
  const [tabOpen, setTabOpen] = useState(false);
  const [tab, setTab] = useState(0);

  const options = [
    {
      label: "Dashboard",
      icon: "pi pi-microchip",
      content: <Dashboard />,
    },
    {
      label: "Motoristas",
      icon: "pi pi-user",
      content: (
        <MotoristaProvider>
          <MotoristasTable />
        </MotoristaProvider>
      ),
    },
    {
      label: "Veiculos",
      icon: "pi pi-car",
      content: (
        <VeiculoProvider>
          <VeiculosTable />
        </VeiculoProvider>
      ),
    },
    {
      label: "Agendamentos",
      icon: "pi pi-calendar",
      content: (
        <AgendamentoProvider>
          <ReservationTable />
        </AgendamentoProvider>
      ),
    },
  ];

  return (
    <div className="content" id="Reservas">
      <Title subtitle={"Prefeitura de Itapecerica da Serra"}>
        Reservas - Frotas <br />
      </Title>
      <div className="flex md:flex-row flex-col">
        <ReservasNav
          sideOpen={tabOpen}
          setSideOpen={setTabOpen}
          tab={tab}
          setTab={setTab}
          options={options}
        >
          {" "}
        </ReservasNav>
        {options[tab].content}
      </div>
    </div>
  );
};

export default Reservas;
