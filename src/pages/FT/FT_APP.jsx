import { useEffect, useState, useContext } from "react";
import HanlerError from "../../middleware/HandleError";
import { UserContext } from "/src/context/UserContextFile";

import Title from "../../components/shared/title/Title";

import FT_Bolsista_Modal from "./components/FT_Bolsista_Modal";
import BolsistasTable from "./components/BolsistasTable";

import { getBolsista } from "@/service/ft_appServices";

const FTAPP = () => {
  let [tableData, setTableData] = useState([]);
  let [error, setError] = useState(false);
  let [modalData, setModalData] = useState({});
  let [openModalEdit, setOpenModalEdit] = useState(false);
  let { scopo } = useContext(UserContext);

  const fetchData = async () => {
    try {
      let response = await getBolsista();
      setTableData(response.bolsistas);
    } catch (error) {
      setError(error.status);
    }
  };

  //get a cada certo time (10seg nesse caso) alterar para websocket
  useEffect(() => {
    fetchData();
  }, []);

  // gerenciamento de erros para caso algo de errado ocorra durante as requisições
  if (error) {
    return <HanlerError error={error} />;
  }

  return (
    <div id="AllDemandasTi" className="content">
      <div>
        <Title>Com grandes poderes vêm grandes responsabilidades</Title>

        <button
          className="btn-primary"
          onClick={() => {
            setOpenModalEdit(true);
          }}
        >
          Cadastrar Bolsista
        </button>
      </div>

      <BolsistasTable tableData={tableData} fetchData={fetchData} scopo={scopo} setOpenModalEdit={setOpenModalEdit} setModalData={setModalData} />

      {/* Modal para edição e cadastro de bolsistas */}
      <FT_Bolsista_Modal
        modalData={modalData}
        setModalData={setModalData}
        openModalEdit={openModalEdit}
        setOpenModalEdit={setOpenModalEdit}
        fetchData={fetchData}
        scopo={scopo}
      />
    </div>
  );
};

export default FTAPP;
