import { useState } from "react";

import { useUserContext } from "@/context/user/UserContext";

import BolsistasTable from "./components/Table/BolsistasTable";
import FT_Bolsista_Modal from "./components/modal/FT_Bolsista_Modal";
import GeralExcludeModal from "@/components/shared/modal/GeralExcludeModal";

import { BolsistaProvider } from "../../../context/bolsista/BolsistaProvider";

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

        {/* Exclude Confirmation Dialog */}
        {/* <GeralExcludeModal
          id="ExcludeModalUser"
          url="/ft/bolsista/"
          isOpen={excludeModalOpen}
          setIsOpen={setExcludeModalOpen}
        /> */}
      </BolsistaProvider>
    </div>
  );
};

export default Bolsista;
