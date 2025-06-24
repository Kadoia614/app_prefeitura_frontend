import { useState, useCallback } from "react";
import { useOutletContext } from "react-router";
import HanlerError from "@/middleware/HandleError";

import EditalTable from "./components/Table/EditalTable";
import Edital_Modal from "./components/modal/Edital_Modal";
import Vincular_Bolsista from "./components/modal/Vincular_Bolsista";

import { getEdital, getEditalWithBolsista } from "@/service/ft_appServices";

const Edital = () => {
  const { setIsLoading } = useOutletContext();
  const [error, setError] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [tableOptions, setTableOptions] = useState([]);
  const [isEditalModalOpen, setIsEditalModalOpen] = useState(false);
  const [isVincularModalOpen, setIsVincularModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState();

  const fetchData = useCallback(
    async (selectedTable) => {
      try {
        setIsLoading(true);

        if (!selectedTable) {
          const { edital } = await getEdital();
          setTableOptions(edital);
          return;
        }

        const data = await getEditalWithBolsista(selectedTable);
        setTableData(data.bolsista_edital.bolsistas);
      } catch (error) {
        setError(error.status);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  // gerenciamento de erros para caso algo de errado ocorra durante as requisições
  if (error) {
    return <HanlerError error={error} />;
  }

  return (
    <div id="Bolsistas" className="content">
      <div>
        <EditalTable
          selectedTable={selectedTable}
          setIsEditalModalOpen={setIsEditalModalOpen}
          setIsVincularModalOpen={setIsVincularModalOpen}
          setSelectedTable={setSelectedTable}
          tableOptions={tableOptions}
          tableData={tableData}
          fetchData={fetchData}
          setIsLoading={setIsLoading}
        />
      </div>

      <Edital_Modal
        isEditalModalOpen={isEditalModalOpen}
        setIsEditalModalOpen={setIsEditalModalOpen}
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
    </div>
  );
};

export default Edital;
