import PropTypes from "prop-types";
import { postBolsista, updateBolsista } from "@/service/ft_appServices";

import Modal from "@/components/shared/modal/Modal";
import { useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";

import InputField from "@/components/shared/input/inputfield/InputField";
import InputFieldMask from "@/components/shared/input/inputfield/InputFieldMask";
import SelectField from "@/components/shared/input/SelectField";
// import CalendarInput from "@/components/shared/input/CalendarInput";

import { useToast } from "@/components/shared/toast/ToastProvider.jsx";
import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";

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
  const [accept, setAccept] = useState(false);
  // sómente para gerenciar os valore dos inputs
  const editableItem = (key, value) => {
    setModalData((e) => ({ ...e, [key]: value }));
  };
  const editablePayment = (key, value) => {
    setModalData((e) => ({
      ...e,
      payment_info: { ...e.payment_info, [key]: value },
    }));
  };

  // merma coisa, somente para as demandas do próprio user que ele vai poder dar esse save / update, não faz sentido estar totalmente aqui, vou refatorar
  const saveItem = async (id) => {
    try {
      setIsLoading(true);
      let payload = {
        bolsista: {
          nome: modalData.nome,
          cpf: modalData.cpf.split(".").join("").split("-").join(""),
          local: modalData.local,
          payment_info: {
            bco: modalData.payment_info.bco,
            ag: modalData.payment_info.ag,
            dig_ag: modalData.payment_info.dig_ag,
            conta: modalData.payment_info.conta,
            dig_conta: modalData.payment_info.dig_conta,
            pagador_id: modalData.payment_info.pagador_id,
          },
        },
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
      <Modal
        id="EditBolsista"
        title={modalData?.id ? "Atualizar Bolsista" : "Cadastrar Bolsista"}
        isDisabled={!accept}
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
                        editablePayment("pagador_id", e.target.value);
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
                          {modalData?.payment_info?.pagador_id &&
                            `${
                              pagadorOptions.find(
                                (pg) =>
                                  pg.id == modalData.payment_info?.pagador_id
                              ).quantity
                            } / ${
                              pagadorOptions.find(
                                (pg) =>
                                  pg.id === modalData.payment_info?.pagador_id
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
                        editablePayment("bco", e.target.value);
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
                          editablePayment("ag", e.target.value);
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
                          editablePayment("dig_ag", e.target.value);
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
                          editablePayment("conta", e.target.value);
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
                          editablePayment("dig_conta", e.target.value);
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
            <div className="flex flex-column h-12rem  w-full">
              <div className="font-medium w-full">
                <h2 className="text-2xl">Confirmação</h2>
                <Divider></Divider>
                <div className="flex gap-2 items-start mt-3 flex-col">
                  <div>
                    <span className="font-bold">Nome:</span>
                    <p>{modalData?.nome}</p>
                  </div>
                  <div>
                    <span className="font-bold">CPF:</span>
                    <p>{modalData?.cpf}</p>
                  </div>
                  <div>
                    <span className="font-bold">Local de Trabalho:</span>
                    <p>{modalData?.local}</p>
                  </div>
                  <div className="flex gap-2 items-start mt-3 flex-col">
                    <span className="font-bold">Informações de pagamento:</span>
                    <div>
                      <span className="font-bold">Pagador:</span>
                      <p>
                        {
                          pagadorOptions.find(
                            (pg) => pg.id == modalData.payment_info?.pagador_id
                          )?.name
                        }
                      </p>
                    </div>
                    <div>
                      <span className="font-bold">Banco:</span>
                      <p>{modalData.payment_info?.bco}</p>
                    </div>
                    <div>
                      <span className="font-bold">Agencia:</span>
                      <p>{modalData.payment_info?.ag}</p>
                    </div>
                    <div>
                      <span className="font-bold">Dígito Agencia:</span>
                      <p>{modalData.payment_info?.dig_ag}</p>
                    </div>
                    <div>
                      <span className="font-bold">Conta:</span>
                      <p>{modalData.payment_info?.conta}</p>
                    </div>
                    <div>
                      <span className="font-bold">Digito Conta:</span>
                      <p>{modalData.payment_info?.dig_conta}</p>
                    </div>
                  </div>
                </div>
                <Divider></Divider>
                <div>
                  <Checkbox
                    inputId="Accept"
                    name="confirm_data"
                    value={false}
                    onChange={(e) => {
                      setAccept(e.checked);
                    }}
                    checked={accept}
                  ></Checkbox>
                  <label htmlFor="Accept" className="ml-2">
                    Confirmar Dados
                  </label>
                </div>
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
    payment_info: PropTypes.shape({
      bco: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ag: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      dig_ag: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      conta: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      dig_conta: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      pagador_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    nome: PropTypes.string,
    bolsa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vencimento: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cpf: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    local: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  pagadorOptions: PropTypes.arrayOf(PropTypes.any),
  setModalData: PropTypes.func.isRequired,
  openModalEdit: PropTypes.bool.isRequired,
  setOpenModalEdit: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default FT_Bolsista_Modal;
