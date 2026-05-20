import { useState } from "react";

import BolsistasTable from "./Table/BolsistasTable";
import FT_Bolsista_Modal from "./modal/FT_Bolsista_Modal";
import FT_Bolsista_ExcludeModal from "./modal/FT_Bolsista_excludeModal";
import FT_Bolsista_Prorrogate_Bolsista from "./modal/FT_Bolsista_Prorrogate_Bolsista";
import { useBolsistaContext } from "../../../context/ft/bolsista/BolsistaContext";

const Bolsista = () => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [excludeModalOpen, setExcludeModalOpen] = useState(false);
  let { setProrrogateModalOpen, prorrogateModalOpen } = useBolsistaContext();

  return (
    <div id="Bolsistas" className="content">
      <BolsistasTable
        setOpenModalEdit={setOpenModalEdit}
        setExcludeModalOpen={setExcludeModalOpen}
      />

      {/* Modal para edição e cadastro de bolsistas */}
      <FT_Bolsista_Modal
        openModalEdit={openModalEdit}
        setOpenModalEdit={setOpenModalEdit}
      />
      <FT_Bolsista_ExcludeModal
        isOpen={excludeModalOpen}
        setIsOpen={setExcludeModalOpen}
      ></FT_Bolsista_ExcludeModal>

      <FT_Bolsista_Prorrogate_Bolsista
        isOpen={prorrogateModalOpen}
        setIsOpen={setProrrogateModalOpen}
      ></FT_Bolsista_Prorrogate_Bolsista>
    </div>
  );
};

export default Bolsista;
