import { useState } from "react";
import { MotoristaContext } from "./MotoristaContext";

import { useToast } from "@/components/shared/toast/ToastProvider.jsx";

import PropTypes from "prop-types";

import { Motoristas } from "../../../service/reservas";
import { useLoadingContext } from "../../loading/LoadingContext";

export const MotoristaProvider = ({ children }) => {
  const { showToast } = useToast();
  let { attIsLoading } = useLoadingContext();

  let [motorista, setMotorista] = useState([]);
  let [target, setTarget] = useState({});
  let [total, setTotal] = useState(0);
  let [query, setQuery] = useState({
    page: 0,
    limit: 10,
    search: "",
  });

  const addMotorista = async () => {
    try {
      attIsLoading(true);      
      const data = await Motoristas.post(target);
      
      const newMotorista = await data.motorista;
      setMotorista((prev) => [...prev, newMotorista]);

      showToast("success", "Confirmado", "Motorista Cadastrado com sucesso");
      setTarget({});

      setTotal((prev) => prev + 1);
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao cadastrar motorista " + error.response?.data?.message || error,
      );
    }
    finally {
      attIsLoading(false);
    }
  };

  const removeMotorista = async (uuid) => {
    try {
      attIsLoading(true);
      const response = await Motoristas.delete(uuid);
      if( response.ok === true)
        showToast("success", "Confirmado", "Motorista Excluido com sucesso");
      setTotal(prev => prev - 1);
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao excluir motorista " + error.response?.data?.message || error
      )
    }
    finally {
      attIsLoading(false);
    }
  }

  const fetchMotorista = async () => {
    try {
      attIsLoading(true);
      const data = await Motoristas.getMotoristas(query);
      const motoristas = await data.motorista;
      const count = await data.count;

      setTotal(count);
      setMotorista(motoristas);

    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao cadastrar motorista " + error.response?.data?.message || error,
      );
    } finally {
      attIsLoading(false);
    }
  };

  return (
    <MotoristaContext.Provider
      value={{
        query,
        setQuery,
        motorista,
        fetchMotorista,
        addMotorista,
        removeMotorista,
        total
      }}
    >
      <>{children}</>
    </MotoristaContext.Provider>
  );
};

MotoristaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
