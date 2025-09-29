import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";

import TableContainer from "../../../../components/shared/table/TableContainer";
import TableHeader from "../../../../components/shared/table/TableHeader";
import InputFieldLine from "../../../../components/shared/input/inputfield/InputFieldLine";
import { InputSwitch } from "primereact/inputswitch";
import { useToast } from "../../../../components/shared/toast/ToastProvider";
import { Column } from "primereact/column";
import { getMunicipe } from "../../../../service/iptu";
import Files from "./files";

const TableCertidao = () => {
  const { showToast } = useToast();

  const [sudoMode, setSudoMode] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [target, setTarget] = useState();

  const fetchData = async () => {
    try {
      setInterval(10000);
      const { municipe } = await getMunicipe();

      setData(municipe);
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Erro ao buscar documentos " + error.response.data.message ||
          error.message
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <>
      <TableContainer>
        <TableHeader
          start={
            <>
              <InputFieldLine
                id="SearchCertidao"
                placeHolder={"Buscar Certidão por CPF"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></InputFieldLine>
            </>
          }
          center="Tabela de Certidões"
          end={
            <>
              <span>Modo Perigoso</span>
              <InputSwitch
                checked={sudoMode}
                onChange={(e) => setSudoMode(e.value)}
              ></InputSwitch>
            </>
          }
        ></TableHeader>
        <div className="w-full flex md:flex-row p-4 gap-1">
          <div className="w-full">
            
            <DataTable
              rowHover
              value={data}
              header={<h1 className="text-center font-bold">Painel de Munícipes</h1>}
              onRowClick={(e) => {
                setTarget(e.data);
                // Aqui você pode navegar, abrir modal, etc.
              }}
            >
              <Column field="uuid" header="uuid" className="max-w-30 text-nowrap overflow-hidden"></Column>
              <Column field="name" header="Nome"></Column>
              <Column field="email" header="Email"></Column>
              {sudoMode && <Column header="Actions"></Column>}
            </DataTable>
          </div>
          <div className="border-1 border-gray-200 rounded-md p-4 w-full max-w-70 overflow-y-scroll max-h-78">
            <h1 className="text-center font-bold">Documentos</h1>
            {target && (
                <Files data={target}/>
            )}
          </div>
        </div>
      </TableContainer>
    </>
  );
};

export default TableCertidao;
