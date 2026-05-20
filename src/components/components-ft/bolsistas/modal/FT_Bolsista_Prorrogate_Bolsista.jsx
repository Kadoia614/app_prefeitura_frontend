import PropTypes from "prop-types";

import Modal from "@/components/shared/modal/Modal";
import { useEffect, useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useBolsistaContext } from "../../../../context/ft/bolsista/BolsistaContext";

const FT_Bolsista_Prorrogate_Bolsista = ({ isOpen, setIsOpen }) => {
  let { toExpire, prorrogate } = useBolsistaContext();

  const stepperRef = useRef(null);
  const [accept, setAccept] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [toProrrogate, setToProrrogate] = useState([]);

  useEffect(() => {
    if (selectAll) {
      setToProrrogate(toExpire.bolsistas);
    } else {
      setToProrrogate([]);
    }
  }, [selectAll]);

  return (
    <>
      {/* Modal to create/ edit a bolsista */}
      {console.log(toExpire)}
      <Modal
        id="ProrrogateBolsistaModal"
        title={"Prorrogar Bolsistas"}
        isDisabled={!accept}
        onAcept={() => {
          prorrogate(toProrrogate);
          setIsOpen(false);
        }}
        aceptLabel={"Salvar"}
        onRefuse={() => {
          setIsOpen(false);
          // clearModal();
        }}
        typeAction={"btn-primary"}
        isOpen={isOpen}
        onClose={setIsOpen}
      >
        <Stepper ref={stepperRef} linear>
          <StepperPanel header="Bolsista">
            <div className="flex flex-col justify-end gap-4 mt-4">
              <h5 className="font-bold">
                {
                  "Os seguintes bolsistas estão prestes a expirar, selecione quais deseja prorrogar."
                }
              </h5>
              <div className="flex flex-col gap-2 bg-accent p-2">
                <div className="flex flex-row gap-2 p-2">
                  <Checkbox
                    name="SelecionarTodos"
                    inputId={`prorrogateAll`}
                    checked={selectAll}
                    onChange={(e) =>
                      e.target.checked
                        ? setSelectAll(true)
                        : setSelectAll(false)
                    }
                  />
                  <label htmlFor={`prorrogateAll`} className="font-bold">
                    Selecionar Todos
                  </label>
                </div>
                {toExpire.bolsistas.map((b, index) => (
                  <>
                    <div
                      key={index}
                      className="flex gap-2 bg-secondary p-2 rounded-md"
                    >
                      <Checkbox
                        name="Selecionar"
                        inputId={`prorrogate-${index}`}
                        checked={toProrrogate.includes(b)}
                        onChange={(e) =>
                          e.target.checked
                            ? setToProrrogate([...toProrrogate, b])
                            : setToProrrogate(
                                toProrrogate.filter((e) => e.id !== b.id)
                              )
                        }
                      />
                      <div className="flex flex-row gap-2">
                        <label htmlFor={`prorrogate-${index}`}>{b.nome}</label>
                        <label
                          className="text-nowrap text-ellipsis width-100 overflow-hidden"
                          htmlFor={`prorrogate-${index}`}
                          title={b.edital[0].name}
                        >
                          {b.edital[0].name}
                        </label>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <Button
                label="Next"
                className={"btn-primary max-w-[50%]"}
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>
          <StepperPanel header="Confirmação">
            <div className="flex flex-col justify-start gap-4 mt-4">
              <h3 className="font-bold">
                Os seguintes bolsistas serão prorrogados:
              </h3>

              <div className="flex flex-col gap-2 bg-secondary p-2 rounded-md">
                {toProrrogate.map((b, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex flex-row gap-2">
                      <label htmlFor={`prorrogate-${index}`}>{b.nome}</label>
                      <label
                        className="text-nowrap text-ellipsis overflow-hidden"
                        htmlFor={`prorrogate-${index}`}
                        title={b.edital[0].name}
                      >
                        {b.edital[0].name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Checkbox
                  name="accept"
                  inputId="accept"
                  checked={accept}
                  onChange={(e) => setAccept(e.target.checked)}
                />
                <label htmlFor="accept" className="font-bold">
                  Eu li e estou ciente das regras de prorrogação
                </label>
              </div>
              <Button
                label="Back"
                className="btn-cancel max-w-[50%]"
                onClick={() => {
                  stepperRef.current.prevCallback();
                  setAccept(false);
                }}
              />
            </div>
          </StepperPanel>
        </Stepper>
      </Modal>
    </>
  );
};

FT_Bolsista_Prorrogate_Bolsista.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default FT_Bolsista_Prorrogate_Bolsista;
