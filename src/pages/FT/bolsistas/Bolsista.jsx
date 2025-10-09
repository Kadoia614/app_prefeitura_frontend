import { useState } from "react";

import { useUserContext } from "@/context/user/UserContext";

import BolsistasTable from "./components/Table/BolsistasTable";
import FT_Bolsista_Modal from "./components/modal/FT_Bolsista_Modal";
import FT_Bolsista_ExcludeModal from "./components/modal/FT_Bolsista_excludeModal";

import { BolsistaProvider } from "../../../context/ft/bolsista/BolsistaProvider";

const Bolsista = () => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [excludeModalOpen, setExcludeModalOpen] = useState(false);

  const { user } = useUserContext();
  const scopo = user.scopo;

  return (
    <div id="Bolsistas" className="content">
      <BolsistaProvider>
        <BolsistasTable
          setOpenModalEdit={setOpenModalEdit}
          setExcludeModalOpen={setExcludeModalOpen}
        />

        {/* Modal para edição e cadastro de bolsistas */}
        <FT_Bolsista_Modal
          openModalEdit={openModalEdit}
          setOpenModalEdit={setOpenModalEdit}
          scopo={scopo}
        />
        <FT_Bolsista_ExcludeModal isOpen={excludeModalOpen} setIsOpen={setExcludeModalOpen}></FT_Bolsista_ExcludeModal>
      </BolsistaProvider>
    </div>
  );
};

export default Bolsista;
