import { useEffect, useState, useContext, useCallback } from "react";
import { useOutletContext } from "react-router";
import HanlerError from "@/middleware/HandleError";
import { UserContext } from "@/context/UserContextFile";

import BolsistasTable from "./components/Table/BolsistasTable";
import FT_Bolsista_Modal from "./components/modal/FT_Bolsista_Modal";

import {
  getBolsista,
  getEdital,
  getEditalWithBolsista,
} from "@/service/ft_appServices";

const Bolsista = () => {
  const { setIsLoading } = useOutletContext();
  const [error, setError] = useState(false);

  const [openModalEdit, setOpenModalEdit] = useState(false);

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
        
        const data = await getEditalWithBolsista(selectedTable);
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
      <div>
        <BolsistasTable
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
          tableOptions={tableOptions}
          tableData={tableData}
          fetchData={fetchData}
          setOpenModalEdit={setOpenModalEdit}
          setModalData={setModalData}
          setIsLoading={setIsLoading}
        />
      </div>

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

export default Bolsista;
