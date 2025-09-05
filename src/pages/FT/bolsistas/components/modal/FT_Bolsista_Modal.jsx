import PropTypes from "prop-types";
import { postBolsista, updateBolsista } from "@/service/ft_appServices";

import Modal from "@/components/shared/modal/Modal";
import { useRef } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";

import InputField from "@/components/shared/input/inputfield/InputField";
import InputFieldMask from "@/components/shared/input/inputfield/InputFieldMask";
import SelectField from "@/components/shared/input/SelectField";
// import CalendarInput from "@/components/shared/input/CalendarInput";

import { useToast } from "@/components/shared/toast/ToastProvider.jsx";

const FT_Bolsista_Modal = ({
  modalData,
  setModalData,
  openModalEdit,
  setOpenModalEdit,
  fetchData,
  setIsLoading,
  pagadorOptions,
}) => {
  const { showToast } = useToast();
  const stepperRef = useRef(null);
  // sómente para gerenciar os valore dos inputs
  const editableItem = (key, value) => {
    setModalData((e) => ({ ...e, [key]: value }));
  };

  // merma coisa, somente para as demandas do próprio user que ele vai poder dar esse save / update, não faz sentido estar totalmente aqui, vou refatorar
  const saveItem = async (id) => {
    try {
      setIsLoading(true);
      let payload = {
        bco: modalData.bco,
        ag: modalData.ag,
        dig_ag: modalData.dig_ag,
        conta: modalData.conta,
        dig_conta: modalData.dig_conta,
        pagador: modalData.pagador,
        nome: modalData.nome,
        bolsa: modalData.bolsa,
        data_inicio: modalData.data_inicio,
        cpf: modalData.cpf.split(".").join("").split("-").join(""),
        local: modalData.local,
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
      showToast(
        "error",
        "Error",
        "Erro ao salvar bolsista " + error.response.data.message
      );
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
      {console.log(pagadorOptions)}
      <Modal
        id="EditBolsista"
        title={modalData?.id ? "Atualizar Bolsista" : "Cadastrar Bolsista"}
        onAcept={() => {
          saveItem(modalData?.id || null);
        }}
        aceptLabel={"Salvar"}
        onRefuse={() => {
          setOpenModalEdit(false);
          clearModal();
        }}
        typeAction={"btn-primary"}
        isOpen={openModalEdit}
        onClose={setOpenModalEdit}
      >
        <Stepper ref={stepperRef} linear>
          <StepperPanel header="Bolsista">
            <div className="flex flex-column">
              <div className="p-4 flex-auto flex justify-content-center align-items-center">
                <div id="Data" className="grid grid-cols-5 gap-4 w-full">
                  {/* Nome */}
                  <div className="mt-1 lg:col-span-3 col-span-full">
                    <InputField
                      invalid={modalData?.nome ? false : true}
                      id="Name"
                      inputClass="w-full"
                      label="Nome"
                      value={modalData?.nome || ""}
                      onChange={(e) => {
                        editableItem("nome", e.target.value);
                      }}
                    />
                  </div>

                  {/* CPF */}
                  <div className="mt-1 lg:col-span-2 col-span-full">
                    <InputFieldMask
                      invalid={modalData?.cpf ? false : true}
                      id="CPF"
                      keyfilter="num"
                      inputClass="w-full"
                      label="CPF"
                      mask={"999.999.999-99"}
                      value={modalData?.cpf || ""}
                      onChange={(e) => {
                        editableItem("cpf", e.target.value);
                      }}
                      maxLength={11}
                    />
                  </div>

                  {/* Local */}
                  <div className="mt-1 col-span-full">
                    <InputField
                      invalid={modalData?.local ? false : true}
                      id="Local"
                      inputClass="w-full"
                      label="Local"
                      value={modalData?.local || ""}
                      onChange={(e) => {
                        editableItem("local", e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                label="Next"
                className={"btn-primary max-w-[50%]"}
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>
          <StepperPanel header="Dados de Pagamento">
            <div className="flex flex-column">
              <div className="p-4 flex-auto flex justify-content-center align-items-center">
                <div id="Data" className="grid md:grid-cols-6 gap-4  w-full">
                  {/* Local Pagador */}
                  <div className="mt-1 col-span-3">
                    <SelectField
                      invalid={
                        modalData?.payment_info?.pagador_id ? false : true
                      }
                      id="Pagador"
                      inputClass="w-full"
                      label="Pagador"
                      options={pagadorOptions}
                      value={modalData?.payment_info?.pagador_id || ""}
                      onChange={(e) => {
                        editableItem("pagador_id", e.target.value);
                      }}
                    />
                  </div>
                  <div className="mt-1 col-span-3">
                    <fieldset className="mt-2">
                      <label className="font-bold text-gray-700">
                        Quantidade ativos
                      </label>
                      <div className="mt-1">
                        <p>
                          {modalData?.pagador &&
                            `${
                              pagadorOptions.find(
                                (pg) => pg.id === modalData.pagador
                              ).quantity
                            } / ${
                              pagadorOptions.find(
                                (pg) => pg.id === modalData.pagador
                              ).max_bolsista
                            }`}
                        </p>
                      </div>
                    </fieldset>
                  </div>
                  {/* Banco */}
                  <div className="mt-1 col-span-full">
                    <InputField
                      invalid={modalData?.payment_info?.bco ? false : true}
                      id="Banco"
                      keyfilter="int"
                      inputClass="w-full sm:w-50"
                      label="Banco"
                      value={modalData?.payment_info?.bco || ""}
                      onChange={(e) => {
                        editableItem("bco", e.target.value);
                      }}
                      maxLength={3}
                    />
                  </div>
                  {/* agencia */}
                  <div className="mt-1 lg:col-span-3 col-span-full">
                    <div className="p-inputgroup">
                      <InputField
                        id="Ag"
                        invalid={modalData?.payment_info?.ag ? false : true}
                        keyfilter="int"
                        inputClass="w-full sm:w-33 mr-2"
                        label="Agência"
                        value={modalData?.payment_info?.ag || ""}
                        onChange={(e) => {
                          editableItem("ag", e.target.value);
                        }}
                        maxLength={4}
                      />

                      <InputField
                        invalid={modalData?.payment_info?.dig_ag ? false : true}
                        id="Dig_Ag"
                        keyfilter="int"
                        inputClass="w-full"
                        label="Dg"
                        value={modalData?.payment_info?.dig_ag || ""}
                        onChange={(e) => {
                          editableItem("dig_ag", e.target.value);
                        }}
                        maxLength={1}
                      />
                    </div>
                  </div>
                  <div className="mt-1 lg:col-span-3 col-span-full">
                    <div className="p-inputgroup">
                      <InputField
                        invalid={modalData?.payment_info?.conta ? false : true}
                        keyfilter="int"
                        id="Conta"
                        inputClass="w-full sm:w-33 mr-2"
                        label="Conta"
                        value={modalData?.payment_info?.conta || ""}
                        onChange={(e) => {
                          editableItem("conta", e.target.value);
                        }}
                        maxLength={11}
                      />

                      <InputField
                        invalid={
                          modalData?.payment_info?.dig_conta ? false : true
                        }
                        keyfilter="int"
                        id="Dig_Conta"
                        inputClass="w-full"
                        label="Dg"
                        value={modalData?.payment_info?.dig_conta || ""}
                        onChange={(e) => {
                          editableItem("dig_conta", e.target.value);
                        }}
                        maxLength={1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                label="Back"
                className="btn-cancel max-w-[50%]"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                label="Next"
                className={"btn-primary max-w-[50%]"}
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>
          <StepperPanel header="Confirmação">
            <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                Confirmação
              </div>
            </div>
            <div className="flex justify-start gap-2 mt-4">
              <Button
                label="Back"
                className="btn-cancel max-w-[50%]"
                onClick={() => stepperRef.current.prevCallback()}
              />
            </div>
          </StepperPanel>
        </Stepper>
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
    pagador: PropTypes.any,
    data_inicio: PropTypes.string,
  }),
  pagadorOptions: PropTypes.arrayOf(PropTypes.any),
  setModalData: PropTypes.func.isRequired,
  openModalEdit: PropTypes.bool.isRequired,
  setOpenModalEdit: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default FT_Bolsista_Modal;
