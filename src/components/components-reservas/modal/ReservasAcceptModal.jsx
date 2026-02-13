import { Divider } from "primereact/divider";
import Modal from "../../shared/modal/Modal";
import Proptypes from "prop-types";
import SelectField from "../../shared/input/SelectField";
import { useState } from "react";
import { useAgendamentoContext } from "../../../context/reservas/reservas/AgendamentoContext";
import editableItem from "../../../assets/js/editableItem";

const ReservasAcceptModal = ({ isOpen, setIsOpen }) => {
  let { target, motoristasDisponiveis, confirmAgendamento } = useAgendamentoContext();

  const [value, setValue] = useState({
    motorista_uuid: "",
    veiculo_uuid: "",
  });

  let [disponiveis, setDisponiveis] = useState({ motorista: [], veiculo: [] });

  const getDisponiveis = async () => {
    setDisponiveis(
      await motoristasDisponiveis(
        target.data_agendamento,
        target.hora_inicio,
        target.hora_fim,
      ),
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Confirmar"
      onShow={() => {
        getDisponiveis();   
      }}
      aceptLabel="Confirmar"
      onAcept={() => {confirmAgendamento(target.uuid, value); setValue({ motorista: "", veiculo: ""})}}
      refuseLabel="Cancelar"
      onRefuse={() => setIsOpen(false)}
      typeAction="btn-info"
      typeCancel="btn-cancel"
    >
      <p>Selecione um motorista e veiculo para o agendamento</p>
      <Divider></Divider>
      <div className="flex flex-row flex-wrap md:gap-0 gap-2">
        <SelectField
          id="selectMotorista"
          label="Motorista"
          value={value.motorista_uuid}
          options={disponiveis?.motorista || []}
          fieldsetClass={"w-1/1 md:w-1/2 md:pr-2"}
          labelOptions="nome"
          valueKey="uuid"
          onChange={(e) => editableItem("motorista_uuid", e.target.value, setValue)}
        />
        <SelectField
          id="selectVeiculo"
          label="Veiculo"
          value={value.veiculo_uuid}
          options={disponiveis?.veiculo || []}
          labelOptions="placa"
          fieldsetClass={"w-1/1 md:w-1/2 md:pl-2"}
          valueKey="uuid"
          onChange={(e) => editableItem("veiculo_uuid", e.target.value, setValue)}
        />
      </div>
    </Modal>
  );
};

ReservasAcceptModal.propTypes = {
  isOpen: Proptypes.bool,
  setIsOpen: Proptypes.func,
};

export default ReservasAcceptModal;
