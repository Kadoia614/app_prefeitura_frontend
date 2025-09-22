import { useState, useCallback } from "react";

import EditalTable from "./components/Table/EditalTable";

import Edital_Modal from "./components/modal/Edital_Modal";

import Vincular_Bolsista from "./components/modal/Vincular_Bolsista";

import { getEdital, getEditalWithBolsista } from "@/service/ft_appServices";

import { useToast } from "@/components/shared/toast/ToastProvider";
import { useLoadingContext } from "../../../context/loading/LoadingContext";

const Edital = () => {
  const { attIsLoading } = useLoadingContext();

  const [tableData, setTableData] = useState([]);
  const [tableOptions, setTableOptions] = useState([]);

  const [isEditalModalOpen, setIsEditalModalOpen] = useState(false);
  const [isVincularModalOpen, setIsVincularModalOpen] = useState(false);

  const [selectedTable, setSelectedTable] = useState();
  const { showToast } = useToast();

  const fetchData = useCallback(
    async (selectedTable) => {
      try {
        attIsLoading(true);
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
        attIsLoading(false);
      }
    },
    [selectedTable]
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
      />

      <Edital_Modal
        isEditalModalOpen={isEditalModalOpen}
        setIsEditalModalOpen={setIsEditalModalOpen}
        fetchData={fetchData}
      ></Edital_Modal>

      <Vincular_Bolsista
        selectedTable={selectedTable}
        isVincularModalOpen={isVincularModalOpen}
        setIsVincularModalOpen={setIsVincularModalOpen}
        fetchData={fetchData}
      ></Vincular_Bolsista>
    </div>
  );
};

export default Edital;
