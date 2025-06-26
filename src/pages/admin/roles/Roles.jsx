import { useEffect, useState } from "react";

import { Button } from "primereact/button";

import HandleError from "@/middleware/HandleError";
import { useToast } from "@/components/shared/toast/ToastProvider";
import InputField from "@/components/shared/input/inputfield/InputField";
import RolesTable from "./table/RolesTable";
import GeralExcludeModal from "@/components/shared/modal/GeralExcludeModal";

import API from "@/service/API";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";


const RolesPainel = ({ setIsLoading }) => {
  const [tableData, setTableData] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [modalData, setModalData] = useState({});
  const [excludeModalOpen, setExcludeModalOpen] = useState(false);
  const [excludeModal, setExcludeModal] = useState(null);
  const [error, setError] = useState(null);

  const { showToast } = useToast();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/roles");
      setTableData(response.data.roles);
    } catch (error) {
      setError(error.status);
      showToast(
        "error",
        "Failed to load sectors: " + error.response.data.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadTable = () => {
    fetchData();
  };

  const handleSave = async (id) => {
    try {
      setIsLoading(true);
      if (!id) {
        await API.post("/roles", { role: modalData });
        showToast("success", "Sector created successfully!");
      } else {
        await API.put(`/roles/${id}`, { role: modalData });
        showToast("success", "Sector updated successfully!");
      }
      loadTable();
      setModalData({});
      setOpenModalEdit(false);
    } catch (error) {
      showToast(
        "error",
        "Failed to save sector: " + error.response.data.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTable();
  }, []);

  const editableItem = (key, value) => {
    setModalData((prev) => ({ ...prev, [key]: value }));
  };

  if (error) {
    return <HandleError Error={error} />;
  }

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

        {/* Edit/Create Sector Modal */}
        <Dialog
          open={openModalEdit}
          onClose={() => setOpenModalEdit(false)}
          className="relative z-10"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-left sm:mt-0 w-full">
                      <DialogTitle
                        as="h3"
                        className="text-lg font-semibold text-gray-900"
                      >
                        {modalData.id ? "Atualizar Role" : "Cadastrar Role"}
                      </DialogTitle>
                      <div className="mt-2">
                        <div id="UserConfig">
                          <div id="Data" className="sm:grid grid-cols-1 gap-4">
                            {/* Name Field */}
                            <InputField
                              id="Name"
                              label="Nome da Role"
                              value={modalData.name || ""}
                              onChange={(e) =>
                                editableItem("name", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button
                    label="Salvar"
                    onClick={() => handleSave(modalData.id || null)}
                    className="btn-primary ml-3"
                  />
                  <Button
                    label="Cancelar"
                    onClick={() => {
                      setOpenModalEdit(false);
                      setModalData({});
                    }}
                    className="btn-cancel ml-3"
                  />
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>

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
