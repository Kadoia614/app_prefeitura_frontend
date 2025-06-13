import { useEffect, useState, useContext, useCallback } from "react";
import { useOutletContext } from "react-router";
import HanlerError from "@/middleware/HandleError";
import { UserContext } from "@/context/UserContextFile";

import Title from "@/components/shared/title/Title";

import BolsistasTable from "./bolsistas/components/Table/BolsistasTable";
import Vincular_Bolsista from "./bolsistas/components/modal/Vincular_Bolsista";
import FT_Bolsista_Modal from "./bolsistas/components/modal/FT_Bolsista_Modal";
import Edital_Modal from "./bolsistas/components/modal/Edital_Modal";

import {
  getBolsista,
  getEdital,
  getBolsistaEdital,
} from "@/service/ft_appServices";

const FTAPP = () => {
  const { setIsLoading } = useOutletContext();
  const [error, setError] = useState(false);

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [isEditalModalOpen, setIsEditalModalOpen] = useState(false);
  const [isVincularModalOpen, setIsVincularModalOpen] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [tableOptions, setTableOptions] = useState([]);
  const [pagadorOptions, setPagadorOptions] = useState([]);
  const [selectedTable, setSelectedTable] = useState();
  const [modalData, setModalData] = useState({});

  const { scopo } = useContext(UserContext);

  const fetchData = useCallback(
    async (selectedTable) => {
      try {
        setIsLoading(true);

        if (!selectedTable) {
          const { bolsista, pagador, uploadToken } = await getBolsista();
          
          const { edital } = await getEdital();
          setTableOptions(edital);
          setTableData(bolsista);
          setPagadorOptions(pagador)
          localStorage.setItem("upload_token", uploadToken);
          return;
        }
        
        const data = await getBolsistaEdital(selectedTable);
        console.log(data)
        setTableData(data.bolsista);
      } catch (error) {
        setError(error.status);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  useEffect(() => {
    fetchData(selectedTable);
  }, [fetchData, selectedTable]);

  // gerenciamento de erros para caso algo de errado ocorra durante as requisições
  if (error) {
    return <HanlerError error={error} />;
  }

  return (
    <div id="Bolsistas" className="content">
      <Title>Com grandes poderes vêm grandes responsabilidades</Title>

      <div>
        <BolsistasTable
          setIsVincularModalOpen={setIsVincularModalOpen}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
          tableOptions={tableOptions}
          tableData={tableData}
          setIsEditalModalOpen={setIsEditalModalOpen}
          fetchData={fetchData}
          setOpenModalEdit={setOpenModalEdit}
          setModalData={setModalData}
          setIsLoading={setIsLoading}
        />
      </div>

      <Edital_Modal
        setIsEditalModalOpen={setIsEditalModalOpen}
        isEditalModalOpen={isEditalModalOpen}
        fetchData={fetchData}
        setIsLoading={setIsLoading}
      ></Edital_Modal>

      <Vincular_Bolsista
        selectedTable={selectedTable}
        isVincularModalOpen={isVincularModalOpen}
        setIsVincularModalOpen={setIsVincularModalOpen}
        fetchData={fetchData}
        setIsLoading={setIsLoading}
      ></Vincular_Bolsista>

      {/* Modal para edição e cadastro de bolsistas */}
      <FT_Bolsista_Modal
        modalData={modalData}
        setModalData={setModalData}
        openModalEdit={openModalEdit}
        setOpenModalEdit={setOpenModalEdit}
        fetchData={fetchData}
        scopo={scopo}
        pagadorOptions={pagadorOptions}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default FTAPP;
