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
  let [panel, setPanel] = useState({});
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
    } finally {
      attIsLoading(false);
    }
  };

  const updateMotorista = async () => {
    try {
      const response = await Motoristas.update(target.uuid, target);

      setMotorista((prev) => {
        return prev.map((item) => {
          if (item.uuid === response.motorista.uuid) {
            return response.motorista;
          }
          return item;
        });
      });
      showToast("success", "Confirmado", "Motorista Atualizado com sucesso");

      setTarget({});
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao atualizar motorista " + error.response?.data?.message || error,
      );
    }
  };

  const salvarMotorista = async () => {
    if (target.uuid) {
      await updateMotorista();
    } else {
      await addMotorista();
    }
  };

  const removeMotorista = async (uuid) => {
    try {
      attIsLoading(true);
      const response = await Motoristas.delete(uuid);
      if (response.ok === true)
        showToast("success", "Confirmado", "Motorista Excluido com sucesso");
      setTotal((prev) => prev - 1);
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao excluir motorista " + error.response?.data?.message || error,
      );
    } finally {
      attIsLoading(false);
    }
  };

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

  const clearTarget = () => {
    setTarget({});
  };

  return (
    <MotoristaContext.Provider
      value={{
        query,
        setQuery,
        motorista,
        fetchMotorista,
        salvarMotorista,
        removeMotorista,
        panel,
        setPanel,
        total,
        target,
        setTarget,
        clearTarget,
      }}
    >
      <>{children}</>
    </MotoristaContext.Provider>
  );
};

MotoristaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
