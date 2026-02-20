import { useState } from "react";
import InputField from "../../shared/input/inputfield/InputField";
import editableItem from "../../../assets/js/editableItem";
import Modal from "../../shared/modal/Modal";
import CalendarInput from "../../shared/input/CalendarInput";

import PropTypes from "prop-types";
import { useAgendamentoContext } from "../../../context/reservas/reservas/AgendamentoContext";

const ReservasCreateModal = ({ isOpen, setIsOpen }) => {
    let {addAgendamento} = useAgendamentoContext();
  const [data, setData] = useState({
    data_agendamento: "",
    hora_inicio: "",
    hora_fim: "",
  });



  const Clear = () => {
    setData({});
    setIsOpen(false);
  };

  const CriarAgendamento = () => {
    addAgendamento(data);
  };

  return (
    <Modal
      id="motoristaModal"
      title={"Cadastro de Motorista"}
      aceptLabel="Confirmar"
      onHide={() => {
        Clear();
        setIsOpen(false);
      }}
      refuseLabel="Cancelar"
      onRefuse={Clear}
      isOpen={isOpen}
      onAcept={() => CriarAgendamento()}
      setIsOpen={setIsOpen}
    >
      <div className="py-2"></div>
      <div className="flex flex-row flex-wrap">
        <CalendarInput
          fieldClass={"w-1/1"}
          inputClass={"md:w-1/2 w-1/1 md: pr-1"}
          id="SetDataReserva"
          label="Data de agendamento"
          placeHolder={"Selecionar data"}
          value={data.data_agendamento}
          view={"date"}
          onChange={(e) =>
            editableItem("data_agendamento", e.target.value, setData)
          }
        ></CalendarInput>
        <CalendarInput
          id="HoraInicioReserva"
          fieldClass={"md:w-1/2 w-1/1 md: pr-1"}
          label="Hora de inicio"
          placeHolder={"Selecionar a hora"}
          value={data.hora_inicio}
          timeOnly
          icon={() => <i className="pi pi-clock" />}
          onChange={(e) => editableItem("hora_inicio", e.target.value, setData)}
        ></CalendarInput>

        <CalendarInput
          id="HoraFimReserva"
          fieldClass={"md:w-1/2 w-1/1 md: pl-1"}
          label="Hora de fim"
          placeHolder={"Selecionar a hora"}
          value={data.hora_fim}
          timeOnly
          minTime={data.hora_inicio}
          maxTime={data.hora_fim}
          icon={<i className="pi pi-clock"></i>}
          onChange={(e) => editableItem("hora_fim", e.target.value, setData)}
        ></CalendarInput>

        <InputField
          fieldClass={"md:w-6/12 w-12/12 md:pr-2"}
          id="ReservaOrigem"
          value={data?.origem}
          onChange={(e) => editableItem("origem", e.target.value, setData)}
          label="Origem"
        ></InputField>
        <InputField
          fieldClass={"md:w-6/12 w-12/12 md:pr-2"}
          id="ReservaDestino"
          value={data?.destino}
          onChange={(e) => editableItem("destino", e.target.value, setData)}
          label="Destino"
        ></InputField>
        <InputField
          fieldClass={"w-12/12 md:pr-2"}
          id="ReservaObservacao"
          maxLength={150}
          value={data?.observacao}
          onChange={(e) => editableItem("observacao", e.target.value, setData)}
          label="Observacao"
        ></InputField>
      </div>
    </Modal>
  );
};

ReservasCreateModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default ReservasCreateModal;
