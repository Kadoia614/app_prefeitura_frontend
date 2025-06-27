import InputField from "@/components/shared/input/inputfield/InputField";

import API from "@/service/API";

import Modal from "@/components/shared/modal/Modal";
import { useToast } from "@/components/shared/toast/ToastProvider";
import PropTypes from "prop-types";

const SalvarRolesModal = ({
  isOpen,
  setIsOpen,
  modalData,
  setModalData,
  loadTable,
}) => {
  const { showToast } = useToast();

  const onSave = async (id) => {
    if (!id) {
      await API.post("/roles", { role: modalData });
    } else {
      await API.put(`/roles/${id}`, { role: modalData });
    }
  };

  const handleSave = async () => {
    try {
      await onSave(modalData.id);

      showToast(
        "success",
        modalData.id ? "Role updated successfully!" : "Role saved successfully!"
      );
      setModalData({});
    } catch (error) {
      showToast("error", "Failed to save role: " + error.response.data.message);
    } finally {
      loadTable();
    }
  };

  const editableItem = (key, value) => {
    setModalData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Modal
      title={modalData.id ? "Edit Role" : "New Role"}
      isOpen={isOpen}
      onAcept={() => handleSave()}
      onRefuse={() => setIsOpen(false)}
      aceptLabel="Save"
      typeAction="btn-primary"
      typeCancel="btn-cancel"
      setIsOpen={setIsOpen}
    >
      <div className="p-4">
        <div id="RoleData" className="sm:grid grid-cols-1 gap-4">
          <InputField
            id="Name"
            label="Nome da Role"
            value={modalData.name || ""}
            onChange={(e) => editableItem("name", e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

SalvarRolesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  modalData: PropTypes.object.isRequired,
  setModalData: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  loadTable: PropTypes.func.isRequired,
};

export default SalvarRolesModal;
