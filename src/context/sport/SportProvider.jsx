import { SportContext } from "./SportContext";
import PropTypes from "prop-types";
import { useState } from "react";

const SportProvider = ({ children }) => {
  const [atleta, setAtleta] = useState([]);
  const [modalidade] = useState([]);
  const [atletaTarget, setAtletaTarget] = useState({
  });

  
  const saveAtleta = (atleta) => {  
    setAtleta(atleta);
  };

  const removeAtleta = () => {
    setAtleta((current) =>
      current.filter((item) => item.uuid !== atletaTarget.uuid),
    );
    setAtletaTarget({});
  };


  return (
    <SportContext.Provider
      value={{
        setAtletaTarget,
        atletaTarget,
        atleta,
        saveAtleta,
        removeAtleta,
        modalidade
      }}
    >
      {children}
    </SportContext.Provider>
  );
};

SportProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SportProvider;
