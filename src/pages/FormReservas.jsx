import FormReservasComponent from "../components/components-reservas/forms/FormReservas";
import { AgendamentoProvider } from "../context/reservas/reservas/AgendamentoProvider";
import Title from "@/components/shared/title/Title";

const FormReservas = () => {
  return (
    <div id="FormReservas">
      <Title>Frente de Trabalho</Title>
      <div className="p-4 flex flex-col items-center">
        <AgendamentoProvider>
            <FormReservasComponent></FormReservasComponent>
        </AgendamentoProvider>
    </div>
    </div>
  );
};

export default FormReservas;
