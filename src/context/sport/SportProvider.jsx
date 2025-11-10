import { SportContext } from "./SportContext";
import PropTypes from "prop-types";
import { useToast } from "../../components/shared/toast/ToastProvider";
import { useLoadingContext } from "../loading/LoadingContext";
import { useState } from "react";

const SportProvider = ({ children }) => {
  let { showToast } = useToast();
  let { attIsLoading } = useLoadingContext();

  const [atleta, setAtleta] = useState([]);
  const [modalidade, setModalidade] = useState([]);
  const [atletaTarget, setAtletaTarget] = useState({
  });

  
  const saveAtleta = (atleta) => {  
    setAtleta(atleta);
  };

  const removeAtleta = () => {
    setAtleta(e=>[e.filter((item) => item.uuid !== atletaTarget.uuid)]);
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