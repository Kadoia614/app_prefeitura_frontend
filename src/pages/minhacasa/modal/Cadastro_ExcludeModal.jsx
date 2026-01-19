import PropTypes from 'prop-types';

import Modal from "@/components/shared/modal/Modal";
const Cadastro_ExcludeModal = ({ isOpen, setIsOpen }) => {

  const handleConfirm = async () => {
    // removeBolsista();
    setIsOpen(false);
  };
  const handleRefuse = () => {
    // setTarget({});
    setIsOpen(false);
  };
  return (
    <Modal
      id={"cadastroExcludeModal"}
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
        Tem certeza que deseja excluir esse cadastro?
      </p>
    </Modal>
  );
};

Cadastro_ExcludeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};


export default Cadastro_ExcludeModal;