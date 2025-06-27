import { useEffect, useState } from "react";
import API from "@/service/API";

import { useToast } from "@/components/shared/toast/ToastProvider";

import GeralExcludeModal from "@/components/shared/modal/GeralExcludeModal";
import SaveSetorModal from "./modal/SaveSetorModal";
import SetorTable from "./table/SetorTable";

const Setor = () => {
  const [tableData, setTableData] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [modalData, setModalData] = useState({});
  const [excludeModalOpen, setExcludeModalOpen] = useState(false);
  const [excludeModal, setExcludeModal] = useState(null);
  const { showToast } = useToast();

  const fetchData = async () => {
    try {
      const { data } = await API.get("/setor");
      setTableData(data.setores);
    } catch (error) {
      showToast(
        "error",
        "Failed to load sectors: " + error.response.data.message
      );
    }
  };

  const loadTable = () => {
    fetchData();
  };

  useEffect(() => {
    loadTable();
  }, []);

  return (
    <>
      <div id="PainelSetor">
        <SetorTable
          tableData={tableData}
          setOpenModalEdit={setOpenModalEdit}
          setModalData={setModalData}
          setExcludeModalOpen={setExcludeModalOpen}
          setExcludeModal={setExcludeModal}
        ></SetorTable>

        {/* Edit/Create Sector Modal */}
        <SaveSetorModal
          isOpen={openModalEdit}
          setIsOpen={setOpenModalEdit}
          loadTable={loadTable}
          modalData={modalData}
          setModalData={setModalData}
        />

        {/* Exclude Confirmation Dialog */}
        <GeralExcludeModal
          id="ExcludeModalService"
          url="/setor"
          isOpen={excludeModalOpen}
          setIsOpen={setExcludeModalOpen}
          targetId={excludeModal}
          setTargetID={setExcludeModal}
          loadTable={() => loadTable()}
        />
      </div>
    </>
  );
};

export default Setor;
