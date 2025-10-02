import { useToast } from "../../../../components/shared/toast/ToastProvider";
import PropTypes from "prop-types";
import Modal from "../../../../components/shared/modal/Modal";
import { IPTUMunicipeService } from "../../../../service/iptu";
import { useState } from "react";
import { Checkbox } from "primereact/checkbox";

const MunicipeExcludeModal = ({ isOpen, setIsOpen, modalData, setModalData }) => {
  const { showToast } = useToast();
  const [accept, setAccept] = useState(false);

  const onConfirm = async (uuid) => {
    try {
      const data = await IPTUMunicipeService.delete(uuid);
      showToast("success", "Sucesso", data.message);
    } catch (error) {
      showToast(
        "error",
        "Falha ao deletar: " + error.response.data.message || error
      );
    }
  };

  const handleSave = async () => {
    await onConfirm(modalData.id);
    setModalData({});
  };

  return (
    <Modal
      id={"IptuModalCert"}
      isDisabled={!accept}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => {
        setModalData({});
        setAccept(false);
      }}
      onRefuse={() => {
        setIsOpen(false);
        setAccept(false);
      }}
      onAcept={() => onConfirm(modalData.uuid)}
      title="Municipe"
      onSave={handleSave}
    >
      <div>
        <h2 className="text-center text-danger">
          Tem certeza que deseja excluir esse municipe?
        </h2>
        <div className="mt-4 flex gap-2">
          <Checkbox
            onChange={(e) => setAccept(e.checked)}
            checked={accept}
            name="accept"
          />
          <label htmlFor="accept">Eu confirmo a exclusão</label>
        </div>
      </div>
    </Modal>
  );
};
MunicipeExcludeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  modalData: PropTypes.object.isRequired,
  setModalData: PropTypes.func.isRequired,
};

export default MunicipeExcludeModal;
