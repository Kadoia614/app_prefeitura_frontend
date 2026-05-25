import { useState } from "react";
import PropTypes from "prop-types";

import { Checkbox } from "primereact/checkbox";
import { InputSwitch } from "primereact/inputswitch";

import Modal from "@/components/shared/modal/Modal";
import InputField from "@/components/shared/input/inputfield/InputField";
import { useToast } from "@/components/shared/toast/ToastProvider";

import { saveService, updateService } from "@/service/user_serviceServices";

const SaveServiceModal = ({
  isOpen,
  setIsOpen,
  modalData,
  setModalData,
  setor,
  roles,
  loadTable,
}) => {
  const [rolePermission, setRolePermission] = useState(false);
  const [dropdownService, setDropdownService] = useState(false);

  const { showToast } = useToast();

  const onSave = async (id) => {
    if (!modalData.service.id) {
      await saveService({ service: modalData.service });
    } else {
      await updateService(
        {
          service: modalData.service,
          visibility: modalData.visibility,
          permissions: modalData.permissions,
        },
        id,
      );
    }
  };

  const handleSave = async () => {
    try {
      await onSave(modalData.service.id);
      showToast(
        "success",
        modalData.id
          ? "Service updated successfully!"
          : "Service saved successfully!",
      );
      setModalData({});
    } catch (error) {
      showToast(
        "error",
        "Failed to save Service: " + error.response.data.message,
      );
    } finally {
      loadTable();
    }
  };

  const editableItem = (key, value) => {
    setModalData((prev) => ({
      ...prev,
      service: { ...prev.service, [key]: value },
    }));
  };

  const editablePermission = (permissionId, key, value) => {
    setModalData((prev) => ({
      ...prev,
      permissions: prev.permissions.map((perm) =>
        perm.id === permissionId ? { ...perm, [key]: value } : perm,
      ),
    }));
  };

  const editableVisibility = (visibilityId, value) => {
    setModalData((prev) => ({
      ...prev,
      visibility: prev.visibility.map((visib) =>
        visib.id === visibilityId ? { ...visib, visibility: value } : visib,
      ),
    }));
    console.log(modalData);
  };

  return (
    <Modal
      title={modalData.service?.id ? "Edit Service" : "New Service"}
      isOpen={isOpen}
      onAcept={() => handleSave()}
      onRefuse={() => setIsOpen(false)}
      aceptLabel="Save"
      typeAction="btn-primary"
      typeCancel="btn-cancel"
      setIsOpen={setIsOpen}
    >
      {console.log(modalData)}
      <div className="p-4">
        <div id="ServiceData" className="sm:grid grid-cols-1 gap-4">
          <div id="Data" className="sm:grid grid-cols-1 gap-4">
            {/* Name */}
            <InputField
              id="Name"
              label="Nome do Serviço"
              value={modalData.service?.name || ""}
              onChange={(e) => editableItem("name", e.target.value)}
            />
            {/* Description */}
            <InputField
              id="Description"
              label="Descrição do Serviço"
              value={modalData.service?.description || ""}
              onChange={(e) => editableItem("description", e.target.value)}
              isTextArea
            />
            {/* URL */}
            <InputField
              id="Url"
              label="Url do Serviço"
              value={modalData.service?.url || ""}
              onChange={(e) => editableItem("url", e.target.value)}
            />
          </div>

          {/* Roles config permissions */}
          <div
            id="RolesConfig"
            className={`mt-6 bg-gray-100 rounded-sm ring-gray-300 ring-1 hover:ring-primary transition ${
              modalData ? (rolePermission ? "h-full" : "h-15") : "hidden"
            } overflow-hidden`}
          >
            <div
              className="flex justify-between items-center px-4 py-4 cursor-pointer"
              onClick={() => setRolePermission(!rolePermission)}
            >
              <h3 className="text-lg font-bold">Roles permissions</h3>
              <i
                className={`transition pi pi-angle-down ${
                  rolePermission ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            <div>
              {modalData?.permissions
                ? modalData.permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex justify-between items-start px-4 py-2"
                    >
                      <h3 className="text-lg font-bold">
                        {
                          roles.find((role) => role.id === permission.role_id)
                            ?.name
                        }
                      </h3>
                      <div className="flex space-x-4">
                        <Checkbox
                          inputId={`read-${permission.role_id}`}
                          name="read"
                          value="Read"
                          onChange={(e) =>
                            editablePermission(permission.id, "read", e.checked)
                          }
                          checked={permission.read || false}
                        />
                        <label htmlFor={`read-${permission.role_id}`}>
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
                              e.checked,
                            )
                          }
                          checked={permission.write || false}
                        />
                        <label htmlFor={`write-${permission.role_id}`}>
                          Write
                        </label>

                        <Checkbox
                          inputId={`edit-${permission.role_id}`}
                          name="edit"
                          value="Edit"
                          onChange={(e) =>
                            editablePermission(permission.id, "edit", e.checked)
                          }
                          checked={permission.edit || false}
                        />
                        <label htmlFor={`edit-${permission.role_id}`}>
                          Edit
                        </label>

                        <Checkbox
                          inputId={`delete-${permission.role_id}`}
                          name="delete"
                          value="Delete"
                          onChange={(e) =>
                            editablePermission(permission.id, "del", e.checked)
                          }
                          checked={permission.del || false}
                        />
                        <label htmlFor={`delete-${permission.role_id}`}>
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
              modalData ? (dropdownService ? "h-full" : "h-15") : "hidden"
            } overflow-hidden`}
          >
            <div
              className="flex justify-between items-center px-4 py-4 cursor-pointer"
              onClick={() => setDropdownService(!dropdownService)}
            >
              <h3 className="text-lg font-bold">Service Visibility</h3>
              <i
                className={`transition pi pi-angle-down ${
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
                              (setor) => setor.id == visibility.setor_id,
                            )?.name
                          }
                        </h3>
                        <InputSwitch
                          checked={visibility.visibility}
                          onChange={(e) =>
                            editableVisibility(visibility.id, e.value)
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
    </Modal>
  );
};

SaveServiceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  modalData: PropTypes.object.isRequired,
  setModalData: PropTypes.func.isRequired,
  setor: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
    }),
  ).isRequired,
  roles: PropTypes.array,
  onSave: PropTypes.func,
  loadTable: PropTypes.func.isRequired,
};

export default SaveServiceModal;
