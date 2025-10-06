import { useToast } from "../../../../components/shared/toast/ToastProvider";
import PropTypes from "prop-types";
import Modal from "../../../../components/shared/modal/Modal";
import { IPTUMunicipeService } from "../../../../service/iptu";
import { useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import InputField from "../../../../components/shared/input/inputfield/InputField";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
const MunicipeModal = ({ isOpen, setIsOpen, modalData, setModalData }) => {
  const { showToast } = useToast();
  const [accept, setAccept] = useState(false);
  const stepperRef = useRef(null);

  const onSave = async (uuid) => {
    try {
      if (uuid) {
        await IPTUMunicipeService.update(uuid, {
          municipe: modalData,
        });
      } else {
        await IPTUMunicipeService.post({ municipe: modalData });
      }
      setAccept(false);

      showToast(
        "success",
        modalData.id
          ? "Municipe Atualizado com sucesso!"
          : "Municipe Salvo com sucesso!"
      );
    } catch (error) {
      setAccept(false);
      showToast(
        "error",
        "Falha ao salvar Municipe: " + error.response.data.message || error
      );
    }
  };

  const handleSave = async () => {
    try {
      await onSave(modalData.id);
      showToast(
        "success",
        modalData.id
          ? "Municipe updated successfully!"
          : "Municipe saved successfully!"
      );
      setModalData({});
    } catch (error) {
      showToast(
        "error",
        "Failed to save Municipe: " + error.response.data.message
      );
    } 
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
      onAcept={() => onSave(modalData.uuid)}
      title="Municipe"
      onSave={handleSave}
    >
      <Stepper ref={stepperRef} linear>
        <StepperPanel header="Municipe">
          <div className="flex flex-col gap-4">
            <InputField
              id="NameMunicipe"
              label="Nome"
              value={modalData.name}
              onChange={(e) =>
                setModalData({ ...modalData, name: e.target.value })
              }
            />
            <InputField
              id="CpfMunicipe"
              label="Cpf"
              value={modalData.cpf}
              onChange={(e) =>
                setModalData({ ...modalData, cpf: e.target.value })
              }
            />
            <InputField
              id="EmaiçMunicipe"
              label="Email"
              value={modalData.email}
              onChange={(e) =>
                setModalData({ ...modalData, email: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              label="Next"
              className={"btn-primary max-w-[50%]"}
              onClick={() => {
                stepperRef.current.nextCallback();
              }}
            />
          </div>
        </StepperPanel>
        <StepperPanel header="Confirmação">
          <div className="flex justify-start flex-col gap-4">
            <h3>Confirme os dados, por gentileza</h3>
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-wrap">
                  <span className="font-bold">Nome:</span> {modalData.name}
                </p>
              </div>
              <div>
                <p className="text-wrap">
                  <span className="font-bold">CPF:</span> {modalData.cpf}
                </p>
              </div>
              <div>
                <p className="text-wrap wrap-anywhere">
                  <span className="font-bold">Email:</span> {modalData.email}
                </p>
              </div>
              <div className="flex items-center mt-4">
                <Checkbox
                  inputId="AcceptMunicipe"
                  name="confirm_data"
                  value={false}
                  onChange={(e) => {
                    setAccept(e.checked);
                  }}
                  checked={accept}
                ></Checkbox>
                <span className="font-bold ml-2">Confirmar</span>
              </div>
            </div>
            <div className="flex justify-start gap-2 mt-4">
              <Button
                label="Voltar"
                className={"btn-cancel max-w-[50%]"}
                onClick={() => {stepperRef.current.prevCallback(); setAccept(false);}}
              />
            </div>
          </div>
        </StepperPanel>
      </Stepper>
    </Modal>
  );
};
MunicipeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  modalData: PropTypes.object.isRequired,
  setModalData: PropTypes.func.isRequired,
};

export default MunicipeModal;
