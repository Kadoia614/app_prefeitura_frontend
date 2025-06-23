import { useState } from "react";
import Modal from "@/components/shared/modal/Modal";
import { useToast } from "@/components/shared/toast/ToastProvider.jsx";
import InputField from "@/components/shared/input/inputfield/InputField";
import InputFieldMoney from "@/components/shared/input/InputFieldMoney";
import { postEdital, updateEdital } from "@/service/ft_appServices";
import CalendarInput from "@/components/shared/input/CalendarInput";
import PropTypes from "prop-types";

const Edital_Modal = ({
  isEditalModalOpen,
  setIsEditalModalOpen,
  fetchData,
  setIsLoading,
}) => {
  const [editalData, setEditalData] = useState({});

  const { showToast } = useToast();
  const today = new Date();

  // sómente para gerenciar os valore dos inputs
  const editableItem = (key, value) => {
    setEditalData((e) => ({ ...e, [key]: value }));
  };

  // apaga os dados do modal
  const clearModal = () => {
    setEditalData({});
  };

  // merma coisa, somente para as demandas do próprio user que ele vai poder dar esse save / update, não faz sentido estar totalmente aqui, vou refatorar
  const saveItem = async (id) => {
    try {
      console.log(setIsLoading);
      setIsLoading(true);
      console.log(editalData.data_publicacao)
      let payload = {
        edital: {
          name: editalData.name,
          data_publicacao: editalData.data_publicacao,
          data_vencimento: editalData.data_vencimento,
          dia_pagamento: editalData.dia_pagamento,
          valor_bolsa: editalData.valor_bolsa,
        },
      };

      if (id) {
        await updateEdital(`${id}`, payload);
      } else {
        await postEdital(payload);
      }

      showToast("success", "Confirmed", "Edital salvo com sucesso");
      setIsEditalModalOpen(false);
      clearModal();
      fetchData();
    } catch (error) {
      showToast("error", "Error", `Erro ao salvar Edital ${error.status == 400 ? "Dados inválidos" : error.response.data.message}`);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Modal to create/ edit a Edital */}
      <Modal
        id="EditalModal"
        title={editalData?.id ? "Atualizar Edital" : "Cadastrar Edital"}
        acept={() => {
          saveItem(editalData?.id || null);
        }}
        aceptLabel={"Salvar"}
        refuse={() => {
          setIsEditalModalOpen(false);
          clearModal();
        }}
        typeAction={"btn-primary"}
        open={isEditalModalOpen}
        onClose={setIsEditalModalOpen}
      >
        <div id="EditalData">
          <div id="Data" className="grid grid-cols-1 sm:grid-cols-8 gap-4">
            {/* Nome */}
            <div className="mt-1 col-span-2 sm:col-span-full">
              <InputField
                invalid={editalData?.name ? false : true}
                id="Name"
                inputClass="w-full"
                label="Nome"
                value={editalData?.name || ""}
                onChange={(e) => {
                  editableItem("name", e.target.value);
                }}
              />
            </div>

            {/* Publicacao */}
            <div className="mt-1 col-span-3">
              <CalendarInput
                invalid={editalData?.data_publicacao ? false : true}
                label={"Publicação"}
                value={editalData?.data_publicacao || ""}
                onChange={(e) => {
                  editableItem("data_publicacao", e.target.value);
                }}
                format={"dd-mm-yy"}
                view="date"
                showIcon
              />
            </div>

            {/* Validade */}
            <div className="mt-1 col-span-3">
              <CalendarInput
                invalid={editalData?.data_vencimento ? false : true}
                label={"Expira em:"}
                inputClass="w-full"
                value={editalData?.data_vencimento || ""}
                onChange={(e) => {
                  editableItem("data_vencimento", e.target.value);
                }}
                format={"dd-mm-yy"}
                view="date"
                showIcon
              />
            </div>

            {/* Pagamento */}
            <div className="mt-1 col-span-2">
              <CalendarInput
                invalid={editalData?.dia_pagamento ? false : true}
                label={"Pagamento"}
                inputClass="w-full"
                value={
                  editalData?.dia_pagamento
                    ? new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        editalData?.dia_pagamento
                      )
                    : null
                }
                onChange={(e) => {
                  editableItem("dia_pagamento", e.target.value.getDate());
                }}
                format={"dd"}
                view="date"
              />
            </div>

            {/* Bolsa */}
            <div className="mt-1 col-span-4">
              <InputFieldMoney
                invalid={editalData?.valor_bolsa ? false : true}
                id="Bolsa"
                keyfilter="int"
                inputClass="w-full sm:w-50"
                label="Valor da Bolsa"
                value={editalData?.valor_bolsa || ""}
                onChange={(e) => {
                  editableItem("valor_bolsa", e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
Edital_Modal.propTypes = {
  isEditalModalOpen: PropTypes.bool.isRequired,
  setIsEditalModalOpen: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default Edital_Modal;
