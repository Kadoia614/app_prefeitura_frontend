import { useState } from "react";

import BolsistasTable from "./components/Table/BolsistasTable";
import FT_Bolsista_Modal from "./components/modal/FT_Bolsista_Modal";
import FT_Bolsista_ExcludeModal from "./components/modal/FT_Bolsista_excludeModal";

const Bolsista = () => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [excludeModalOpen, setExcludeModalOpen] = useState(false);

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
        <FT_Bolsista_ExcludeModal isOpen={excludeModalOpen} setIsOpen={setExcludeModalOpen}></FT_Bolsista_ExcludeModal>
    </div>
  );
};

export default Bolsista;
