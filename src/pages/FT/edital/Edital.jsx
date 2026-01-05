import { useState } from "react";

import EditalTable from "./components/Table/EditalTable";

import Edital_Modal from "./components/modal/Edital_Modal";

import Vincular_Bolsista from "./components/modal/Vincular_Bolsista";

import { EditalProvider } from "../../../context/ft/edital/EditalProvider";

import FT_Bolsista_Prorrogate_Bolsista from "./components/modal/FT_Bolsista_Prorrogate_Bolsista";
const Edital = () => {
  const [isEditalModalOpen, setIsEditalModalOpen] = useState(false);
  const [isVincularModalOpen, setIsVincularModalOpen] = useState(false);
  const [prorrogateModalOpen, setProrrogateModalOpen] = useState(true);

  return (
    <div id="Edital" className="content">
      <EditalProvider>
        <EditalTable
          setIsEditalModalOpen={setIsEditalModalOpen}
          setIsVincularModalOpen={setIsVincularModalOpen}
        />

        <Edital_Modal
          isEditalModalOpen={isEditalModalOpen}
          setIsEditalModalOpen={setIsEditalModalOpen}
        ></Edital_Modal>

        <Vincular_Bolsista
          isVincularModalOpen={isVincularModalOpen}
          setIsVincularModalOpen={setIsVincularModalOpen}
        ></Vincular_Bolsista>

        <FT_Bolsista_Prorrogate_Bolsista
          isOpen={prorrogateModalOpen}
          setIsOpen={setProrrogateModalOpen}
        ></FT_Bolsista_Prorrogate_Bolsista>
      </EditalProvider>
    </div>
  );
};

export default Edital;
