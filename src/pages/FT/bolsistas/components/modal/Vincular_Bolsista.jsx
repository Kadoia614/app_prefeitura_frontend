import { useState } from "react";
import Modal from "@/components/shared/modal/Modal";
import { useToast } from "@/components/shared/toast/ToastProvider.jsx";

import { Accordion, AccordionTab } from "primereact/accordion";
import { Checkbox } from "primereact/checkbox";
import PropTypes from "prop-types";

import {
  getBolsista,
  getEditalWithBolsista,
  vincularBolsista,
} from "@/service/ft_appServices";

const Edital_Modal = ({
  isVincularModalOpen,
  setIsVincularModalOpen,
  fetchData,
  setIsLoading,
}) => {
  const [bolsistasData, setBolsistasData] = useState([]);
  const [editalData, setEditalData] = useState([]);
  const [editaisSelecionados, setEditaisSelecionados] = useState([]);

  const { showToast } = useToast();

  const getData = async () => {
    const [{ bolsista }, { bolsista_edital }] = await Promise.all([
      getBolsista(),
      getEditalWithBolsista(),
    ]);

    setEditalData(bolsista_edital);
    setBolsistasData(bolsista);
  };

  const CloseModal = () => {
    setIsVincularModalOpen(false);
    clearModal();
  };
  // apaga os dados do modal
  const clearModal = () => {
    setEditaisSelecionados([]);
  };

  // merma coisa, somente para as demandas do próprio user que ele vai poder dar esse save / update, não faz sentido estar totalmente aqui, vou refatorar
  const saveItem = async () => {
    console.log(editaisSelecionados);
    try {
      setIsLoading(true);
      editaisSelecionados.forEach(async (selecionados) => {
        await vincularBolsista(selecionados.id, selecionados.bolsista);
      });
      setIsVincularModalOpen(false);
      clearModal();
      showToast("success", "Confirmed", "Edital salvo com sucesso");
      fetchData();
    } catch (error) {
      showToast("error", "Error", "Erro ao salvar Edital " + error);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBolsista = (editalId, bolsistaId) => {
    setEditaisSelecionados((prev) => {
      const isInclude = prev.find((e) => e.id === editalId);

      if (isInclude) {
        const haveBolsista = isInclude.bolsista.includes(bolsistaId);

        const novaListaBolsistas = haveBolsista
          ? isInclude.bolsista.filter((id) => id !== bolsistaId)
          : [...isInclude.bolsista, bolsistaId];

        return novaListaBolsistas.length === 0
          ? prev.filter((e) => e.id !== editalId)
          : prev.map((e) =>
              e.id === editalId ? { ...e, bolsista: novaListaBolsistas } : e
            );
      } else {
        return [...prev, { id: editalId, bolsista: [bolsistaId] }];
      }
    });
  };

  const isChecked = (edital, bolsistaId) => {
    return (
      edital.bolsistas?.some((b) => b.id === bolsistaId) ||
      (editaisSelecionados || [])
        .find((e) => e.id === edital.id)
        ?.bolsista.includes(bolsistaId)
    );
  };

  return (
    <>
      {/* Modal to vinculate a Edital */}
      <Modal
        id="VincularBolsista"
        title={"Vincular Bolsista ao Edital"}
        acept={() => saveItem()}
        aceptLabel={"Salvar"}
        refuse={() => CloseModal()}
        typeAction={"btn-primary"}
        open={isVincularModalOpen}
        onShow={() => getData()}
      >
        <div id="EditalData">
          <div id="Data" className="flex flex-col">
            <Accordion activeIndex={0}>
              {editalData?.map((edital, index) => {
                return (
                  <AccordionTab key={index} header={edital.name}>
                    {bolsistasData.map((bolsista) => (
                      <div key={bolsista.id} className="flex items-center mb-2">
                        <Checkbox
                          disabled={edital.bolsistas?.some(
                            (b) => b.id === bolsista.id
                          )}
                          inputId={`cb-${edital.id}-${bolsista.id}`}
                          checked={isChecked(edital, bolsista.id)}
                          onChange={() =>
                            toggleBolsista(edital.id, bolsista.id)
                          }
                        />
                        <label
                          htmlFor={`cb-${edital.id}-${bolsista.id}`}
                          className="ml-2"
                        >
                          {bolsista.nome}
                        </label>
                      </div>
                    ))}
                  </AccordionTab>
                );
              })}
            </Accordion>
          </div>
        </div>
      </Modal>
    </>
  );
};

Edital_Modal.propTypes = {
  isVincularModalOpen: PropTypes.bool.isRequired,
  setIsVincularModalOpen: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default Edital_Modal;