import Modal from "@/components/shared/modal/Modal";
import { useToast } from "@/components/shared/toast/ToastProvider";

import API from "@api/API";
import PropTypes from "prop-types";

const GeralExcludeModal = ({
  id,
  isOpen,
  setIsOpen,
  targetId,
  setTargetID,
  onShow,
  loadTable,
  url,
  message = "Tem certeza que deseja Excluir esse item? Essa ação pode ser desfeita.",
}) => {
  const { showToast } = useToast();

  const handleConfirm = async () => {
    try {
      await API.delete(`${url}/${targetId}`);
      showToast("success", "Deletado com sucesso!");
      loadTable();
    } catch (error) {
      alert(JSON.stringify(error.response.data));
      showToast("error", "Falha ao deletar: " + error.response.data.message);
    } finally {
      setIsOpen(false);
    }
  };

  const handleRefuse = () => {
    setIsOpen(false);
    setTargetID(null);
    showToast("info", "Operação cancelada");
  };

  return (
    <Modal
      id={id}
      title={`Excluir`}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onShow={onShow}
      aceptLabel={`Confirmar`}
      onAcept={handleConfirm}
      onRefuse={handleRefuse}
      typeAction="btn-danger"
      typeCancel="btn-cancel"
    >
      <p className="text-danger font-bold">{message}</p>
    </Modal>
  );
};

GeralExcludeModal.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  // oneOfType([PropTypes.string, PropTypes.number])
  targetId: PropTypes.any,
  setTargetID: PropTypes.func.isRequired,
  onShow: PropTypes.func,
  loadTable: PropTypes.func,
  url: PropTypes.string.isRequired,
  message: PropTypes.string,
};

export default GeralExcludeModal;
