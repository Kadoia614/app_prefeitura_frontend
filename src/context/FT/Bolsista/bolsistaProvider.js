import { useState } from "react";
import { BolsistaContext } from "./bolsistaContext";

const BolsistaProvider = (children) => {
  const [bolsista, setBolsista] = useState(null);

  const getBolsista = (value) => {
    setBolsista(value);
  };

  const removeBolsista = (id) => {
    setBolsista(bolsista.filter((item) => item.id !== id));
  };

  const adcBolsista = (value) => {
    setBolsista([...bolsista, value]);
  };

  const attBolsista = (value) => {
    setBolsista(
      bolsista.map((item) => (item.id === value.id ? (item = value) : item))
    );
  };

  return (
    <BolsistaContext.Provider
      value={{
        bolsista,
        getBolsista,
        removeBolsista,
        adcBolsista,
        attBolsista,
      }}
    >
      {children}
    </BolsistaContext.Provider>
  );
};

export default BolsistaProvider;
