import { useEffect, useState } from "react";
import API from "../../../api/API";

import ServicesTable from "./table/ServicesTable";
import GeralExcludeModal from "@/components/shared/modal/GeralExcludeModal";
import SaveServiceModal from "./modal/SaveServiceModal";

import { useLoadingContext } from "@/context/loading/LoadingContext";
import { useToast } from "@/components/shared/toast/ToastProvider";

const PainelServices = () => {
  const [tableData, setTableData] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [modalData, setModalData] = useState({});
  const [excludeModalOpen, setExcludeModalOpen] = useState(false);
  const [excludeModal, setExcludeModal] = useState(null);

  const [roles, setRoles] = useState([]);

  const [setor, setSetor] = useState([false]);

  const { attIsLoading } = useLoadingContext();
  const { showToast } = useToast();

  const API_ENDPOINTS = {
  SERVICE: "/service",
  ROLES: "/roles",
  SETORES: "/setores",
};

  const fetchData = async () => {
    attIsLoading(true);

    try {
      const responseService = await API.get(API_ENDPOINTS.SERVICE);
      const responseRoles = await API.get(API_ENDPOINTS.ROLES);
      const responseSetores = await API.get(API_ENDPOINTS.SETORES);
      setTableData(responseService.data.services);
      setRoles(responseRoles.data.roles);
      setSetor(responseSetores.data.setores);
    } catch (error) {
      showToast(
        "error",
        "Failed to load services: " + error.response.data.message
      ); // Show toast on error
    } finally {
      attIsLoading(false);
    }
  };

  const loadTable = () => {
    fetchData();
  };

  //#region EDIT / CREATE ITEMS
  useEffect(() => {
    loadTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="PainelServices">
      <ServicesTable
        tableData={tableData}
        setOpenModalEdit={setOpenModalEdit}
        setModalData={setModalData}
        setExcludeModalOpen={setExcludeModalOpen}
        setExcludeModal={setExcludeModal}
      ></ServicesTable>

      {/* Edit/Create Service Modal */}
      <SaveServiceModal
        isOpen={openModalEdit}
        setIsOpen={setOpenModalEdit}
        loadTable={loadTable}
        modalData={modalData}
        setModalData={setModalData}
        setor={setor}
        roles={roles}
      />

      {/* Exclude Confirmation Dialog */}
      <GeralExcludeModal
        id="ExcludeModalService"
        url="/service"
        isOpen={excludeModalOpen}
        setIsOpen={setExcludeModalOpen}
        targetId={excludeModal}
        setTargetID={setExcludeModal}
        loadTable={() => loadTable()}
      />
    </div>
  );
};

export default PainelServices;
