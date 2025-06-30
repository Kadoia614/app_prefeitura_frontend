import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import HanlerError from "@/middleware/HandleError";
import { useUserContext } from "@/context/UserContext";

import BolsistasTable from "./components/Table/BolsistasTable";
import FT_Bolsista_Modal from "./components/modal/FT_Bolsista_Modal";
import GeralExcludeModal from "@/components/shared/modal/GeralExcludeModal";

import {
  getBolsista,
} from "@/service/ft_appServices";

const Bolsista = () => {
  const { setIsLoading } = useOutletContext();
  const [error, setError] = useState(false);

  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [pagadorOptions, setPagadorOptions] = useState([]);
  const [modalData, setModalData] = useState({});

  const [excludeModalOpen, setExcludeModalOpen] = useState(false);
  const [excludeModal, setExcludeModal] = useState(false);

  const { scopo } = useUserContext();

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const { bolsista, pagador, uploadToken } = await getBolsista();
      console.log(pagador);

      setTableData(bolsista);
      setPagadorOptions(pagador);
      localStorage.setItem("upload_token", uploadToken);
      return;
    } catch (error) {
      setError(error.status);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // gerenciamento de erros para caso algo de errado ocorra durante as requisições
  if (error) {
    return <HanlerError error={error} />;
  }

  return (
    <div id="Bolsistas" className="content">
      <div>
        <BolsistasTable
          tableData={tableData}
          fetchData={fetchData}
          setOpenModalEdit={setOpenModalEdit}
          setModalData={setModalData}
          setIsLoading={setIsLoading}
          setExcludeModal={setExcludeModal}
          setExcludeModalOpen={setExcludeModalOpen}
        />
      </div>

      {/* Modal para edição e cadastro de bolsistas */}
      <FT_Bolsista_Modal
        modalData={modalData}
        setModalData={setModalData}
        openModalEdit={openModalEdit}
        setOpenModalEdit={setOpenModalEdit}
        fetchData={fetchData}
        scopo={scopo}
        pagadorOptions={pagadorOptions}
        setIsLoading={setIsLoading}
      />
            {/* Exclude Confirmation Dialog */}
      <GeralExcludeModal
        id="ExcludeModalUser"
        url="/ft/bolsista/"
        isOpen={excludeModalOpen}
        setIsOpen={setExcludeModalOpen}
        targetId={excludeModal}
        setTargetID={setExcludeModal}
        loadTable={fetchData}
      />
    </div>
  );
};

export default Bolsista;
