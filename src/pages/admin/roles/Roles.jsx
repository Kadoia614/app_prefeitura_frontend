import { useEffect, useState } from "react";

import { useToast } from "@/components/shared/toast/ToastProvider";
import RolesTable from "./table/RolesTable";
import GeralExcludeModal from "@/components/shared/modal/GeralExcludeModal";
import SaveRolesModal from "./modal/SaveRolesModal";
import { useLoadingContext } from "@/context/loading/LoadingContext";

import API from "@/service/API";

const RolesPainel = () => {
  const [tableData, setTableData] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [modalData, setModalData] = useState({});
  const [excludeModalOpen, setExcludeModalOpen] = useState(false);
  const [excludeModal, setExcludeModal] = useState(null);

  const { attIsLoading } = useLoadingContext();
  const { showToast } = useToast();

  const fetchData = async () => {
    try {
      attIsLoading(true);
      const response = await API.get("/roles");
      setTableData(response.data.roles);
    } catch (error) {
      showToast(
        "error",
        "Failed to load Roles: " + error.response.data.message
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
  }, []);

  return (
    <>
      <div id="PainelRole">
        <RolesTable
          tableData={tableData}
          setOpenModalEdit={setOpenModalEdit}
          setModalData={setModalData}
          setExcludeModalOpen={setExcludeModalOpen}
          setExcludeModal={setExcludeModal}
        />

        {/* Edit/Create Roles Modal */}
        <SaveRolesModal
          isOpen={openModalEdit}
          setIsOpen={setOpenModalEdit}
          loadTable={loadTable}
          modalData={modalData}
          setModalData={setModalData}
        />

        {/* Exclude Confirmation Dialog */}
        <GeralExcludeModal
          id="ExcludeModalRoles"
          url="/roles"
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

export default RolesPainel;
