import { useEffect, useState } from "react";
import { Divider } from "primereact/divider";
import { Link, useParams } from "react-router";
import { Button } from "primereact/button";

import Atleta from "./components/atleta/Atleta";
import SportProvider from "../../context/sport/SportProvider";

const Esporte = () => {

  const [sideOpen, setSideOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const param = useParams().modalidade

  useEffect(
    () => {
      if (!param){
        setTab(0)
      }
      else{
        setTab(param)
      }
    },
    [param]
  );

  const options = [
    {
      label: "Atletas",
      icon: "pi pi-user",
      content: <Atleta />,
    },
    {
      label: "Modalidades",
      icon: "pi pi-arrow-right-arrow-left",
      content: "<Atleta />",
    },
    {
      label: "Núcleos",
      icon: "pi pi-map-marker",
      content: "<Locations />",
    },
    {
      label: "Responsáveis",
      icon: "pi pi-verified",
      content: "<Responsable />",
    },
    {
      label: "Relatórios",
      icon: "pi pi-file",
      content: "<Relatory />",
    },
  ];



  return (  
    <div id="Esporte" className="content">
      <div className="flex flex-row gap-2">
        <nav
          className={`${
            sideOpen ? "w-1/5" : "w-1/20"
          } bg-background rounded-md shadow-sm transition-all duration-300 ease-in-out`}
        >
          <div
            className="flex justify-center items-center p-3"
            onClick={() => setSideOpen(!sideOpen)}
          >
            <i
              className={`pi pi-angle-double-right ${
                sideOpen ? "" : "rotate-180"
              } transition`}
            ></i>
          </div>
          <Divider className="my-0"></Divider>
          <div
            className={`p-3 bg-background-muted
          flex md:flex-col gap-2 md:justify-center ${
            !sideOpen && "items-center"
          }`}
          >
            {
              options.map((option, index) => (
                <Link to={`/services/8/esporte/${index}`} key={index}>
                  <Button
                    link
                    tooltip={!sideOpen ? option.label : ""}
                    label={sideOpen ? option.label : ""}
                    className={`text-sm gap-2 flex items-center  hover:text-primary ${
                      index == tab ? "text-primary" : "text-text-muted"
                    }`}
                    icon={option.icon}
                    onClick={() => setTab(index)}
                  />
                </Link>
              ))
            }
          </div>
        </nav>

        <div className="w-full">
          <SportProvider>
            {options[tab].content}
          </SportProvider>
        </div>
      </div>
    </div>
  );
};

export default Esporte;
