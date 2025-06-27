import PropTypes from "prop-types";

import Modal from "@/components/shared/modal/Modal";
import InputField from "@/components/shared/input/inputfield/InputField";
import { useToast } from "@/components/shared/toast/ToastProvider";

import { saveSetor, updateSetor } from "@/service/setorServices";

const SaveSetorModal = ({
  isOpen,
  setIsOpen,
  modalData,
  setModalData,
  loadTable,
}) => {
  const { showToast } = useToast();

  const onSave = async (id) => {
    if (!id) {
      await saveSetor({ setor: modalData });
    } else {
      await updateSetor({ setor: modalData }, id);
    }
  };

  const handleSave = async () => {
    try {
      await onSave(modalData.id);
      showToast(
        "success",
        modalData.id ? "Setor updated successfully!" : "Setor saved successfully!"
      );
      setModalData({});
    } catch (error) {
      showToast("error", "Failed to save Setor: " + error.response.data.message);
    } finally {
      loadTable();
    }
  };

  const editableItem = (key, value) => {
    setModalData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Modal
      title={modalData.id ? "Edit Setor" : "New Setor"}
      isOpen={isOpen}
      onAcept={() => handleSave()}
      onRefuse={() => setIsOpen(false)}
      aceptLabel="Save"
      typeAction="btn-primary"
      typeCancel="btn-cancel"
      setIsOpen={setIsOpen}
    >
      <div className="p-4">
        <div id="SetorData" className="sm:grid grid-cols-1 gap-4">
          <InputField
            id="Name"
            label="Nome do Setor"
            value={modalData.name || ""}
            onChange={(e) => editableItem("name", e.target.value)}
          />
          {/* Description Field */}
          <InputField
            id="Description"
            label="Descrição do Setor"
            value={modalData.description || ""}
            onChange={(e) => editableItem("description", e.target.value)}
            isTextArea
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
};

export default SaveSetorModal;
