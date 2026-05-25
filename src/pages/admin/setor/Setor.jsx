import { useEffect, useState } from "react";
import API from "@api/API";

import { useLoadingContext } from "@/context/loading/LoadingContext";
import { useToast } from "@/components/shared/toast/ToastProvider";

import SetorTable from "./table/SetorTable";
import GeralExcludeModal from "@/components/shared/modal/GeralExcludeModal";
import SaveSetorModal from "./modal/SaveSetorModal";

const Setor = () => {
  const [tableData, setTableData] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [modalData, setModalData] = useState({});
  const [excludeModalOpen, setExcludeModalOpen] = useState(false);
  const [excludeModal, setExcludeModal] = useState(null);

  const { showToast } = useToast();
  const { attIsLoading } = useLoadingContext();

  const fetchData = async () => {
    attIsLoading(true);
    try {
      const { data } = await API.get("/setores");
      setTableData(data.setores);
    } catch (error) {
      showToast(
        "error",
        "Failed to load sectors: " + error.response.data.message
      );
    } finally {
      attIsLoading(false);
    }
  };

  const loadTable = () => {
    fetchData();
  };

  useEffect(() => {
    loadTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
