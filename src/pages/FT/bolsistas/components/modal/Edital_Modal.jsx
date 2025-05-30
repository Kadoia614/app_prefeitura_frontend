import Modal from "@/components/shared/modal/Modal";
import { useToast } from "@/components/shared/toast/ToastProvider.jsx";
import InputField from "@/components/shared/input/InputField";
import { postBolsista, updateBolsista } from "@/service/ft_appServices";

const Edital_Modal = (
  editalData,
  setEditalData,
  isEditalModalOpen,
  setIsEditalModalOpen,
  fetchData,
  setIsLoading
) => {
  const { showToast } = useToast();

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
      let payload = {
        name: editalData.name,
        data_publicacao: editalData.ag,
        data_vencimento: editalData.dig_ag,
        dia_pagamento: editalData.conta,
        valor_bolsa: editalData.dig_conta,
      };

      if (id) {
        await updateBolsista(`${id}`, payload);
      } else {
        await postBolsista(payload);
      }

      showToast("success", "Confirmed", "Bolsista salvo com sucesso");
      setOpenModalEdit(false);
      clearModal();
      fetchData();
    } catch (error) {
      showToast("error", "Error", "Erro ao salvar bolsista " + error);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Modal to create/ edit a bolsista */}
      <Modal
        id="EditBolsista"
        title={editalData?.id ? "Atualizar Bolsista" : "Cadastrar Bolsista"}
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
        <div id="bolsistaData">
          <div id="Data" className="grid grid-cols-1 sm:grid-cols-8 gap-4">
            {/* Nome */}
            <div className="mt-1 col-span-2 sm:col-span-4">
              <InputField
                invalid={editalData?.nome ? false : true}
                id="Name"
                inputClass="w-full"
                label="Nome"
                value={editalData?.nome || ""}
                onChange={(e) => {
                  editableItem("nome", e.target.value);
                }}
              />
            </div>

            {/* CPF */}
            <div className="mt-1 col-span-2 sm:col-span-4">
              <InputField
                invalid={editalData?.cpf ? false : true}
                id="CPF"
                keyfilter="num"
                inputClass="w-full"
                label="CPF"
                value={editalData?.cpf || ""}
                onChange={(e) => {
                  editableItem("cpf", e.target.value);
                }}
                maxLength={11}
              />
            </div>

            {/* Local */}
            <div className="mt-1 col-span-full">
              <InputField
                invalid={editalData?.local ? false : true}
                id="CPF"
                inputClass="w-full"
                label="Local"
                value={editalData?.local || ""}
                onChange={(e) => {
                  editableItem("local", e.target.value);
                }}
              />
            </div>

            {/* Banco */}
            <div className="mt-1 col-span-full">
              <InputField
                invalid={editalData?.name ? false : true}
                id="Banco"
                keyfilter="int"
                inputClass="w-full sm:w-50"
                label="Banco"
                value={editalData?.name || ""}
                onChange={(e) => {
                  editableItem("name", e.target.value);
                }}
                maxLength={3}
              />
            </div>

            {/* agencia */}
            <div className="mt-1 col-span-3">
              <div className="p-inputgroup">
                <InputField
                  id="Ag"
                  invalid={editalData?.ag ? false : true}
                  keyfilter="int"
                  inputClass="w-full sm:w-33 mr-2"
                  label="Agência"
                  value={editalData?.ag || ""}
                  onChange={(e) => {
                    editableItem("ag", e.target.value);
                  }}
                  maxLength={4}
                />

                <InputField
                  invalid={editalData?.dig_ag ? false : true}
                  id="Dig_Ag"
                  keyfilter="int"
                  inputClass="w-full"
                  label="Dg"
                  value={editalData?.dig_ag || ""}
                  onChange={(e) => {
                    editableItem("dig_ag", e.target.value);
                  }}
                  maxLength={1}
                />
              </div>
            </div>

            <div className="mt-1 col-span-3">
              <div className="p-inputgroup">
                <InputField
                  invalid={editalData?.conta ? false : true}
                  keyfilter="int"
                  id="Conta"
                  inputClass="w-full sm:w-33 mr-2"
                  label="Conta"
                  value={editalData?.conta || ""}
                  onChange={(e) => {
                    editableItem("conta", e.target.value);
                  }}
                  maxLength={6}
                />

                <InputField
                  invalid={editalData?.dig_conta ? false : true}
                  keyfilter="int"
                  id="Dig_Conta"
                  inputClass="w-full"
                  label="Dg"
                  value={editalData?.dig_conta || ""}
                  onChange={(e) => {
                    editableItem("dig_conta", e.target.value);
                  }}
                  maxLength={1}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Edital_Modal;
