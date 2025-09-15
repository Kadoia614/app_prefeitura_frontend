import { useEffect, useState } from "react";
import Modal from "@/components/shared/modal/Modal";
import { useToast } from "@/components/shared/toast/ToastProvider.jsx";

// import { Accordion, AccordionTab } from "primereact/accordion";
import { Checkbox } from "primereact/checkbox";

import { Divider } from 'primereact/divider';
        
import PropTypes from "prop-types";
import CalendarInput from "@/components/shared/input/CalendarInput";

import {
  getBolsista,
  getEditalWithBolsista,
  vincularBolsista,
} from "@/service/ft_appServices";

const Vincular_Bolsista = ({
  selectedTable,
  isVincularModalOpen,
  setIsVincularModalOpen,
  fetchData,
}) => {
  const [bolsistasData, setBolsistasData] = useState([]);
  const [editalData, setEditalData] = useState([]);
  const [bolsistaSelecionado, setBolsistaSelecionado] = useState([]);
  const [dataVinculo, setDataVinculo] = useState(null)

  const { showToast } = useToast();

  const getData = async () => {
    const [{ bolsista }, { bolsista_edital }] = await Promise.all([
      getBolsista(),
      getEditalWithBolsista(selectedTable),
    ]);
    setEditalData(bolsista_edital);
    setBolsistasData(bolsista);
  };

  useEffect(() => {
    fetchData(selectedTable);
  }, [fetchData, selectedTable]);

  const CloseModal = () => {
    setIsVincularModalOpen(false);
    clearModal();
  };
  // apaga os dados do modal
  const clearModal = () => {
    setBolsistaSelecionado([]);
    setDataVinculo(null);
  };

  // merma coisa, somente para as demandas do próprio user que ele vai poder dar esse save / update, não faz sentido estar totalmente aqui, vou refatorar
  const saveItem = async () => {
    try {
      await vincularBolsista(selectedTable, bolsistaSelecionado, dataVinculo);

      setIsVincularModalOpen(false);
      clearModal();
      showToast("success", "Confirmed", "Edital salvo com sucesso");
      fetchData(selectedTable);
    } catch (error) {
      showToast("error", "Error", `Erro ao vincular Bolsista ${error.status == 400 ? "Dados inválidos" : error.response.data.message}`);
      return;
    }
  };

  const toggleBolsista = (bolsistaId) => {
    setBolsistaSelecionado((prev) => {
      const isIncluded = prev.includes(bolsistaId);
      if (isIncluded) {
        return prev.filter((item) => item !== bolsistaId);
      }
      return [...prev, bolsistaId];
    });
  };

  const isChecked = (bolsistaId) => {
    return (
      editalData.bolsistas?.some((b)=>b.id == bolsistaId) ||
      bolsistaSelecionado.includes(bolsistaId)
    );
  };

  return (
    <>
      {/* Modal to vinculate a Edital */}
      <Modal
        id="VincularBolsista"
        title={"Vincular Bolsista ao Edital"}
        onAcept={() => saveItem()}
        aceptLabel={"Salvar"}
        onRefuse={() => CloseModal()}
        typeAction={"btn-primary"}
        isOpen={isVincularModalOpen}
        setIsOpen={setIsVincularModalOpen}
        onShow={() => getData()}
        isDisabled={bolsistaSelecionado && dataVinculo ? false : true} 
      >
        <div id="EditalData">
          <div className="mt-1">
            <CalendarInput
              invalid={dataVinculo ? false : true}
              label={"Inicia em:"}

              value={dataVinculo || ""}
              onChange={(e) => {
                setDataVinculo(e.target.value);
              }}
              format={"dd-mm-yy"}
              view="date"
              showIcon
            />
          </div>
          <Divider />
          <div id="Data" className="flex flex-col mt-6">
            {bolsistasData.map((bolsista) => (
              <div key={bolsista.id} className="flex items-center mb-2">
                <Checkbox
                  disabled={
                    bolsista.status === "pendente" ||
                    editalData.bolsistas.some((b)=>b.id === bolsista.id)
                  }
                  inputId={`cb-${editalData.id}-${bolsista.id}`}
                  checked={isChecked(bolsista.id)}
                  onChange={() => toggleBolsista(bolsista.id)}
                />
                <label
                  htmlFor={`cb-${editalData.id}-${bolsista.id}`}
                  className={`ml-2 ${
                    bolsista.status === "pendente" ||
                    editalData.bolsistas.includes(bolsista.id)
                      ? "text-red-500/80 font-bold capitalize"
                      : ""
                  }`}
                >
                  {bolsista.nome}
                </label>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

Vincular_Bolsista.propTypes = {
  isVincularModalOpen: PropTypes.bool.isRequired,
  setIsVincularModalOpen: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  selectedTable: PropTypes.string,
  setIsLoading: PropTypes.func.isRequired,
};

export default Vincular_Bolsista;
