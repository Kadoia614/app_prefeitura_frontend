import { useSportContext } from "@context/sport/SportContext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";

import InputField from "@/components/shared/input/inputfield/InputField";
import InputFieldMask from "@/components/shared/input/inputfield/InputFieldMask";

import Modal from "@/components/shared/modal/Modal";

import { useRef, useState } from "react";
import PropTypes from "prop-types";

const ModalAtleta = ({ isOpen, setIsOpen }) => {
  const { setAtletaTarget, atletaTarget, saveAtleta } = useSportContext();
  const [accept, setAccept] = useState(false);

  const stepperRef = useRef(null);

  const editableItem = (key, value) => {
    setAtletaTarget((e) => ({ ...e, [key]: value }));
  };

  const getCep = (cep) => {
    if (cep.length < 8) return;
    fetch(`https://viacep.com.br/ws/${cep}//json/`)
      .then((res) => res.json())
      .then((data) => {
        editableItem("cep", data.cep.replace(/\D/g, ""));
        editableItem("logradouro", data.logradouro);
        editableItem("bairro", data.bairro);
        editableItem("cidade", data.localidade);
        editableItem("uf", data.uf);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Confirmation = () => {
    return true;
  };

  return (
    <>
      {/* Modal to create/ edit a bolsista */}
      <Modal
        id="EditBolsista"
        title={atletaTarget?.id ? "Atualizar Bolsista" : "Cadastrar Bolsista"}
        isDisabled={!accept || !Confirmation()}
        onAcept={() => {
          saveAtleta();
          setIsOpen(false);
        }}
        aceptLabel={"Salvar"}
        onRefuse={() => {
          setIsOpen(false);
          setAtletaTarget({});
        }}
        typeAction={"btn-primary"}
        isOpen={isOpen}
        onClose={setIsOpen}
      >
        <Stepper ref={stepperRef} linear>
          <StepperPanel header="Bolsista">
            <div className="flex flex-column">
              <div className="p-4 flex-auto flex justify-content-center align-items-center">
                <div id="Data" className="grid grid-cols-5 gap-4 w-full">
                  {/* Nome */}
                  <div className="mt-1 col-span-full">
                    <InputField
                      invalid={atletaTarget?.name ? false : true}
                      id="Name"
                      inputClass="w-full"
                      label="Nome"
                      value={atletaTarget?.name || ""}
                      onChange={(e) => {
                        editableItem("name", e.target.value);
                      }}
                    />
                  </div>
                  <div className="mt-1 lg:col-span-3 col-span-full">
                    <InputField
                      invalid={atletaTarget?.birthday ? false : true}
                      id="Name"
                      inputClass="w-full"
                      label="Nascimento"
                      value={atletaTarget?.birthday || ""}
                      onChange={(e) => {
                        editableItem("birthday", e.target.value);
                      }}
                    />
                  </div>

                  {/* CPF */}
                  <div className="mt-1 lg:col-span-2 col-span-full">
                    <InputFieldMask
                      invalid={atletaTarget?.cpf ? false : true}
                      id="CPF"
                      keyfilter="num"
                      inputClass="w-full"
                      label="CPF"
                      mask={"999.999.999-99"}
                      value={atletaTarget?.cpf || ""}
                      onChange={(e) => {
                        editableItem("cpf", e.target.value);
                      }}
                      maxLength={11}
                    />
                  </div>
                  <div className="mt-1 lg:col-span-3 col-span-full">
                    <InputFieldMask
                      invalid={atletaTarget?.tel ? false : true}
                      id="Telefone"
                      inputClass="w-full"
                      label="Telefone"
                      mask={"(99)99999-9999"}
                      value={atletaTarget?.tel || ""}
                      onChange={(e) => {
                        editableItem("tel", e.target.value);
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div className="mt-1 col-span-full">
                    <InputField
                      invalid={atletaTarget?.email ? false : true}
                      id="Email"
                      inputClass="w-full"
                      label="Email"
                      value={atletaTarget?.email || ""}
                      onChange={(e) => {
                        editableItem("email", e.target.value);
                      }}
                    />
                  </div>

                  {/* address */}
                  <div className="col-span-full grid grid-cols-5 gap-2">
                    <div className="mt-1 col-span-full sm:flex flex-row">
                      <div className="mr-2">
                        <InputFieldMask
                          invalid={atletaTarget?.cep ? false : true}
                          mask="99.999-999"
                          maxLength={8}
                          placeholder="__.___-___"
                          id="CEP"
                          inputClass="w-33"
                          label="CEP"
                          value={atletaTarget?.cep || ""}
                          onChange={(e) => {
                            getCep(e.target.value.replace(/\D/g, ""));
                          }}
                        />
                      </div>
                      <div className="sm:ml-2">
                        <InputField
                          invalid={atletaTarget?.numero ? false : true}
                          placeHolder="99"
                          id="Number"
                          inputClass="w-50"
                          label="Número da residência"
                          value={atletaTarget?.numero || ""}
                          onChange={(e) => {
                            editableItem("numero", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <Divider className="col-span-full"></Divider>
                    <div className="mt-1 col-span-5 md:col-span-4 lg:col-span-3">
                      <InputField
                        id="Logradouro"
                        inputClass="w-full"
                        label="Logradouro"
                        value={atletaTarget?.logradouro || ""}
                        disabled
                      />
                    </div>
                    <div className="mt-1 col-span-5 md:col-span-3 lg:col-span-2">
                      <InputField
                        id="Bairro"
                        inputClass="w-full"
                        label="Bairro"
                        value={atletaTarget?.bairro || ""}
                        disabled
                      />
                    </div>
                    <div className="mt-1 col-span-4 md:col-span-3 lg:col-span-3">
                      <InputField
                        id="Cidade"
                        inputClass="w-full"
                        label="Cidade"
                        value={atletaTarget?.cidade || ""}
                        disabled
                      />
                    </div>
                    <div className="mt-1 col-span-2 md:col-span-2 lg:col-span-1">
                      <InputField
                        id="UF"
                        inputClass="w-full"
                        label="UF"
                        value={atletaTarget?.uf || ""}
                        disabled
                      />
                    </div>
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
          <StepperPanel header="Confirmação">
            <div className="flex flex-column h-12rem  w-full">
              <div className="font-medium w-full">
                <h2 className="text-2xl">Confirmação</h2>
                <Divider></Divider>
                <div className="flex gap-2 items-start mt-3 flex-col">
                  <span className="font-bold">Informações pessoais:</span>
                  <div>
                    <span className="font-bold">Nome:</span>
                    <p>{atletaTarget?.nome}</p>
                  </div>
                  <div>
                    <span className="font-bold">Nascimento:</span>
                    <p>{atletaTarget?.birthday}</p>
                  </div>
                  <div>
                    <span className="font-bold">CPF:</span>
                    <p>{atletaTarget?.cpf}</p>
                  </div>
                  <div>
                    <span className="font-bold">Telefone:</span>
                    <p>{atletaTarget?.telefone}</p>
                  </div>
                  <div>
                    <span className="font-bold">Email:</span>
                    <p>{atletaTarget?.email}</p>
                  </div>
                  <div>
                    <span className="font-bold">Endereço:</span>
                    <p>{atletaTarget?.cep}</p>
                    <p>{atletaTarget?.logradouro}</p>
                    <p>{atletaTarget?.numero}</p>
                    <p>{atletaTarget?.bairro}</p>
                    <p>{atletaTarget?.cidade}</p>
                    <p>{atletaTarget?.uf}</p>
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

export default ModalAtleta;

ModalAtleta.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
