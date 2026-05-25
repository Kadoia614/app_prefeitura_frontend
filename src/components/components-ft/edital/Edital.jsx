import { useState } from "react";

import EditalTable from "./Table/EditalTable";

import Edital_Modal from "./modal/Edital_Modal";

import Vincular_Bolsista from "./modal/Vincular_Bolsista";

import { EditalProvider } from "../../../context/ft/edital/EditalProvider";

const Edital = () => {
  const [isEditalModalOpen, setIsEditalModalOpen] = useState(false);
  const [isVincularModalOpen, setIsVincularModalOpen] = useState(false);

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
      </EditalProvider>
    </div>
  );
};

export default Edital;
