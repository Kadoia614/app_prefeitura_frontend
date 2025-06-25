import { useEffect, useState } from "react";
import API from "../../../service/API";
import HandleError from "../../../middleware/HandleError";
import { Button } from "primereact/button";
import { IoIosArrowDown } from "react-icons/io";
import { Checkbox } from "primereact/checkbox";
import { InputSwitch } from "primereact/inputswitch";

import { useToast } from "@/components/shared/toast/ToastProvider";
import ServicesTable from "./table/ServicesTable";

import InputField from "../../../components/shared/input/inputfield/InputField";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const PainelServices = ({ setIsLoading }) => {
  const [tableData, setTableData] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [modalData, setModalData] = useState({});
  const [excludeModalOpen, setExcludeModalOpen] = useState(false);
  const [excludeModal, setExcludeModal] = useState(null);
  const [dropdownService, setDropdownService] = useState(false);

  const [roles, setRoles] = useState([]);
  const [rolePermission, setRolePermission] = useState(false);

  const [setor, setSetor] = useState([false]);

  const [error, setError] = useState(null);

  const { showToast } = useToast();

  const fetchData = async () => {
    try {
      const response = await API.get("/service");
      console.log(response.data);
      setTableData(response.data.services);
      setRoles(response.data.roles);
      setSetor(response.data.setores);
    } catch (error) {
      setError(error.status);
      showToast(
        "error",
        "Failed to load services: " + error.response.data.message
      ); // Show toast on error
    }
  };

  const loadTable = () => {
    fetchData();
  };

  //#region EDIT / CREATE ITEMS

  const saveItem = async (id) => {
    try {
      if (!id) {
        await API.post("/service", { service: modalData });
      } else {
        await API.put(`/service/${id}`, { service: modalData });
      }
      loadTable();
          setModalData({});
;
      showToast("success", "Service saved successfully!"); // Show success toast
      setOpenModalEdit(false);
    } catch (error) {
      console.error("Error saving item:", error);
      showToast(
        "error",
        "Failed to save service: " + error.response.data.message
      ); // Show toast on error
    }
  };

  const editableItem = (key, value) => {
    setModalData((prev) => ({ ...prev, [key]: value }));
  };

  const editablePermission = (permissionId, key, value) => {
    setModalData((prev) => ({
      ...prev,
      permission: prev.permission.map((perm) =>
        perm.id === permissionId ? { ...perm, [key]: value } : perm
      ),
    }));
  };

  const editableVisibility = (visibilityId, value) => {
    setModalData((prev) => ({
      ...prev,
      visibility: prev.visibility.map((visib) =>
        visib.id === visibilityId ? { ...visib, visibility: value } : visib
      ),
    }));
    console.log(modalData);
  };
  //#endregion EDIT ITEMS

  //#region REMOVE ITEMS

  const removeItem = async (id) => {
    try {
      await API.delete(`/service/${id}`);
      loadTable();
      showToast("success", "Service deleted successfully!"); // Show success toast
    } catch (error) {
      console.error("Error deleting item:", error);
      showToast(
        "error",
        "Failed to delete service: " + error.response.data.message
      ); // Show toast on error
    } finally {
      setExcludeModalOpen(false);
    }
  };
  //#endregion REMOVE ITEMS
  useEffect(() => {
    loadTable();
  }, []);

  if (error) {
    return <HandleError Error={error} />;
  }

  return (
    <div id="PainelServices">
      <ServicesTable
        tableData={tableData}
        setOpenModalEdit={setOpenModalEdit}
        setModalData={setModalData}
        setExcludeModalOpen={setExcludeModalOpen}
        setExcludeModal={setExcludeModal}
      ></ServicesTable>

      {/* MODAL REGION */}
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
                      {modalData.id ? "Atualizar Serviço" : "Cadastrar Serviço"}
                    </DialogTitle>
                    <div className="mt-2">
                      <div id="ServiceConfig">
                        <div id="Data" className="sm:grid grid-cols-1 gap-4">
                          {/* Name */}
                          <InputField
                            id="Name"
                            label="Nome do Serviço"
                            value={modalData.name || ""}
                            onChange={(e) =>
                              editableItem("name", e.target.value)
                            }
                          />
                          {/* Description */}
                          <InputField
                            id="Description"
                            label="Descrição do Serviço"
                            value={modalData.description || ""}
                            onChange={(e) =>
                              editableItem("description", e.target.value)
                            }
                            isTextArea
                          />
                          {/* URL */}
                          <InputField
                            id="Url"
                            label="Url do Serviço"
                            value={modalData.url || ""}
                            onChange={(e) =>
                              editableItem("url", e.target.value)
                            }
                          />
                        </div>

                        {/* Roles config permissions */}
                        <div
                          id="RolesConfig"
                          className={`mt-6 bg-gray-100 rounded-sm ring-gray-300 ring-1 hover:ring-primary transition ${
                            modalData
                              ? rolePermission
                                ? "h-full"
                                : "h-15"
                              : "hidden"
                          } overflow-hidden`}
                        >
                          <div
                            className="flex justify-between items-center px-4 py-4 cursor-pointer"
                            onClick={() => setRolePermission(!rolePermission)}
                          >
                            <h3 className="text-lg font-bold">
                              Roles permissions
                            </h3>
                            <IoIosArrowDown
                              className={`transition ${
                                rolePermission ? "rotate-180" : "rotate-0"
                              }`}
                            />
                          </div>

                          <div>
                            {modalData?.permission
                              ? modalData.permission.map((permission) => (
                                  <div
                                    key={permission.id}
                                    className="flex justify-between items-start px-4 py-2"
                                  >
                                    <h3 className="text-lg font-bold">
                                      {
                                        roles.find(
                                          (role) =>
                                            role.id === permission.role_id
                                        )?.name
                                      }
                                    </h3>
                                    <div className="flex space-x-4">
                                      <Checkbox
                                        inputId={`read-${permission.role_id}`}
                                        name="read"
                                        value="Read"
                                        onChange={(e) =>
                                          editablePermission(
                                            permission.id,
                                            "read",
                                            e.checked
                                          )
                                        }
                                        checked={permission.read || false}
                                      />
                                      <label
                                        htmlFor={`read-${permission.role_id}`}
                                      >
                                        Read
                                      </label>

                                      <Checkbox
                                        inputId={`write-${permission.role_id}`}
                                        name="write"
                                        value="Write"
                                        onChange={(e) =>
                                          editablePermission(
                                            permission.id,
                                            "write",
                                            e.checked
                                          )
                                        }
                                        checked={permission.write || false}
                                      />
                                      <label
                                        htmlFor={`write-${permission.role_id}`}
                                      >
                                        Write
                                      </label>

                                      <Checkbox
                                        inputId={`edit-${permission.role_id}`}
                                        name="edit"
                                        value="Edit"
                                        onChange={(e) =>
                                          editablePermission(
                                            permission.id,
                                            "edit",
                                            e.checked
                                          )
                                        }
                                        checked={permission.edit || false}
                                      />
                                      <label
                                        htmlFor={`edit-${permission.role_id}`}
                                      >
                                        Edit
                                      </label>

                                      <Checkbox
                                        inputId={`delete-${permission.role_id}`}
                                        name="delete"
                                        value="Delete"
                                        onChange={(e) =>
                                          editablePermission(
                                            permission.id,
                                            "del",
                                            e.checked
                                          )
                                        }
                                        checked={permission.del || false}
                                      />
                                      <label
                                        htmlFor={`delete-${permission.role_id}`}
                                      >
                                        Delete
                                      </label>
                                    </div>
                                  </div>
                                ))
                              : "Sem Role atribuida"}
                          </div>
                        </div>

                        <div
                          id="ServiceVisibility"
                          className={`mt-6 bg-gray-100 rounded-sm ring-gray-300 ring-1 hover:ring-primary transition ${
                            modalData
                              ? dropdownService
                                ? "h-full"
                                : "h-15"
                              : "hidden"
                          } overflow-hidden`}
                        >
                          <div
                            className="flex justify-between items-center px-4 py-4 cursor-pointer"
                            onClick={() => setDropdownService(!dropdownService)}
                          >
                            <h3 className="text-lg font-bold">
                              Service Visibility
                            </h3>
                            <IoIosArrowDown
                              className={`transition ${
                                dropdownService ? "rotate-180" : "rotate-0"
                              }`}
                            />
                          </div>
                          <div>
                            {modalData?.visibility
                              ? modalData.visibility.map((visibility) => {
                                  console.log(visibility);
                                  return (
                                    <div
                                      key={visibility.id}
                                      className="flex justify-between items-start px-4 py-2"
                                    >
                                      <h3 className="text-lg font-bold">
                                        {
                                          setor.find(
                                            (setor) =>
                                              setor.id == visibility.setor_id
                                          )?.name
                                        }
                                      </h3>
                                      <InputSwitch
                                        checked={visibility.visibility}
                                        onChange={(e) =>
                                          editableVisibility(
                                            visibility.id,
                                            e.value
                                          )
                                        }
                                      />
                                    </div>
                                  );
                                })
                              : "Sem dados"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Button
                  label="Salvar"
                  onClick={() => saveItem(modalData.id || null)}
                  className="btn-primary"
                />
                <Button
                  label="Cancelar"
                  onClick={() => {
                    setOpenModalEdit(false);
                        setModalData({});
;
                  }}
                  className="btn-cancel mr-3"
                />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {/* Exclude Confirmation Dialog */}
      <Dialog
        open={excludeModalOpen}
        onClose={() => setExcludeModalOpen(false)}
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
                      Deletar Serviço
                    </DialogTitle>
                    <p className="text-red-500 font-bold mt-2">
                      Tem certeza que deseja excluir esse item? Os dados
                      excluídos não poderão ser recuperados.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Button
                  label="Excluir"
                  onClick={() => removeItem(excludeModal)}
                  className="btn-danger"
                />
                <Button
                  label="Cancelar"
                  onClick={() => setExcludeModalOpen(false)}
                  className="btn-cancel mr-3"
                />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PainelServices;
