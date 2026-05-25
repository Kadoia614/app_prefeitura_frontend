import { useState } from "react";
import StepperComponent from "../components/shared/StepperComponent";

const TelaTeste = () => {
    const [isAccepted, setIsAccepted] = useState(false);

    return(
    <StepperComponent confirm isAccepted={isAccepted} setIsAccepted={setIsAccepted}>Teste</StepperComponent>)
};

export default TelaTeste;