import { useBolsistaContext } from "../../../../../context/ft/bolsista/BolsistaContext";
import PropTypes from 'prop-types';

import Modal from "@/components/shared/modal/Modal";
const ExcludeModal = ({ isOpen, setIsOpen }) => {
  const { removeBolsista, setTarget } = useBolsistaContext();

  const handleConfirm = async () => {
    removeBolsista();
    setIsOpen(false);
  };
  const handleRefuse = () => {
    setTarget({});
    setIsOpen(false);
  };
  return (
    <Modal
      id={"FT_Bolsista_excludeModal"}
      title={`Excluir`}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      aceptLabel={`Confirmar`}
      onAcept={() => handleConfirm()}
      onRefuse={() => handleRefuse()}
      typeAction="btn-danger"
      typeCancel="btn-cancel"
    >
      <p className="text-danger font-bold">
        Tem certeza que deseja excluir esse Bolsista??
      </p>
    </Modal>
  );
};

ExcludeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};


export default ExcludeModal;