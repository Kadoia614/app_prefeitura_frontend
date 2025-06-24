import Modal from "@/components/shared/modal/Modal";
import { useToast } from "@/components/shared/toast/ToastProvider.jsx";
import PropTypes from "prop-types";

const Prorrogate_Modal = ({
  prorrogate,
  isProrrogateOpen,
  setIsProrrogateOpen,
  toProrrogate,
  setToProrrogate,
  setIsLoading,
}) => {
  const { showToast } = useToast();
  const today = new Date();

  // merma coisa, somente para as demandas do próprio user que ele vai poder dar esse save / update, não faz sentido estar totalmente aqui, vou refatorar
  const saveItem = async () => {
    setIsLoading(true);

    try {
      alert("Prorrogando Edital");
      showToast("success", "Confirmed", "Salvos com sucesso");
      setIsProrrogateOpen(false);
    } catch (error) {
      showToast(
        "error",
        "Error",
        `Erro ao salvar ${
          error.status == 400 ? "Dados inválidos" : error.response.data.message
        }`
      );
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const isChecked = () => {
    return prorrogate.map((bolsista) => {
      return toProrrogate.includes(bolsista.id);
    });
  };

  return (
    <>
      {/* Modal to create/ edit a Edital */}
      <Modal
        id="ProrrogateModal"
        title={"Bolsistas a serem prorrogados"}
        acept={() => {
          //   saveItem(editalData?.id || null);
        }}
        aceptLabel={"Salvar"}
        refuse={() => {
          setIsProrrogateOpen(false);
        }}
        typeAction={"btn-primary"}
        open={isProrrogateOpen}
        onClose={setIsProrrogateOpen}
      >
        <div id="ProrrogateData">
          <div
            id="Data"
            className="grid grid-cols-1 sm:grid-cols-8 gap-4"
          ></div>
        </div>
      </Modal>
    </>
  );
};

Prorrogate_Modal.propTypes = {
  isProrrogateOpen: PropTypes.bool.isRequired,
  setIsProrrogateOpen: PropTypes.func.isRequired,
  toProrrogate: PropTypes.array,
  setIsLoading: PropTypes.func.isRequired,
};

export default Prorrogate_Modal;
