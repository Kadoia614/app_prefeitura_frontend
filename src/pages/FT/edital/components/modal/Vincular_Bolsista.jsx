import { useEffect } from "react";
import Modal from "@/components/shared/modal/Modal";

// import { Accordion, AccordionTab } from "primereact/accordion";
import { Checkbox } from "primereact/checkbox";

import { Divider } from "primereact/divider";

import PropTypes from "prop-types";
import CalendarInput from "@/components/shared/input/CalendarInput";

// import {
//   getEditalWithBolsista,
//   vincularBolsista,
// } from "@/service/ft_appServices";
import { useBolsistaContext } from "../../../../../context/ft/bolsista/BolsistaContext";
import { useEditalContext } from "../../../../../context/ft/edital/EditalContext";
import InputFieldLine from "../../../../../components/shared/input/inputfield/InputFieldLine";

const Vincular_Bolsista = ({ isVincularModalOpen, setIsVincularModalOpen }) => {
  const { bolsistas, fetchBolsistas, setQuery, query } = useBolsistaContext();
  const {
    targetEdital,
    editalBolsista,
    setBolsistasToVincular,
    bolsistasToVincular,
    addBolsistaIntoEdital,
  } = useEditalContext();

  useEffect(() => {
    setQuery({ page: 0, limit: 100000, search: "" });
    fetchBolsistas();
  }, []);

  const CloseModal = () => {
    setIsVincularModalOpen(false);
    clearModal();
  };
  // apaga os dados do modal
  const clearModal = () => {
    setBolsistasToVincular({
      bolsistas: [],
      data_vinculo: null,
    });
  };

  // merma coisa, somente para as demandas do próprio user que ele vai poder dar esse save / update, não faz sentido estar totalmente aqui, vou refatorar
  const saveItem = async () => {
    addBolsistaIntoEdital();
  };

  const toggleBolsista = (bolsistaId) => {
    setBolsistasToVincular((prev) => {
      const isIncluded = prev.bolsistas?.includes(bolsistaId);
      if (isIncluded) {
        return {
          ...prev,
          bolsistas: prev.bolsistas?.filter((id) => id !== bolsistaId),
        };
      }
      return {
        ...prev,
        bolsistas: [...prev.bolsistas, bolsistaId],
      };
    });
  };

  const isChecked = (bolsistaId) => {
    return (
      editalBolsista?.some((b) => b.id == bolsistaId) ||
      bolsistasToVincular.bolsistas?.includes(bolsistaId)
    );
  };

    useEffect(() => {
    fetchBolsistas(query);
  }, [query]);

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
        // onShow={() => getData()}
        isDisabled={
          bolsistasToVincular.bolsistas && bolsistasToVincular.data_vinculo
            ? false
            : true
        }
      >
        <div id="EditalData">
          <div className="mt-1">
            <CalendarInput
              invalid={bolsistasToVincular.data_vinculo ? false : true}
              label={"Inicia em:"}
              value={bolsistasToVincular.data_vinculo || ""}
              onChange={(e) => {
                setBolsistasToVincular((prev) => ({
                  ...prev,
                  data_vinculo: e.target.value,
                }));
              }}
              format={"dd-mm-yy"}
              view="date"
              showIcon
            />
          </div>
          <Divider />
          <div id="Data" className="flex flex-col mt-6">
            <div className="mb-4">
              <InputFieldLine
                id="search"
                placeholder="Busca por nome ou cpf"
                value={query.search}
                onChange={(e) =>
                  setQuery((q) => ({ ...q, search: e.target.value, page: 0 }))
                }
              />
            </div>
            {bolsistas.map((bolsista) => (
                  <div key={bolsista.id} className="flex items-center mb-2">
                    <Checkbox
                      disabled={
                        bolsista.status === "pendente" ||
                        editalBolsista?.some((b) => b.id === bolsista.id)
                      }
                      inputId={`cb-${targetEdital?.id}-${bolsista.id}`}
                      checked={isChecked(bolsista.id)}
                      onChange={() => toggleBolsista(bolsista.id)}
                    />
                    <label
                      htmlFor={`cb-${targetEdital?.id}-${bolsista.id}`}
                      className={`ml-2 ${
                        bolsista.status === "pendente" ||
                        editalBolsista?.includes(bolsista.id)
                          ? "text-danger/80 font-bold capitalize"
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
};

export default Vincular_Bolsista;
