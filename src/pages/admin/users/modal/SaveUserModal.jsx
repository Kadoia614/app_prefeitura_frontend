import PropTypes from "prop-types";

import Modal from "@/components/shared/modal/Modal";
import InputField from "@/components/shared/input/inputfield/InputField";
import SelectField from "@/components/shared/input/SelectField";

import { useToast } from "@/components/shared/toast/ToastProvider";

import { saveUser, updateUser } from "@/service/userServices";

const SaveSetorModal = ({
  isOpen,
  setIsOpen,
  modalData,
  setModalData,
  loadTable,
  roles,
  setores
}) => {
  const { showToast } = useToast();

  const onSave = async (id) => {
    if (!id) {
      await saveUser({ user: modalData });
    } else {
      await updateUser({ user: modalData }, id);
    }
  };

  const handleSave = async () => {
    try {
      await onSave(modalData.id);
      showToast(
        "success",
        modalData.id ? "User updated successfully!" : "User saved successfully!"
      );
      setModalData({});
    } catch (error) {
      showToast("error", "Failed to save User: " + error.response.data.message);
    } finally {
      loadTable();
    }
  };

  const editableItem = (key, value) => {
    setModalData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Modal
      title={modalData.id ? "Edit User" : "New User"}
      isOpen={isOpen}
      onAcept={() => handleSave()}
      onRefuse={() => setIsOpen(false)}
      aceptLabel="Save"
      typeAction="btn-primary"
      typeCancel="btn-cancel"
      setIsOpen={setIsOpen}
    >
      <div className="p-4">
        <div id="UserData" className="sm:grid grid-cols-1 gap-4">
          <InputField
            id="Name"
            label="Nome"
            value={modalData.name || ""}
            onChange={(e) =>
              editableItem("name", e.target.value)
            }
          />
          <InputField
            id="Email"
            label="Email"
            value={modalData.email || ""}
            keyfilter={"email"}
            onChange={(e) =>
              editableItem("email", e.target.value)
            }
          />
          <InputField
            id="Ramal"
            label="Ramal"
            value={modalData.ramal || ""}
            onChange={(e) =>
              editableItem("ramal", e.target.value)
            }
            maxLength="4"
          />
          <SelectField
            id="Setor"
            label="Setor"
            value={modalData.setor_id || ""}
            options={setores}
            onChange={(e) =>
              editableItem("setor_id", e.target.value)
            }
          />
          <SelectField
            id="Role"
            label="Permissão"
            value={modalData.role_id || ""}
            options={roles}
            onChange={(e) =>
              editableItem("role_id", e.target.value)
            }
          />
        </div>
      </div>
    </Modal>
  );
};

SaveSetorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  modalData: PropTypes.object.isRequired,
  setModalData: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  loadTable: PropTypes.func.isRequired,
  setores: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
};

export default SaveSetorModal;
