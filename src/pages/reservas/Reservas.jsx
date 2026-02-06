import ReservationTable from "../../components/components-reservas/table/ReservasTable";
import Title from "../../components/shared/title/Title";
import ReservasNav from "../../components/components-reservas/nav/ReservasNav";
import { useState } from "react";

const Reservas = () => {
  const [tabOpen, setTabOpen] = useState(false);
  const [tab, setTab] = useState(0);

  const options = [
    {
      label: "Dashboard",
      icon: "pi pi-microchip",
      content: <ReservationTable />,
    },
    {
      label: "Motoristas",
      icon: "pi pi-user",
      content: "<Atleta />",
    },
    {
      label: "Viculos",
      icon: "pi pi-arrow-right-arrow-left",
      content: "<Atleta />",
    },
    {
      label: "Agendamentos",
      icon: "pi pi-map-marker",
      content: <ReservationTable />,
    },
  ];

  return (
    <div className="content" id="Reservas">
      {console.log(window.user)}
      <Title subtitle={"Prefeitura de Itapecerica da Serra"}>
        Reservas - Frotas <br />
      </Title>
      <div className="flex md:flex-row flex-col">
        <ReservasNav
          sideOpen={tabOpen}
          setSideOpen={setTabOpen}
          setTab = {setTab}
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
