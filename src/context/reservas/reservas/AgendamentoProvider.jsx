import { useState } from "react";
import { AgendamentoContext } from "./AgendamentoContext";

import { useToast } from "@/components/shared/toast/ToastProvider.jsx";

import PropTypes from "prop-types";

import { Agendamentos } from "../../../service/reservas";
import { useLoadingContext } from "../../loading/LoadingContext";

export const AgendamentoProvider = ({ children }) => {
  const { showToast } = useToast();
  let { attIsLoading } = useLoadingContext();

  let [agendamento, setAgendamento] = useState([]);
  let [target, setTarget] = useState({});
  let [total, setTotal] = useState(0);
  let [panel, setPanel] = useState({});
  let [query, setQuery] = useState({
    page: 0,
    limit: 10,
    search: "",
  });

  const addAgendamento = async () => {
    try {
      attIsLoading(true);
      const data = await Agendamentos.post(target);

      const newAgendamento = await data.agendamento;
      setAgendamento((prev) => [...prev, newAgendamento]);

      showToast("success", "Confirmado", "Agendamento Cadastrado com sucesso");
      setTarget({});

      setTotal((prev) => prev + 1);
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao cadastrar agendamento " + error.response?.data?.message || error,
      );
    } finally {
      attIsLoading(false);
    }
  };

  const updateAgendamento = async () => {
    try {
      const response = await Agendamentos.update(target.uuid, target);

      setAgendamento((prev) => {
        return prev.map((item) => {
          if (item.uuid === response.agendamento.uuid) {
            return response.agendamento;
          }
          return item;
        });
      });
      showToast("success", "Confirmado", "Agendamento Atualizado com sucesso");

      setTarget({});
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao atualizar agendamento " + error.response?.data?.message || error,
      );
    }
  };

  const salvarAgendamento = async () => {
    if (target.uuid) {
      await updateAgendamento();
    } else {
      await addAgendamento();
    }
  };

  const removeAgendamento = async (uuid) => {
    try {
      attIsLoading(true);
      const response = await Agendamentos.delete(uuid);
      if (response.ok === true)
        showToast("success", "Confirmado", "Agendamento Excluido com sucesso");
      setTotal((prev) => prev - 1);
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao excluir agendamento " + error.response?.data?.message || error,
      );
    } finally {
      attIsLoading(false);
    }
  };

  const fetchAgendamento = async () => {
    try {
      attIsLoading(true);
      const data = await Agendamentos.get(query);
      console.log(agendamento)
      const agendamentos = await data.agendamento;
      const count = await data.count;

      setTotal(count);
      setAgendamento(agendamentos);
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao cadastrar agendamento " + error.response?.data?.message || error,
      );
    } finally {
      attIsLoading(false);
    }
  };

  const clearTarget = () => {
    setTarget({});
  };

  return (
    <AgendamentoContext.Provider
      value={{
        query,
        setQuery,
        agendamento,
        fetchAgendamento,
        salvarAgendamento,
        removeAgendamento,
        panel,
        setPanel,
        total,
        target,
        setTarget,
        clearTarget,
      }}
    >
      <>{children}</>
    </AgendamentoContext.Provider>
  );
};

AgendamentoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
