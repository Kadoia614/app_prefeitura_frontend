import { useState } from "react";
import { VeiculoContext } from "./VeiculoContext";

import { useToast } from "@/components/shared/toast/ToastProvider.jsx";

import PropTypes from "prop-types";

import { Veiculos } from "../../../service/reservas";
import { useLoadingContext } from "../../loading/LoadingContext";

export const VeiculoProvider = ({ children }) => {
  const { showToast } = useToast();
  let { attIsLoading } = useLoadingContext();

  let [veiculo, setVeiculo] = useState([]);
  let [target, setTarget] = useState({});
  let [total, setTotal] = useState(0);
  let [panel, setPanel] = useState({});
  let [query, setQuery] = useState({
    page: 0,
    limit: 10,
    search: "",
  });

  const addVeiculo = async () => {
    try {
      attIsLoading(true);
      const data = await Veiculos.post(target);

      const newVeiculo = await data.veiculo;
      setVeiculo((prev) => [...prev, newVeiculo]);

      showToast("success", "Confirmado", "Veiculo Cadastrado com sucesso");
      setTarget({});

      setTotal((prev) => prev + 1);
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao cadastrar veiculo " + error.response?.data?.message || error,
      );
    } finally {
      attIsLoading(false);
    }
  };

  const updateVeiculo = async () => {
    try {
      const response = await Veiculos.update(target.uuid, target);

      setVeiculo((prev) => {
        return prev.map((item) => {
          if (item.uuid === response.veiculo.uuid) {
            return response.veiculo;
          }
          return item;
        });
      });
      showToast("success", "Confirmado", "Veiculo Atualizado com sucesso");

      setTarget({});
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao atualizar veiculo " + error.response?.data?.message || error,
      );
    }
  };

  const salvarVeiculo = async () => {
    if (target.uuid) {
      await updateVeiculo();
    } else {
      await addVeiculo();
    }
  };

  const removeVeiculo = async (uuid) => {
    try {
      attIsLoading(true);
      const response = await Veiculos.delete(uuid);
      if (response.ok === true)
        showToast("success", "Confirmado", "Veiculo Excluido com sucesso");
      setTotal((prev) => prev - 1);
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao excluir veiculo " + error.response?.data?.message || error,
      );
    } finally {
      attIsLoading(false);
    }
  };

  const fetchVeiculo = async () => {
    try {
      attIsLoading(true);
      const data = await Veiculos.getVeiculos(query);
      console.log(data);
      const veiculos = await data.veiculo;
      const count = await data.count;

      setTotal(count);
      setVeiculo(veiculos);
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao cadastrar veiculo " + error.response?.data?.message || error,
      );
    } finally {
      attIsLoading(false);
    }
  };

  const clearTarget = () => {
    setTarget({});
  };

  return (
    <VeiculoContext.Provider
      value={{
        query,
        setQuery,
        veiculo,
        fetchVeiculo,
        salvarVeiculo,
        removeVeiculo,
        panel,
        setPanel,
        total,
        target,
        setTarget,
        clearTarget,
      }}
    >
      <>{children}</>
    </VeiculoContext.Provider>
  );
};

VeiculoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
