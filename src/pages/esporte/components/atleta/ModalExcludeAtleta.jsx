import { useSportContext } from "@context/sport/SportContext";
import PropTypes from 'prop-types';

import Modal from "@/components/shared/modal/Modal";
const ModalExcludeAtleta = ({ isOpen, setIsOpen }) => {
  const { removeAtleta, setAtletaTarget } = useSportContext();

  const handleConfirm = async () => {
    removeAtleta();
    setIsOpen(false);
  };
  const handleRefuse = () => {
    setAtletaTarget({});
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
        Tem certeza que deseja excluir esse Atleta?
      </p>
    </Modal>
  );
};

ModalExcludeAtleta.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};


export default ModalExcludeAtleta;