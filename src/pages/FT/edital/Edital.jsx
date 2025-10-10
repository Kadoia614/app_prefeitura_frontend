import { useState, useCallback } from "react";

import EditalTable from "./components/Table/EditalTable";

import Edital_Modal from "./components/modal/Edital_Modal";

import Vincular_Bolsista from "./components/modal/Vincular_Bolsista";

import { getEdital, getEditalWithBolsista } from "@/service/ft_appServices";

import { useToast } from "@/components/shared/toast/ToastProvider";
import { EditalProvider } from "../../../context/ft/edital/EditalProvider";

const Edital = () => {

  const [isEditalModalOpen, setIsEditalModalOpen] = useState(false);
  const [isVincularModalOpen, setIsVincularModalOpen] = useState(false);
  const [isEncerrarOpen, setIsEncerrarOpen] = useState(false);

  return (
    <div id="Edital" className="content">
      <EditalProvider>
        <EditalTable
          setIsEditalModalOpen={setIsEditalModalOpen}
          setIsVincularModalOpen={setIsVincularModalOpen}
        />

        {/* <Edital_Modal
          isEditalModalOpen={isEditalModalOpen}
          setIsEditalModalOpen={setIsEditalModalOpen}
        ></Edital_Modal> */}

        <Vincular_Bolsista
          isVincularModalOpen={isVincularModalOpen}
          setIsVincularModalOpen={setIsVincularModalOpen}
        ></Vincular_Bolsista>
      </EditalProvider>
    </div>
  );
};

export default Edital;
