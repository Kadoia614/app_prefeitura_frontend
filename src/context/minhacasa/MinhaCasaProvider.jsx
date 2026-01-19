import { useState } from "react";
import { MinhaCasaContext } from "./MinhaCasaContext";

import { useToast } from "@/components/shared/toast/ToastProvider.jsx";

import PropTypes from "prop-types";
import { useLoadingContext } from "../loading/LoadingContext";

export const MinhaCasaProvider = ({ children }) => {
  const mockedData = [
    {
      uuid: "10",
      cond_moradia: "lugada",
      aluguel: "1000,00",
      obs: "sem obs",
      quantidade_moradores: 2,
      status: "ativo",
      createdAt: "2023-07-20T15:00:00.000Z",

      moradia: {
        id: 1,
        cep: "06853450",
        numero: "137",
        complemento: "sem complemento",
        dono: "João da Silva",
      },

      // responsavel1
      responsavel1: {
        func_publico: "sim",
        nascimento: "2001-07-27T15:00:00.000Z",
        cpf: "***.***.**6-00",
        orgao: "SSP",
        nome: "João da Silva",
        estado_civil: "solteiro",
        cep: "06.853-450",
        telefone: "(00) 00000-0000",
        email: "jR2yH@example.com",
        ocupacao: "estudante",
        renda: "1.000,00",
        local_trabalho: "Itapecerica da Serra",
      },

      // responsavel2
      responsavel2: {
        func_publico: "sim",
        nascimento: "2001-07-27T15:00:00.000Z",
        cpf: "***.***.**6-00",
        orgao: "SSP",
        nome: "João da Silva",
        estado_civil: "solteiro",
        cep: "06.853-450",
        telefone: "(00) 00000-0000",
        email: "jR2yH@example.com",
        ocupacao: "estudante",
        renda: "1.000,00",
        local_trabalho: "Itapecerica da Serra",
      },
    },
    {
      uuid: "1",
      cond_moradia: "lugada",
      aluguel: "1000,00",
      obs: "sem obs",
      quantidade_moradores: 2,
      status: "ativo",
      createdAt: "2023-07-20T15:00:00.000Z",

      moradia: {
        id: 1,
        cep: "06853450",
        numero: "137",
        complemento: "sem complemento",
        dono: "João da Silva",
      },

      // responsavel1
      responsavel1: {
        func_publico: "sim",
        nascimento: "2001-07-27T15:00:00.000Z",
        cpf: "***.***.**6-00",
        orgao: "SSP",
        nome: "João da Silva",
        estado_civil: "solteiro",
        cep: "06.853-450",
        telefone: "(00) 00000-0000",
        email: "jR2yH@example.com",
        ocupacao: "estudante",
        renda: "1.000,00",
        local_trabalho: "Itapecerica da Serra",
      },

      // responsavel2
      responsavel2: {
        func_publico: "sim",
        nascimento: "2001-07-27T15:00:00.000Z",
        cpf: "***.***.**6-00",
        orgao: "SSP",
        nome: "João da Silva",
        estado_civil: "solteiro",
        cep: "06.853-450",
        telefone: "(00) 00000-0000",
        email: "jR2yH@example.com",
        ocupacao: "estudante",
        renda: "1.000,00",
        local_trabalho: "Itapecerica da Serra",
      },
    },
    {
      uuid: "1",
      cond_moradia: "lugada",
      aluguel: "1000,00",
      obs: "sem obs",
      quantidade_moradores: 2,
      status: "ativo",
      createdAt: "2023-07-20T15:00:00.000Z",

      moradia: {
        id: 1,
        cep: "06853450",
        numero: "137",
        complemento: "sem complemento",
        dono: "João da Silva",
      },

      // responsavel1
      responsavel1: {
        func_publico: "sim",
        nascimento: "2001-07-27T15:00:00.000Z",
        cpf: "***.***.**6-00",
        orgao: "SSP",
        nome: "João da Silva",
        estado_civil: "solteiro",
        cep: "06.853-450",
        telefone: "(00) 00000-0000",
        email: "jR2yH@example.com",
        ocupacao: "estudante",
        renda: "1.000,00",
        local_trabalho: "Itapecerica da Serra",
      },

      // responsavel2
      responsavel2: {
        func_publico: "sim",
        nascimento: "2001-07-27T15:00:00.000Z",
        cpf: "***.***.**6-00",
        orgao: "SSP",
        nome: "João da Silva",
        estado_civil: "solteiro",
        cep: "06.853-450",
        telefone: "(00) 00000-0000",
        email: "jR2yH@example.com",
        ocupacao: "estudante",
        renda: "1.000,00",
        local_trabalho: "Itapecerica da Serra",
      },
    },
    {
      uuid: "1",
      cond_moradia: "lugada",
      aluguel: "1000,00",
      obs: "sem obs",
      quantidade_moradores: 2,
      status: "ativo",
      createdAt: "2023-07-20T15:00:00.000Z",

      moradia: {
        id: 1,
        cep: "06853450",
        numero: "137",
        complemento: "sem complemento",
        dono: "João da Silva",
      },

      // responsavel1
      responsavel1: {
        func_publico: "sim",
        nascimento: "2001-07-27T15:00:00.000Z",
        cpf: "***.***.**6-00",
        orgao: "SSP",
        nome: "João da Silva",
        estado_civil: "solteiro",
        cep: "06.853-450",
        telefone: "(00) 00000-0000",
        email: "jR2yH@example.com",
        ocupacao: "estudante",
        renda: "1.000,00",
        local_trabalho: "Itapecerica da Serra",
      },

      // responsavel2
      responsavel2: {
        func_publico: "sim",
        nascimento: "2001-07-27T15:00:00.000Z",
        cpf: "***.***.**6-00",
        orgao: "SSP",
        nome: "João da Silva",
        estado_civil: "solteiro",
        cep: "06.853-450",
        telefone: "(00) 00000-0000",
        email: "jR2yH@example.com",
        ocupacao: "estudante",
        renda: "1.000,00",
        local_trabalho: "Itapecerica da Serra",
      },
    },
  ];

  const { showToast } = useToast();

  let { attIsLoading } = useLoadingContext();

  let [cadastros, setCadastros] = useState([]);
  let [target, setTarget] = useState({});
  let [cadastroTotal, setCadastrosTotal] = useState(0);

  const [query, setQuery] = useState({
    page: 0,
    limit: 10,
    search: "",
  });

  const addCadastro = async () => {
    try {
      attIsLoading(true);

      let payload = {
        uuid: target.uuid,
        cond_moradia: target.cond_moradia,
        aluguel: target.aluguel,
        obs: target.obs,
        quantidade_moradores: target.quantidade_moradores,
        status: target.status,
        createdAt: target.createdAt,

        moradia: {
          id: target.id,
          cep: target.cep,
          numero: target.numero,
          complemento: target.complemento,
          dono: target.dono,
        },

        // responsavel1
        responsavel1: {
          func_publico: target.responsavel1.func_publico,
          nascimento: target.responsavel1.nascimento,
          cpf: target.responsavel1.cpf,
          orgao: target.responsavel1.orgao,
          nome: target.responsavel1.nome,
          estado_civil: target.responsavel1.estado_civil,
          cep: target.responsavel1.cep,
          telefone: target.responsavel1.telefone,
          email: target.responsavel1.email,
          ocupacao: target.responsavel1.ocupacao,
          renda: target.responsavel1.renda,
          local_trabalho: target.responsavel1.local_trabalho,
        },

        // responsavel2
        responsavel2: {
          func_publico: target.responsavel2.func_publico,
          nascimento: target.responsavel2.nascimento,
          cpf: target.responsavel2.cpf,
          orgao: target.responsavel2.orgao,
          nome: target.responsavel2.nome,
          estado_civil: target.responsavel2.estado_civil,
          cep: target.responsavel2.cep,
          telefone: target.responsavel2.telefone,
          email: target.responsavel2.email,
          ocupacao: target.responsavel2.ocupacao,
          renda: target.responsavel2.renda,
          local_trabalho: target.responsavel2.local_trabalho,
        },
      };

      //função de criação
      //Em desenvolvimento

      setCadastros((prev) => [...prev, payload]);
      setCadastrosTotal((prev) => prev + 1);
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

  const attCadastro = async () => {
    try {
      attIsLoading(true);

      let payload = {
        uuid: target.uuid,
        cond_moradia: target.cond_moradia,
        aluguel: target.aluguel,
        obs: target.obs,
        quantidade_moradores: target.quantidade_moradores,
        status: target.status,
        createdAt: target.createdAt,

        moradia: {
          cep: target.cep,
          numero: target.numero,
          complemento: target.complemento,
          dono: target.dono,
        },

        // responsavel1
        responsavel1: {
          func_publico: target.responsavel1.func_publico,
          nascimento: target.responsavel1.nascimento,
          cpf: target.responsavel1.cpf,
          orgao: target.responsavel1.orgao,
          nome: target.responsavel1.nome,
          estado_civil: target.responsavel1.estado_civil,
          telefone: target.responsavel1.telefone,
          email: target.responsavel1.email,
          ocupacao: target.responsavel1.ocupacao,
          renda: target.responsavel1.renda,
          local_trabalho: target.responsavel1.local_trabalho,
        },

        // responsavel2
        responsavel2: {
          func_publico: target.responsavel2.func_publico,
          nascimento: target.responsavel2.nascimento,
          cpf: target.responsavel2.cpf,
          orgao: target.responsavel2.orgao,
          nome: target.responsavel2.nome,
          estado_civil: target.responsavel2.estado_civil,
          telefone: target.responsavel2.telefone,
          email: target.responsavel2.email,
          ocupacao: target.responsavel2.ocupacao,
          renda: target.responsavel2.renda,
          local_trabalho: target.responsavel2.local_trabalho,
        },
      };

      // funcao de atualizacao
      // em desenvolvimento

      setCadastros((prev) =>
        prev.map((item) => (item.uuid === payload.uuid ? target : item))
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

  const removeCadastro = async () => {
    try {
      attIsLoading(true);
      //  funcao de delete
      // em desenvolvimento

      setCadastros((prev) => prev.filter((item) => item.id !== target.id));
      setCadastrosTotal((prev) => prev - 1);
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

  const fetchCadastro = async () => {
    try {
      attIsLoading(true);
      setCadastros(mockedData);

      setCadastrosTotal(mockedData.length);

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

  return (
    <MinhaCasaContext.Provider
      value={{
        cadastros,
        cadastroTotal,
        query,
        setQuery,
        target,
        setTarget,
        fetchCadastro,
        addCadastro,
        attCadastro,
        removeCadastro,
      }}
    >
      <>{children}</>
    </MinhaCasaContext.Provider>
  );
};

MinhaCasaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
