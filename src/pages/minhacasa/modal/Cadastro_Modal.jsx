import PropTypes from "prop-types";

import Modal from "@/components/shared/modal/Modal";
import { useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";

// import CalendarInput from "@/components/shared/input/CalendarInput";

import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";
import InputField from "../../../components/shared/input/inputfield/InputField";
import { useMinhaCasaContext } from "../../../context/minhacasa/MinhaCasaContext";
import CalendarInput from "../../../components/shared/input/CalendarInput";

const Cadastro_Modal = ({ setOpenModalEdit, openModalEdit }) => {
  const { target, setTarget, addCadastro, attCadastro } = useMinhaCasaContext();

  const stepperRef = useRef(null);
  const [accept, setAccept] = useState(false);
  // sómente para gerenciar os valore dos inputs
  const editableItem = (key, value) => {
    const keys = key.split(".");
    setTarget((prev) => {
      let updated = { ...prev };
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  // merma coisa, somente para as demandas do próprio user que ele vai poder dar esse save / update, não faz sentido estar totalmente aqui, vou refatorar

  // apaga os dados do modal
  const clearModal = () => {
    setTarget({});
  };

  const verificarCPF = (cpf) => {
    const formatedCPF = cpf.replace(/\D/g, "").padStart(11, "0");

    console.log(formatedCPF);
  };

  const getCep = (cep) => {
    if (cep.length < 8) return;
    fetch(`https://viacep.com.br/ws/${cep}//json/`)
      .then((res) => res.json())
      .then((data) => {
        editableItem("cep", data.cep.replace(/\D/g, ""));
        editableItem("moradia.logradouro", data.logradouro);
        editableItem("moradia.bairro", data.bairro);
        editableItem("moradia.cidade", data.localidade);
        editableItem("moradia.uf", data.uf);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveItem = () => {
    if (target.uuid) {
      attCadastro(target);
    } else {
      addCadastro(target);
    }
  };

  return (
    <>
      {/* Modal to create/ edit a bolsista */}
      <Modal
        id="EditCadastroModal"
        title={target.uuid ? "Atualizar cadastro" : "Novo cadastro"}
        isDisabled={!accept}
        onAcept={() => {
          saveItem(target?.id || null);
          setOpenModalEdit(false);
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
          <StepperPanel header="1°Responsável">
            <div className="flex flex-col">
              <div className="flex flex-row gap-2 flex-wrap">
                <fieldset>
                  <Checkbox
                    inputId="CpfResponsavel1"
                    name="func_publico"
                    value={target.responsavel1?.func_publico}
                    fieldClass={"w-12/12"}
                    checked={target.responsavel1?.func_publico}
                    onChange={(e) =>
                      editableItem(
                        "responsavel1.func_publico",
                        e.target.checked,
                      )
                    }
                  ></Checkbox>
                  <label htmlFor="ingredient1" className="ml-2">
                    Funcionario público
                  </label>
                </fieldset>
              </div>
              <Divider></Divider>
              <div className="flex flex-row gap-2 flex-wrap">
                <InputField
                  id="CpfResponsavel1"
                  value={target.responsavel1?.cpf}
                  fieldClass={"max-w-40"}
                  onFocusOff={(e) => verificarCPF(e.target.value)}
                  onChange={(e) =>
                    editableItem("responsavel1.cpf", e.target.value)
                  }
                  maxLength={14}
                  label="CPF"
                ></InputField>

                <InputField
                  id="NomeResponsavel1"
                  value={target.responsavel1?.nome}
                  onChange={(e) =>
                    editableItem("responsavel1.nome", e.target.value)
                  }
                  label="Nome"
                ></InputField>

                <CalendarInput
                  id="NascimentoResponsavel1"
                  value={target.responsavel1?.nascimento}
                  fieldClass={"w-12/12"}
                  onChange={(e) =>
                    editableItem("responsavel1.nascimento", e.target.value)
                  }
                  view="date"
                  label="Nascimento"
                >
                  <span className="font-bold">
                    Idade:
                    {target.responsavel1?.nascimento
                      ? new Date().getFullYear() -
                        new Date(target.responsavel1.nascimento).getFullYear()
                      : ""}
                  </span>
                </CalendarInput>
              </div>

              <Divider></Divider>

              <div className="flex flex-row gap-2 flex-wrap">
                <InputField
                  id="TelefoneResponsavel1"
                  value={target.responsavel1?.telefone}
                  fieldClass={"w-12/12 sm:w-7/12"}
                  onChange={(e) =>
                    editableItem("responsavel1.telefone", e.target.value)
                  }
                  label="Telefone"
                ></InputField>

                <InputField
                  id="EmailResponsavel1"
                  value={target.responsavel1?.email}
                  fieldClass={"w-12/12"}
                  onChange={(e) =>
                    editableItem("responsavel1.email", e.target.value)
                  }
                  label="Email"
                ></InputField>
              </div>
              <Divider></Divider>
              <div className="flex flex-row flex-wrap">
                <InputField
                  id="OcupacaoResponsavel1"
                  value={target.responsavel1?.ocupacao}
                  fieldClass={"w-12/12 sm:w-6/12"}
                  onChange={(e) =>
                    editableItem("responsavel1.ocupacao", e.target.value)
                  }
                  maxLength={14}
                  label="Ocupação"
                ></InputField>
                <InputField
                  id="RendaResponsavel1"
                  value={target.responsavel1?.renda}
                  fieldClass={"w-12/12 sm:w-6/12 sm:pl-2"}
                  onChange={(e) =>
                    editableItem("responsavel1.renda", e.target.value)
                  }
                  label="Renda"
                ></InputField>
                <InputField
                  id="LocalTrabalhoResponsavel1"
                  value={target.responsavel1?.local_trabalho}
                  fieldClass={"w-12/12"}
                  onChange={(e) =>
                    editableItem("responsavel1.local_trabalho", e.target.value)
                  }
                  label="Local de trabalho"
                ></InputField>
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
          <StepperPanel header="2° Responsavel">
            <div className="flex flex-col">
              <div className="flex flex-row gap-2 flex-wrap">
                <fieldset>
                  <Checkbox
                    inputId="CpfResponsavel2"
                    name="func_publico"
                    value={target.responsavel2?.func_publico}
                    fieldClass={"w-12/12"}
                    checked={target.responsavel2?.func_publico}
                    onChange={(e) =>
                      editableItem(
                        "responsavel2.func_publico",
                        e.target.checked,
                      )
                    }
                  ></Checkbox>
                  <label htmlFor="ingredient1" className="ml-2">
                    Funcionario público
                  </label>
                </fieldset>
              </div>
              <Divider></Divider>
              <div className="flex flex-row gap-2 flex-wrap">
                <InputField
                  id="CpfResponsavel2"
                  value={target.responsavel2?.cpf}
                  fieldClass={"max-w-40"}
                  onFocusOff={(e) => verificarCPF(e.target.value)}
                  onChange={(e) =>
                    editableItem("responsavel2.cpf", e.target.value)
                  }
                  maxLength={14}
                  label="CPF"
                ></InputField>

                <InputField
                  id="NomeResponsavel2"
                  value={target.responsavel2?.nome}
                  onChange={(e) =>
                    editableItem("responsavel2.nome", e.target.value)
                  }
                  label="Nome"
                ></InputField>

                <CalendarInput
                  id="NascimentoResponsavel2"
                  value={target.responsavel2?.nascimento}
                  fieldClass={"w-12/12"}
                  onChange={(e) =>
                    editableItem("responsavel2.nascimento", e.target.value)
                  }
                  view="date"
                  label="Nascimento"
                >
                  <span className="font-bold">
                    Idade:
                    {target.responsavel2?.nascimento
                      ? new Date().getFullYear() -
                        new Date(target.responsavel2.nascimento).getFullYear()
                      : ""}
                  </span>
                </CalendarInput>
              </div>

              <Divider></Divider>

              <div className="flex flex-row gap-2 flex-wrap">
                <InputField
                  id="TelefoneResponsavel2"
                  value={target.responsavel2?.telefone}
                  fieldClass={"w-12/12 sm:w-7/12"}
                  onChange={(e) =>
                    editableItem("responsavel2.telefone", e.target.value)
                  }
                  label="Telefone"
                ></InputField>

                <InputField
                  id="EmailResponsavel2"
                  value={target.responsavel2?.email}
                  fieldClass={"w-12/12"}
                  onChange={(e) =>
                    editableItem("responsavel2.email", e.target.value)
                  }
                  label="Email"
                ></InputField>
              </div>
              <Divider></Divider>
              <div className="flex flex-row flex-wrap">
                <InputField
                  id="OcupacaoResponsavel2"
                  value={target.responsavel2?.ocupacao}
                  fieldClass={"w-12/12 sm:w-6/12"}
                  onChange={(e) =>
                    editableItem("responsavel2.ocupacao", e.target.value)
                  }
                  maxLength={14}
                  label="Ocupação"
                ></InputField>
                <InputField
                  id="RendaResponsavel2"
                  value={target.responsavel2?.renda}
                  fieldClass={"w-12/12 sm:w-6/12 sm:pl-2"}
                  onChange={(e) =>
                    editableItem("responsavel2.renda", e.target.value)
                  }
                  label="Renda"
                ></InputField>
                <InputField
                  id="LocalTrabalhoResponsavel2"
                  value={target.responsavel2?.local_trabalho}
                  fieldClass={"w-12/12"}
                  onChange={(e) =>
                    editableItem("responsavel2.local_trabalho", e.target.value)
                  }
                  label="Local de trabalho"
                ></InputField>
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
          <StepperPanel header="Imóvel">
            <div className="flex flex-col">
              <div className="flex flex-row flex-wrap">
                <InputField
                  id="CepMoradia"
                  value={target.moradia?.cep}
                  fieldClass={"w-40"}
                  onChange={(e) => editableItem("moradia.cep", e.target.value)}
                  onFocusOff={(e) => getCep(e.target.value)}
                  label="Cep"
                ></InputField>
              </div>
              <Divider></Divider>
              <div className="flex flex-row flex-wrap">
                <InputField
                  id="ComplementoMoradia"
                  value={target.moradia?.complemento}
                  fieldClass={"w-12/12 sm:w-9/12"}
                  onChange={(e) =>
                    editableItem("moradia.complemento", e.target.value)
                  }
                  label="Complemento"
                ></InputField>

                <InputField
                  id="NumeroMoradia"
                  value={target.moradia?.numero}
                  fieldClass={"w-6/12 sm:w-3/12 sm:pl-2"}
                  onChange={(e) =>
                    editableItem("moradia.numero", e.target.value)
                  }
                  label="N°"
                ></InputField>

                <InputField
                  id="LogradouroMoradia"
                  value={target.moradia?.logradouro}
                  fieldClass={"w-12/12"}
                  disabled
                  label="Logradouro"
                ></InputField>

                <InputField
                  id="BairroMoradia"
                  value={target.moradia?.bairro}
                  fieldClass={"w-12/12"}
                  disabled
                  label="Bairro"
                ></InputField>

                <InputField
                  id="CidadeMoradia"
                  value={target.moradia?.cidade}
                  fieldClass={"w-8/12"}
                  disabled
                  label="Cidade"
                ></InputField>

                <InputField
                  id="UfMoradia"
                  value={target.moradia?.uf}
                  fieldClass={"w-4/12 sm:w-2/12 pl-2"}
                  disabled
                  label="UF"
                ></InputField>
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
          <StepperPanel header="Chek-in">
            <div className="flex flex-column h-12rem  w-full">
              <div className="font-medium w-full">
                <h2 className="text-2xl">Confirmação</h2>
                <Divider></Divider>

                <div className="flex flex-col bg-background-muted p-4 rounded-md">
                  <div>
                    <h3 className="text-lg font-bold">1° Responsável</h3>
                    <div className="flex flex-col gap-2 rounded-md bg-background p-4">
                      <div><span className="font-bold">
                          Funcionário Público:
                        </span> <p className="text-text-secondary"> {target.responsavel1?.func_publico ? "Sim" : "Não"}</p></div>
                      <div><span className="font-bold"></span><p className="text-text-secondary"></p></div>
                      <div><span className="font-bold"></span><p className="text-text-secondary"></p></div>
                      <div><span className="font-bold"></span><p className="text-text-secondary"></p></div>
                      <div><span className="font-bold"></span><p className="text-text-secondary"></p></div>
                      <div><span className="font-bold"></span><p className="text-text-secondary"></p></div>
                      <div><span className="font-bold"></span><p className="text-text-secondary"></p></div>
                      <div><span className="font-bold"></span><p className="text-text-secondary"></p></div>
                      <div><span className="font-bold"></span><p className="text-text-secondary"></p></div>
                      <div><span className="font-bold"></span><p className="text-text-secondary"></p></div>
                      <div><span className="font-bold"></span><p className="text-text-secondary"></p></div>                      
                    </div>
                  </div>
                  <Divider></Divider>
                  <div>
                    <h3 className="text-md font-bold">2° Responsável</h3>
                  </div>
                  <Divider></Divider>

                  <div>
                    <h3 className="text-md font-bold">Imóvel</h3>
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

Cadastro_Modal.propTypes = {
  openModalEdit: PropTypes.bool.isRequired,
  setOpenModalEdit: PropTypes.func.isRequired,
};

export default Cadastro_Modal;
