import { useEffect, useState, useContext } from "react";
import { useOutletContext } from "react-router";
import HanlerError from "@/middleware/HandleError";
import { UserContext } from "@/context/UserContextFile";

import Title from "@/components/shared/title/Title";

import BolsistasTable from "./bolsistas/components/BolsistasTable";
import FT_Bolsista_Modal from "./bolsistas/components/FT_Bolsista_Modal";
import SideBarBolsista from "./bolsistas/components/SideBarBolsista";

import { getBolsista } from "@/service/ft_appServices";

const FTAPP = () => {
  const {setIsLoading} = useOutletContext();
  let [tableData, setTableData] = useState([]);
  let [error, setError] = useState(false);
  let [modalData, setModalData] = useState({});
  let [openModalEdit, setOpenModalEdit] = useState(false);
  let [sideBarStatus, setSideBarStatus] = useState(false);
  let [sideBarData, setSideBarData] = useState({});
  let { scopo } = useContext(UserContext);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      let response = await getBolsista();
      console.log(response)
      setTableData(response.bolsista);
      await localStorage.setItem("upload_token", response.uploadToken);
    } catch (error) {
      setError(error.status);
    } finally {
      setIsLoading(false);
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

      <BolsistasTable
        tableData={tableData}
        fetchData={fetchData}
        scopo={scopo}
        setOpenModalEdit={setOpenModalEdit}
        setSideBarStatus={setSideBarStatus}
        setModalData={setModalData}
        setIsLoading={setIsLoading}
        setSideBarData={setSideBarData}
      />

      {/* Modal para edição e cadastro de bolsistas */}
      <FT_Bolsista_Modal
        modalData={modalData}
        setModalData={setModalData}
        openModalEdit={openModalEdit}
        setOpenModalEdit={setOpenModalEdit}
        fetchData={fetchData}
        scopo={scopo}
        setIsLoading={setIsLoading}
      />

      <SideBarBolsista sideBarStatus={sideBarStatus} setSideBarStatus={setSideBarStatus} sideBarData={sideBarData} />
    </div>
  );
};

export default FTAPP;
