import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import PropTypes from "prop-types";
import { useLoadingContext } from "@/context/loading/LoadingContext";

const Modal = ({
  id,
  title,
  onHide,
  onShow,
  aceptLabel = "Confirmar",
  onAcept,
  refuseLabel = "Cancelar",
  onRefuse,
  typeAction = "btn-primary",
  typeCancel = "btn-cancel",
  isOpen,
  setIsOpen,
  children,
  isDisabled = false,
}) => {
  const { attIsLoading } = useLoadingContext();

  const handdleAcept = async () => {
    try {
      attIsLoading(true);
      await onAcept();
      setIsOpen(false);
      attIsLoading(false);
    } catch {
      attIsLoading(false);
    }
  };

  const handdleRefuse = async () => {
    try {
      attIsLoading(true);
      await onRefuse();
      setIsOpen(false);
      attIsLoading(false);
    } catch {
      attIsLoading(false);
    }
  };

  const footer = (
    <div className="flex justify-end gap-2 mt-4">
      <Button
        label={aceptLabel}
        onClick={handdleAcept}
        disabled={isDisabled}
        className={typeAction}
      />
      <Button
        label={refuseLabel}
        onClick={handdleRefuse}
        className={typeCancel}
      />
    </div>
  );

  return (
    <Dialog
      id={id}
      visible={isOpen}
      onHide={onHide || handdleRefuse}
      header={title}
      footer={footer}
      modal
      closable
      blockScroll
      dismissableMask
      className="p-fluid w-[50vw]"
      onShow={onShow}
    >
      {children}
    </Dialog>
  );
};

Modal.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  aceptLabel: PropTypes.string,
  onAcept: PropTypes.func,
  refuseLabel: PropTypes.string,
  onRefuse: PropTypes.func,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
  typeAction: PropTypes.string,
  typeCancel: PropTypes.string,
  children: PropTypes.node,
  isDisabled: PropTypes.bool,
};

export default Modal;
