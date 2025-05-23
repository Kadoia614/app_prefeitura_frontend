import PropTypes from "prop-types";
import { postBolsista, updateBolsista } from "@/service/ft_appServices";

import Modal from "@/components/shared/modal/Modal";
import InputField from "@/components/shared/input/InputField";
import CalendarInput from "@/components/shared/input/CalendarInput";

import { useToast } from "@/components/shared/toast/ToastProvider.jsx";

const FT_Bolsista_Modal = ({
  modalData,
  setModalData,
  openModalEdit,
  setOpenModalEdit,
  fetchData,
  scopo,
  setIsLoading
}) => {
  const today = new Date();
  const { showToast } = useToast();

  // sómente para gerenciar os valore dos inputs
  const editableItem = (key, value) => {
    setModalData((e) => ({ ...e, [key]: value }));
  };

  // merma coisa, somente para as demandas do próprio user que ele vai poder dar esse save / update, não faz sentido estar totalmente aqui, vou refatorar
  const saveItem = async (id) => {
    try {
      console.log(setIsLoading)
      setIsLoading(true);
      let payload = {
        bco: modalData.bco,
        ag: modalData.ag,
        dig_ag: modalData.dig_ag,
        conta: modalData.conta,
        dig_conta: modalData.dig_conta,
        nome: modalData.nome,
        bolsa: modalData.bolsa,
        vencimento: modalData.vencimento,
        cpf: modalData.cpf,
        local: modalData.local,
      };

      if (id) {
        await updateBolsista(`${id}`, payload);
      } else {
        await postBolsista(payload);
      }

      showToast("success", "Confirmed", "Bolsista salvo com sucesso");
      setOpenModalEdit(false);
      fetchData();
    } catch (error) {
      showToast("error", "Error", "Erro ao salvar bolsista " + error);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  // apaga os dados do modal
  const clearModal = () => {
    setModalData({});
  };

  return (
    <>
      {/* Modal to create/ edit a bolsista */}
      <Modal
        id="EditBolsista"
        title={modalData?.id ? "Atualizar Bolsista" : "Cadastrar Bolsista"}
        acept={() => {
          saveItem(modalData?.id || null);
        }}
        aceptLabel={"Salvar"}
        refuse={() => {
          setOpenModalEdit(false);
          clearModal();
        }}
        typeAction={"btn-primary"}
        open={openModalEdit}
        onClose={setOpenModalEdit}
      >
        <div id="bolsistaData">
          <div id="Data" className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {/* Nome */}
            <div className="mt-1 col-span-1 sm:col-span-2">
              <InputField
                id="Name"
                inputClass="w-full"
                label="Nome"
                value={modalData?.nome || ""}
                onChange={(e) => {
                  editableItem("nome", e.target.value);
                }}
                disabled={modalData?.id && scopo > 3 ? "disabled" : false}
              />
            </div>

            {/* CPF */}
            <div className="mt-1 col-span-1 sm:col-span-2">
              <InputField
                id="CPF"
                keyfilter="num"
                inputClass="w-full"
                label="CPF"
                value={modalData?.cpf || ""}
                onChange={(e) => {
                  editableItem("cpf", e.target.value);
                }}
                maxLength={11}
                disabled={modalData?.id && scopo > 3 ? "disabled" : false}
              />
            </div>

            {/* Local */}
            <div className="mt-1 col-span-1 sm:col-span-2">
              <InputField
                id="CPF"
                inputClass="w-full"
                label="Local"
                value={modalData?.local || ""}
                onChange={(e) => {
                  editableItem("local", e.target.value);
                }}
                disabled={modalData?.id && scopo > 3 ? "disabled" : false}
              />
            </div>

            {/* Banco */}
            <div className="mt-1 col-span-full">
              <InputField
                id="Banco"
                keyfilter="int"
                inputClass="w-full sm:w-50"
                label="Banco"
                value={modalData?.bco || ""}
                onChange={(e) => {
                  editableItem("bco", e.target.value);
                }}
                maxLength={3}
                disabled={modalData?.id && scopo > 3 ? "disabled" : false}
              />
            </div>

            {/* agencia */}
            <div className="mt-1 col-span-1">
              <div className="p-inputgroup">
                <InputField
                  id="Ag"
                  keyfilter="int"
                  inputClass="w-full sm:w-25"
                  label="Agência"
                  value={modalData?.ag || ""}
                  onChange={(e) => {
                    editableItem("ag", e.target.value);
                  }}
                  maxLength={4}
                  disabled={modalData?.id && scopo > 3 ? "disabled" : false}
                />

                <InputField
                  id="Dig_Ag"
                  keyfilter="int"
                  inputClass="w-10"
                  label="Dg"
                  value={modalData?.dig_ag || ""}
                  onChange={(e) => {
                    editableItem("dig_ag", e.target.value);
                  }}
                  maxLength={1}
                  disabled={modalData?.id && scopo < 3 ? "disabled" : false}
                />
              </div>
            </div>

            <div className="mt-1 col-span-1">
              <div className="p-inputgroup">
                <InputField
                  keyfilter="int"
                  id="Conta"
                  inputClass="w-full sm:w-25"
                  label="Conta"
                  value={modalData?.conta || ""}
                  onChange={(e) => {
                    editableItem("conta", e.target.value);
                  }}
                  maxLength={6}
                  disabled={modalData?.id && scopo > 3 ? "disabled" : false}
                />

                <InputField
                  keyfilter="int"
                  id="Dig_Conta"
                  inputClass="w-10"
                  label="Dg"
                  value={modalData?.dig_conta || ""}
                  onChange={(e) => {
                    editableItem("dig_conta", e.target.value);
                  }}
                  maxLength={1}
                  disabled={modalData?.id && scopo > 3 ? "disabled" : false}
                />
              </div>
            </div>

            {/* Bolsa */}
            <div className="mt-1 col-span-1">
              <div className="p-inputgroup">
                <InputField
                  keyfilter="money"
                  id="Bolsa"
                  inputClass="w-full"
                  label="Bolsa"
                  placeHolder={"R$ 0,00"}
                  value={modalData?.bolsa || ""}
                  onChange={(e) => {
                    editableItem("bolsa", e.target.value);
                  }}
                  disabled={modalData?.id && scopo > 3 ? "disabled" : false}
                />
              </div>
            </div>

            {/* Vencimento */}
            <div className="mt-1 col-span-1">
              <div className="p-inputgroup">
                <CalendarInput
                  label={"Vencimento"}
                  inputClass="w-full"
                  value={
                    modalData?.vencimento
                      ? new Date(
                          today.getFullYear(),
                          today.getMonth(),
                          modalData?.vencimento
                        )
                      : null
                  }
                  onChange={(e) => {
                    editableItem("vencimento", e.target.value.getDate());
                  }}
                  format={"dd"}
                  view="date"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

FT_Bolsista_Modal.propTypes = {
  modalData: PropTypes.shape({
    bco: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ag: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dig_ag: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    conta: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dig_conta: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nome: PropTypes.string,
    bolsa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vencimento: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cpf: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    local: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  setModalData: PropTypes.func.isRequired,
  openModalEdit: PropTypes.bool.isRequired,
  setOpenModalEdit: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  scopo: PropTypes.any.isRequired,
};

export default FT_Bolsista_Modal; // export default FT_Bolsista_Modal;  //
