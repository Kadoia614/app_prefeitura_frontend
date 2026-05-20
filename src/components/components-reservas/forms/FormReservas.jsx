import { Divider } from "primereact/divider";
import { useAgendamentoContext } from "../../../context/reservas/reservas/AgendamentoContext";
import InputField from "../../shared/input/inputfield/InputField";
import editableItem from "../../../assets/js/editableItem";
import { useState } from "react";
import CalendarInput from "../../shared/input/CalendarInput";

const FormReservasComponent = () => {
  let { addAgendamento } = useAgendamentoContext();
  const [data, setData] = useState({});
  return (
    <div className="p-4 bg-background-card w-lg ring-1 ring-primary/50 shadow-primary shadow-md rounded-md">
      <div className="text-xl uppercase text-center">
        Formulário de solicitação de veículo
      </div>
      <Divider></Divider>
      <div className="p-4 flex flex-col">
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
            onChange={(e) =>
              editableItem("hora_inicio", e.target.value, setData)
            }
          ></CalendarInput>
          <CalendarInput
            id="HoraFimReserva"
            fieldClass={"md:w-1/2 w-1/1 md:pl-1"}
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
            fieldClass={"md:w-1/2 w-12/12 md:pr-2"}
            inputClass={"w-full"}
            id="ReservaOrigem"
            value={data?.origem}
            onChange={(e) => editableItem("origem", e.target.value, setData)}
            label="Origem"
          ></InputField>
          <InputField
            fieldClass={"md:w-1/2 w-12/12 md:pr-2"}
            inputClass={"w-full"}
            id="ReservaDestino"
            value={data?.destino}
            onChange={(e) => editableItem("destino", e.target.value, setData)}
            label="Destino"
          ></InputField>

          <InputField
            fieldClass={"w-12/12"}
            inputClass={"w-full"}
            id="ReservaObservacao"
            maxLength={150}
            value={data?.observacao}
            onChange={(e) =>
              editableItem("observacao", e.target.value, setData)
            }
            label="Observacao"
          ></InputField>
        </div>
        <div className="flex flex-row gap-4 justify-end mt-4">
          <button className="btn btn-primary" onClick={() => {addAgendamento(data); setData({})}}>
            Solicitar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormReservasComponent;
