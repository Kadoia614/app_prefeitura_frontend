import { useState, useCallback } from "react";
import { useOutletContext } from "react-router";

import EditalTable from "./components/Table/EditalTable";
import Edital_Modal from "./components/modal/Edital_Modal";
import Vincular_Bolsista from "./components/modal/Vincular_Bolsista";

import { getEdital, getEditalWithBolsista } from "@/service/ft_appServices";
import { useToast } from "@/components/shared/toast/ToastProvider";

const Edital = () => {
  const { setIsLoading } = useOutletContext();

  const [tableData, setTableData] = useState([]);
  const [tableOptions, setTableOptions] = useState([]);

  const [isEditalModalOpen, setIsEditalModalOpen] = useState(false);
  const [isVincularModalOpen, setIsVincularModalOpen] = useState(false);

  const [selectedTable, setSelectedTable] = useState();
  const { showToast } = useToast();

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
        console.error(error);
        showToast("error", "error", "Erro ao buscar dados");
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  return (
    <div id="Bolsistas" className="content">
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
