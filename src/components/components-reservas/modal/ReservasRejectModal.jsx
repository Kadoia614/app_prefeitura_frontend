import { Button } from "primereact/button";
import { useAgendamentoContext } from "../../../context/reservas/reservas/AgendamentoContext";
import Modal from "../../shared/modal/Modal";
import InputFieldTextArea from "../../shared/input/inputfield/InputFieldTextArea";

import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useRef } from "react";

import PropTypes from "prop-types";
import editableItem from "../../../assets/js/editableItem";

const ReservasRejectModal = ({ isOpen, setIsOpen }) => {
  let { refuseAgendamento, setTarget, target } = useAgendamentoContext();
  let stepperRef = useRef(null);

  const handleRefuse = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    refuseAgendamento();
    setIsOpen(false);
  };

  return (
    <Modal
      id={"reservasRejectModal"}
      title={`Rejeitar`}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      aceptLabel={`Confirmar`}
      onAcept={() => {
        handleConfirm();
        setTarget({});
      }}
      onRefuse={() => handleRefuse()}
      typeAction="btn-danger"
      typeCancel="btn-cancel"
    >
      <Stepper ref={stepperRef} linear>
        <StepperPanel header="Rejeitar agendamento">
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-background-muted rounded-md">
              <h2 className="text-lg text-danger font-bold">
                {" "}
                Tem certeza que deseja rejeitar essa reserva?
              </h2>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                label="Next"
                className={"btn-primary max-w-[50%]"}
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </div>
        </StepperPanel>
        <StepperPanel header="Adicionar Motivo">
          <InputFieldTextArea
            id="motivoReserva"
            label="Motivo"
            value={target.observacao}
            onChange={(e) =>
              editableItem("observacao", e.target.value, setTarget)
            }
          ></InputFieldTextArea>
        </StepperPanel>
      </Stepper>
    </Modal>
  );
};

ReservasRejectModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default ReservasRejectModal;
