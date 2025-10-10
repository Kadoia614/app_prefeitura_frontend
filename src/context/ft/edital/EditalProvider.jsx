import { useEffect, useState } from "react";
import { EditalContext } from "./EditalContext";
import { getEdital, getEditalWithBolsista } from "@/service/ft_appServices";

import { useToast } from "@/components/shared/toast/ToastProvider.jsx";

import PropTypes from "prop-types";
import { vincularBolsista } from "../../../service/ft_appServices";

export const EditalProvider = ({ children }) => {
  const { showToast } = useToast();

  let [edital, setEdital] = useState([]);
  let [targetEdital, setTargetEdital] = useState();
  let [editalBolsista, setEditalBolsista] = useState([]);
  let [bolsistasToVincular, setBolsistasToVincular ] = useState({
    bolsistas: [],
    data_vinculo: null,
  });

  const [query, setQuery] = useState({
    page: 0,
    limit: 10,
    search: "",
  });

  const addEditalBolsista = async () => {
    try {
 
      showToast("success", "Confirmado", "Edital salvo com sucesso");
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao salvar bolsista " + error.response?.data?.message || error
      );
    } finally {
      setTargetEdital({});
    }
  };

  const addBolsistaIntoEdital = async () => {
    try {
      await vincularBolsista(targetEdital, bolsistasToVincular.bolsistas, bolsistasToVincular.data_vinculo);
      setBolsistasToVincular({ bolsistas: [], data_vinculo: null });
      showToast("success", "Confirmado", "Edital salvo com sucesso");
    } catch (error) {
      showToast(
        "error",
        "Error",
        `Erro ao vincular Bolsista ${error.status == 400 ? "Dados inválidos" : error.response.data.message}`
      );
      return;
    }
  };

  // const attBolsista = async () => {
  //   try {
  //     let payload = {
  //       bolsista: {
  //         nome: target.nome,
  //         cpf: target.cpf.replace(/\D/g, ""),
  //         telefone: target.telefone.replace(/\D/g, ""),
  //         local: target.local,
  //         cep: target.cep,
  //         numero: target.numero,
  //         logradouro: target.logradouro,
  //         bairro: target.bairro,
  //         cidade: target.cidade,
  //         uf: target.uf,
  //         payment_info: {
  //           bco: target.payment_info.bco,
  //           ag: target.payment_info.ag,
  //           dig_ag: target.payment_info.dig_ag,
  //           conta: target.payment_info.conta,
  //           dig_conta: target.payment_info.dig_conta,
  //           pagador_id: target.payment_info.pagador_id,
  //         },
  //       },
  //     };
  //     await updateBolsista(`${target.id}`, payload);

  //     setData((prev) =>
  //       prev.map((item) => (item.id === target.id ? target : item))
  //     );
  //     showToast("success", "Confirmado", "Bolsista salvo com sucesso");
  //   } catch (error) {
  //     showToast(
  //       "error",
  //       "Error",
  //       "Erro ao salvar bolsista " + error.response?.data?.message || error
  //     );
  //   } finally {
  //     setTargetEdital({});
  //   }
  // };

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
      if(targetEdital === undefined) return;
      const {bolsista_edital} = await getEditalWithBolsista(targetEdital);
      setEditalBolsista(bolsista_edital.bolsistas);
    } catch (error) {
      showToast(
        "error",
        "Falha ao buscar Edital: " + error.response.data.message
      );
    }
  };

  useEffect(() => {
    fetchBolsistaEdital();
  }, [targetEdital]);

  return (
    <EditalContext.Provider
      value={{
        edital,
        setEdital,
        targetEdital,
        setTargetEdital,
        editalBolsista,
        bolsistasToVincular,
        setBolsistasToVincular,
        addBolsistaIntoEdital,
        // setEditalBolsista,
        query,
        setQuery,
        // addBolsista,
        // attBolsista,
        // removeBolsista,
        fetchEdital,
      }}
    >
      <>{children}</>
    </EditalContext.Provider>
  );
};

EditalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
