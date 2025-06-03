import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const Modal = ({
  id,
  title,
  acept,
  aceptLabel = "Confirmar",
  refuse,
  onHide,
  onShow,
  typeAction = "btn-primary",
  open,
  children,
}) => {
  const footer = (
    <div className="flex justify-end gap-2">
      <Button
        label={aceptLabel}
        onClick={acept}
        className={typeAction}
      />
      <Button
        label="Cancelar"
        onClick={refuse}
        className="btn-cancel"
      />
    </div>
  );

  return (
    <Dialog
    id={id}
      visible={open}
      onHide={onHide || refuse}
      header={title}
      footer={footer}
      style={{ width: '50vw' }}
      modal
      closable
      blockScroll
      dismissableMask
      contentStyle={{ padding: '1.5rem' }}
      className="p-fluid"
      onShow={onShow}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
