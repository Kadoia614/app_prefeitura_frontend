import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import PropTypes from "prop-types";

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
  children,
}) => {
  const footer = (
    <div className="flex justify-end gap-2">
      <Button label={aceptLabel} onClick={onAcept} className={typeAction} />
      <Button label={refuseLabel} onClick={onRefuse} className={typeCancel} />
    </div>
  );

  return (
    <Dialog
      id={id}
      visible={isOpen}
      onHide={onHide || onRefuse}
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
  aceptLabel: PropTypes.string,
  onAcept: PropTypes.func,
  refuseLabel: PropTypes.string,
  onRefuse: PropTypes.func,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
  typeAction: PropTypes.string,
  typeCancel: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;
