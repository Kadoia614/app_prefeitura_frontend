import { useRef } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";

import PropTypes from "prop-types";

export default function StepperComponent({ confirm, children, isAccepted, setIsAccepted, ...props }) {
  const stepperRef = useRef(null);

  const data = [
    {
      title: "teste",
      subtitle: "teste2",
      children: <h1 className="text-xl">TesteOkay</h1>,
    },
    {
      title: "teste",
      subtitle: "teste2",
      children: <h1 className="text-xl">TesteOkay</h1>,
    },
    {
      title: "teste",
      subtitle: "teste2",
      children: <h1 className="text-xl">TesteOkay</h1>,
    },
  ];

  return (
    <div className="flex justify-content-center">
      <Stepper ref={stepperRef} linear {...props}>
        {data.map((item, index) => (
          <StepperPanel header={item.title} key={index}>
            {item.subtitle && (
              <div className="flex flex-column h-12rem  w-full">
                <div className="font-medium w-full">
                  <h2 className="text-2xl">{item.subtitle}</h2>
                  <Divider></Divider>
                  <div className="flex gap-2 items-start mt-3 flex-col"></div>
                </div>
              </div>
            )}

            <div className="flex flex-column">{item.children}</div>

            <div
              className={`flex ${index === data.length - (confirm ? 0 : 1) ? "justify-start" : index === 0 ? "justify-end" : "justify-between"} gap-2 mt-4`}
            >
              {index !== 0 && (
                <Button
                  label="Voltar"
                  className="btn-cancel max-w-[50%]"
                  onClick={() => stepperRef.current.prevCallback()}
                />
              )}
              {index !== data.length - (confirm ? 0 : 1) && (
                <Button
                  label="Avançar"
                  className="btn-primary max-w-[50%]"
                  onClick={() => stepperRef.current.nextCallback()}
                />
              )}
            </div>
          </StepperPanel>
        ))}

        {confirm && (
          <StepperPanel header="Confirmação">
            <div className="flex flex-column h-12rem  w-full">
              <div className="font-medium w-full">
                <h2 className="text-2xl">Confirmação</h2>
                <Divider></Divider>
                <div className="flex gap-2 items-start mt-3 flex-col">
                    {children}
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
                  setIsAccepted(e.checked);
                }}
                checked={isAccepted}
              ></Checkbox>
              <label htmlFor="Accept" className="ml-2">
                Confirmar Operação
              </label>
            </div>
            <div className="flex justify-start gap-2 mt-4">
              <Button
                label="voltar"
                className="btn-cancel max-w-[50%]"
                onClick={() => {
                  stepperRef.current.prevCallback();
                  setIsAccepted(false);
                }}
              />
            </div>
          </StepperPanel>
        )}
      </Stepper>
      <div></div>
    </div>
  );
}

StepperComponent.propTypes ={
  confirm: PropTypes.bool,
  children: PropTypes.node,
  isAccepted: PropTypes.bool,
  setIsAccepted: PropTypes.func
}
