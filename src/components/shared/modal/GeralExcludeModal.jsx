import Modal from "@/components/shared/modal/Modal";
import { useToast } from "@/components/shared/toast/ToastProvider";

import API from "@/service/API";
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
}) => {
  const { showToast } = useToast();

  const handleConfirm = async () => {
    try {

      await API.delete(`${url}/${targetId}`);
      showToast("success", "Deletado com sucesso!");
      loadTable();
    } catch (error) {
      alert(JSON.stringify(error.response.data))
      showToast(
        "error",
        "Falha ao deletar: " + error.response.data.message
      );
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
      title={`Excluir Role?`}
      isOpen={isOpen}
      onShow={onShow}
      setIsOpen={setIsOpen}
      aceptLabel={`Excluir`}
      onAcept={handleConfirm}
      onRefuse={handleRefuse}
      typeAction="btn-danger"
      typeCancel="btn-cancel"
    >
      <p className="text-red-500 font-bold">Tem certeza que deseja Excluir esse item? <br /> Essa ação pode ser desfeita.</p>
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
  loadTable: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default GeralExcludeModal;
