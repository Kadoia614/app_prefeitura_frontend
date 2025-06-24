
import { TabView, TabPanel } from "primereact/tabview";
import { useEffect, useState, useCallback } from "react";
import { useOutletContext } from "react-router";
import HanlerError from "@/middleware/HandleError";
import { useUserContext } from "@/context/UserContext";

import Title from "@/components/shared/title/Title";

import Bolsista from "./bolsistas/Bolsista";
import Edital from "./edital/Edital";

const FTAPP = () => {
  const { setIsLoading } = useOutletContext();
  const [error, setError] = useState(false);

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [isEditalModalOpen, setIsEditalModalOpen] = useState(false);
  const [isVincularModalOpen, setIsVincularModalOpen] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [tableOptions, setTableOptions] = useState([]);
  const [selectedTable, setSelectedTable] = useState();
  const [modalData, setModalData] = useState({});

  const { scopo } = useUserContext();

  const fetchData = useCallback(
    async (selectedTable) => {
      try {
        setIsLoading(true);

        if (!selectedTable) {
          const { bolsista, uploadToken } = await getBolsista();
          const { edital } = await getEdital();
          setTableOptions(edital);
          setTableData(bolsista);
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
      <Title>Frente de Trabalho</Title>

      <div>
        <TabView>
          <TabPanel header="Bolsistas" lazy>
            <Bolsista />
          </TabPanel>

          <TabPanel header="Editais" lazy>
            <Edital />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default FTAPP;
