import { useEffect, useState } from "react";
import { BolsistaContext } from "./BolsistaContext";
import {
  postBolsista,
  updateBolsista,
  deleteBolsista,
  getBolsista,
} from "@/service/ft_appServices";

import { useToast } from "@/components/shared/toast/ToastProvider.jsx";

import PropTypes from "prop-types";
import { useLoadingContext } from "../../loading/LoadingContext";
import { getBolsistaToExpire, putBolsistaToExpire } from "../../../service/ft_appServices";

export const BolsistaProvider = ({ children }) => {
  const { showToast } = useToast();

  let { attIsLoading } = useLoadingContext();

  let [bolsistas, setBolsistas] = useState([]);
  let [target, setTarget] = useState({});
  let [pagadorOptions, setPagadorOptions] = useState([]);
  let [total, setTotal] = useState(0);
  let [toExpire, setToExpire] = useState({
    count: 0,
    bolsistas: [],
  });
  let [prorrogateModalOpen, setProrrogateModalOpen] = useState(false);

  useEffect(() => {
    if (toExpire.count > 0) {
      setProrrogateModalOpen(true);
    }
  }, [toExpire]);

  const [query, setQuery] = useState({
    page: 0,
    limit: 10,
    search: "",
  });

  const addBolsista = async () => {
    try {
      attIsLoading(true);

      let payload = {
        bolsista: {
          nome: target.nome,
          cpf: target.cpf.replace(/\D/g, ""),
          telefone: target.telefone.replace(/\D/g, ""),
          local: target.local,
          cep: target.cep,
          numero: target.numero,
          logradouro: target.logradouro,
          bairro: target.bairro,
          cidade: target.cidade,
          uf: target.uf,
          payment_info: {
            bco: target.payment_info.bco,
            ag: target.payment_info.ag,
            dig_ag: target.payment_info.dig_ag,
            conta: target.payment_info.conta,
            dig_conta: target.payment_info.dig_conta,
            pagador_id: target.payment_info.pagador_id,
          },
        },
      };
      const { bolsista } = await postBolsista(payload);

      setBolsistas((prev) => [...prev, bolsista]);
      setTotal((prev) => prev + 1);
      showToast("success", "Confirmado", "Bolsista salvo com sucesso");
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao salvar bolsista " + error.response?.data?.message || error
      );
    } finally {
      setTarget({});
      attIsLoading(false);
    }
  };

  const attBolsista = async () => {
    try {
      attIsLoading(true);

      let payload = {
        bolsista: {
          nome: target.nome,
          cpf: target.cpf.replace(/\D/g, ""),
          telefone: target.telefone.replace(/\D/g, ""),
          local: target.local,
          cep: target.cep,
          numero: target.numero,
          logradouro: target.logradouro,
          bairro: target.bairro,
          cidade: target.cidade,
          uf: target.uf,
          payment_info: {
            bco: target.payment_info.bco,
            ag: target.payment_info.ag,
            dig_ag: target.payment_info.dig_ag,
            conta: target.payment_info.conta,
            dig_conta: target.payment_info.dig_conta,
            pagador_id: target.payment_info.pagador_id,
          },
        },
      };
      await updateBolsista(`${target.id}`, payload);

      setBolsistas((prev) =>
        prev.map((item) => (item.id === target.id ? target : item))
      );
      showToast("success", "Confirmado", "Bolsista salvo com sucesso");
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao salvar bolsista " + error.response?.data?.message || error
      );
    } finally {
      setTarget({});
      attIsLoading(false);
    }
  };

  const removeBolsista = async () => {
    try {
      attIsLoading(true);
      await deleteBolsista(target.id);
      setBolsistas((prev) => prev.filter((item) => item.id !== target.id));
      setTotal((prev) => prev - 1);
      showToast("success", "Confirmado", "Bolsista Excluido com sucesso");
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao excluir bolsista " + error.response?.data?.message || error
      );
    } finally {
      setTarget({});
      attIsLoading(false);
    }
  };

  const fetchBolsistas = async () => {
    try {
      attIsLoading(true);
      const { bolsista, pagador, uploadToken, count } = await getBolsista(
        query
      );

      const data = await getBolsistaToExpire();
      setToExpire({
        count: data.count,
        bolsistas: data.bolsistas,
      });

      setTotal(count);
      setBolsistas(bolsista);
      setPagadorOptions(pagador);
      // setToExpire(to_expire);

      localStorage.setItem("upload_token", uploadToken);
      return;
    } catch (error) {
      showToast(
        "error",
        "Falha ao buscar bolsistas: " + error.response?.data?.message || error
      );
    } finally {
      attIsLoading(false);
    }
  };

  const prorrogate = (data) => {
    const bolsistas = []
    for(const b of data){
      const uuid = b.id
      const edital = b.edital[0].id

      bolsistas.push({bolsista_id: uuid, edital_id: edital})
    }

    putBolsistaToExpire(bolsistas)
  };

  return (
    <BolsistaContext.Provider
      value={{
        bolsistas,
        fetchBolsistas,
        addBolsista,
        attBolsista,
        removeBolsista,
        prorrogate,
        toExpire,
        setToExpire,
        target,
        setTarget,
        query,
        setQuery,
        pagadorOptions,
        setPagadorOptions,
        total,
        prorrogateModalOpen,
        setProrrogateModalOpen,
      }}
    >
      <>{children}</>
    </BolsistaContext.Provider>
  );
};

BolsistaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
