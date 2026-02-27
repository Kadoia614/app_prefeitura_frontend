import Modal from "@/components/shared/modal/Modal";
import { useToast } from "@/components/shared/toast/ToastProvider.jsx";
import InputField from "@/components/shared/input/inputfield/InputField";
import InputFieldMoney from "@/components/shared/input/inputfield/InputFieldMoney";
import CalendarInput from "@/components/shared/input/CalendarInput";
import PropTypes from "prop-types";
import { useEditalContext } from "../../../../context/ft/edital/EditalContext";

const Edital_Modal = ({
  isEditalModalOpen,
  setIsEditalModalOpen,
}) => {
  let { setNewEdital, newEdital, addEdital } = useEditalContext();

  const { showToast } = useToast();
  const today = new Date();

  // sómente para gerenciar os valore dos inputs
  const editableItem = (key, value) => {
    setNewEdital((e) => ({ ...e, [key]: value }));
  };

  // apaga os dados do modal
  const clearModal = () => {
    setNewEdital({});
  };

  // merma coisa, somente para as demandas do próprio user que ele vai poder dar esse save / update, não faz sentido estar totalmente aqui, vou refatorar
  const saveItem = async () => {
    try {
      if (setNewEdital.id) {
        // await updateEdital(`${id}`, payload);
      } else {
        await addEdital();
      }
    } catch (error) {
      showToast(
        "error",
        "Error",
        `Erro ao salvar Edital ${
          error.status == 400 ? "Dados inválidos" : error.response.data.message
        }`
      );
      return;
    }
  };

  return (
    <>
      {/* Modal to create/ edit a Edital */}
      <Modal
        id="EditalModal"
        title={newEdital?.id ? "Atualizar Edital" : "Cadastrar Edital"}
        onAcept={() => {
          saveItem(newEdital?.id || null);
        }}
        aceptLabel={"Salvar"}
        onRefuse={() => {
          setIsEditalModalOpen(false);
          clearModal();
        }}
        typeAction={"btn-primary"}
        isOpen={isEditalModalOpen}
        setIsOpen={setIsEditalModalOpen}
      >
        <div id="EditalData">
          <div id="Data" className="grid grid-cols-1 sm:grid-cols-8 gap-4">
            {/* Nome */}
            <div className="mt-1 col-span-2 sm:col-span-full">
              <InputField
                invalid={newEdital?.name ? false : true}
                id="Name"
                inputClass="w-full"
                label="Nome"
                value={newEdital?.name || ""}
                onChange={(e) => {
                  editableItem("name", e.target.value);
                }}
              />
            </div>

            {/* Publicacao */}
            <div className="mt-1 col-span-3">
              <CalendarInput
                invalid={newEdital?.data_publicacao ? false : true}
                label={"Publicação"}
                value={newEdital?.data_publicacao || ""}
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
                invalid={newEdital?.data_vencimento ? false : true}
                label={"Expira em:"}
                inputClass="w-full"
                value={newEdital?.data_vencimento || ""}
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
                invalid={newEdital?.dia_pagamento ? false : true}
                label={"Pagamento"}
                inputClass="w-full"
                value={
                  newEdital?.dia_pagamento
                    ? new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        newEdital?.dia_pagamento
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
                invalid={newEdital?.valor_bolsa ? false : true}
                id="Bolsa"
                keyfilter="int"
                inputClass="w-full sm:w-50"
                label="Valor da Bolsa"
                value={newEdital?.valor_bolsa || ""}
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
};

export default Edital_Modal;
