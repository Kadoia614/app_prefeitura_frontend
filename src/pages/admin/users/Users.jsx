import { useEffect, useState } from "react";

import { useToast } from "@/components/shared/toast/ToastProvider";
import { useLoadingContext } from "@/context/loading/LoadingContext";

import UserTable from "./table/UserTable";
import SaveUserModal from "./modal/SaveUserModal";
import GeralExcludeModal from "@/components/shared/modal/GeralExcludeModal";

import API from "../../../service/API";

const API_ENDPOINTS = {
  USERS: "/user",
};

const MESSAGES = {
  SUCCESS: {
    DELETE: "Deleted successfully",
    SAVE: "Saved successfully",
  },
  ERROR: {
    REQUIRED_FIELDS: "Name and Email are required.",
    OPERATION_CANCELLED: (msg) => `Operation cancelled: ${msg}`,
  },
};

const PainelAdmin = () => {
  const [tableData, setTableData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [setores, setSetores] = useState([]);

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [modalData, setModalData] = useState({});
  const [excludeModalOpen, setExcludeModalOpen] = useState(false);
  const [excludeModal, setExcludeModal] = useState(null);
  const { showToast } = useToast();

  const { attIsLoading } = useLoadingContext();

  const fetchData = async () => {
    attIsLoading(true);
    try {
      const response = await API.get(API_ENDPOINTS.USERS);
      setTableData(response.data.users);
      setRoles(response.data.roles);
      setSetores(response.data.setores);
    } catch (error) {
      showToast(
        "error",
        MESSAGES.ERROR.OPERATION_CANCELLED(error.response.data.message)
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
    <div id="PainelUser">
      <UserTable
        tableData={tableData}
        setOpenModalEdit={setOpenModalEdit}
        setModalData={setModalData}
        setExcludeModalOpen={setExcludeModalOpen}
        setExcludeModal={setExcludeModal}
        roles={roles}
        setores={setores}
      ></UserTable>

      {/* Edit/Create Sector Modal */}
      <SaveUserModal
        isOpen={openModalEdit}
        setIsOpen={setOpenModalEdit}
        loadTable={loadTable}
        modalData={modalData}
        setModalData={setModalData}
        roles={roles}
        setores={setores}
      />

      {/* Exclude Confirmation Dialog */}
      <GeralExcludeModal
        id="ExcludeModalUser"
        url="/user"
        isOpen={excludeModalOpen}
        setIsOpen={setExcludeModalOpen}
        targetId={excludeModal}
        setTargetID={setExcludeModal}
        loadTable={() => loadTable()}
      />
    </div>
  );
};

export default PainelAdmin;
