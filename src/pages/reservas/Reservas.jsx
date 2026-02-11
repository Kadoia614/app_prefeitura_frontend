import ReservationTable from "../../components/components-reservas/table/ReservasTable";
import Title from "../../components/shared/title/Title";
import ReservasNav from "../../components/components-reservas/nav/ReservasNav";
import { useState } from "react";
import MotoristasTable from "../../components/components-reservas/table/MotoristasTable";
import Dashboard from "../../components/components-reservas/Dashboard";
import VeiculosTable from "../../components/components-reservas/table/VeiculosTable";
import { MotoristaProvider } from "../../context/reservas/motorista/MotoristaProvider";

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
      content: <MotoristasTable />,
    },
    {
      label: "Veiculos",
      icon: "pi pi-car",
      content: <VeiculosTable />,
    },
    {
      label: "Agendamentos",
      icon: "pi pi-book",
      content: <ReservationTable />,
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
        <MotoristaProvider>{options[tab].content}</MotoristaProvider>
      </div>
    </div>
  );
};

export default Reservas;
