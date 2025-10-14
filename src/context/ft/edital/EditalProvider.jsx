import { useEffect, useState } from "react";
import { EditalContext } from "./EditalContext";
import {
  getEdital,
  getEditalWithBolsista,
  postEdital,
} from "@/service/ft_appServices";

import { useToast } from "@/components/shared/toast/ToastProvider.jsx";

import PropTypes from "prop-types";
import {
  toggleBolsista,
  vincularBolsista,
} from "../../../service/ft_appServices";

export const EditalProvider = ({ children }) => {
  const { showToast } = useToast();

  let [edital, setEdital] = useState([]);
  let [newEdital, setNewEdital] = useState({});
  let [targetEdital, setTargetEdital] = useState();
  let [ queryEdital, setQueryEdital ] = useState({
    page: 0,
    limit: 10,
    search: "",
  });
  let [editalBolsista, setEditalBolsista] = useState({
    count: 0,
    bolsistas: [],
  });
  let [bolsistasToVincular, setBolsistasToVincular] = useState({
    bolsistas: [],
    data_vinculo: null,
  });

  const addEdital = async () => {
    try {
      let payload = {
        edital: {
          name: newEdital.name,
          data_publicacao: newEdital.data_publicacao,
          data_vencimento: newEdital.data_vencimento,
          dia_pagamento: newEdital.dia_pagamento,
          valor_bolsa: newEdital.valor_bolsa,
        },
      };

      const { data } = await postEdital(payload);

      setEdital((prev) => [...prev, data.newEdital]);
      showToast("success", "Confirmado", "Edital salvo com sucesso");
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao salvar bolsista " + (error.response?.data?.message || error)
      );
    } finally {
      setTargetEdital({});
    }
  };

  const addBolsistaIntoEdital = async () => {
    try {
      await vincularBolsista(
        targetEdital,
        bolsistasToVincular.bolsistas,
        bolsistasToVincular.data_vinculo
      );

      fetchBolsistaEdital();
      setBolsistasToVincular({ bolsistas: [], data_vinculo: null });

      showToast("success", "Confirmado", "Edital salvo com sucesso");
    } catch (error) {
      showToast(
        "error",
        "Error",
        `Erro ao vincular Bolsista ${
          error.status == 400 ? "Dados inválidos" : error.response.data.message
        }`
      );
    }
  };

  const handleToggleBolsista = async (id) => {
    try {
      await toggleBolsista(`${id}`, targetEdital);

      fetchBolsistaEdital();
      showToast("success", "Confirmado", "Bolsista salvo com sucesso");
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao salvar bolsista " + (error.response?.data?.message || error)
      );
    }
  };

  // const removeBolsista = async () => {
  //   try {
  //     await deleteBolsista(target.id);
  //     setData((prev) => prev.filter((item) => item.id !== target.id));
  //     setTotal((prev) => prev - 1);
  //     showToast("success", "Confirmado", "Bolsista Excluido com sucesso");
  //   } catch (error) {
  //     showToast(
  //       "error",
  //       "Error",
  //       "Erro ao excluir bolsista " + error.response?.data?.message || error
  //     );
  //   } finally {
  //     setTargetEdital({});
  //   }
  // };

  const fetchEdital = async () => {
    try {
      const { edital } = await getEdital();
      setEdital(edital);
    } catch (error) {
      showToast(
        "error",
        "Falha ao buscar Edital: " + error.response.data.message
      );
    }
  };

  const fetchBolsistaEdital = async () => {
    try {
      if (targetEdital === undefined) return;
      const { bolsista_edital } = await getEditalWithBolsista(
        targetEdital,
        queryEdital
      );
      setEditalBolsista({
        count: bolsista_edital.count,
        bolsistas: bolsista_edital.bolsistas,
      });
    } catch (error) {
      showToast(
        "error",
        "Falha ao buscar Edital: " + (error.response?.data?.message || error)
      );
    }
  };

  useEffect(() => {
    fetchBolsistaEdital();
  }, [targetEdital, queryEdital]);

  return (
    <EditalContext.Provider
      value={{
        edital,
        targetEdital,
        setTargetEdital,
        editalBolsista,
        bolsistasToVincular,
        setBolsistasToVincular,
        addBolsistaIntoEdital,
        addEdital,
        setNewEdital,
        newEdital,
        handleToggleBolsista,
        // removeBolsista,
        fetchEdital,
        queryEdital,
        setQueryEdital,
      }}
    >
      <>{children}</>
    </EditalContext.Provider>
  );
};

EditalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
