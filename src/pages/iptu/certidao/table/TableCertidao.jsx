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
import { Paginator } from "primereact/paginator";

const TableCertidao = () => {
  const { showToast } = useToast();

  const [sudoMode, setSudoMode] = useState(false);
  const [query, setQuery] = useState({
    search: "",
    page: 0,
    limit: 10,
  });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [target, setTarget] = useState();

  const fetchData = async () => {
    try {
      setInterval(10000);
      const { municipe, count } = await getMunicipe(query);

      setData(municipe);
      setTotal(count);
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
  }, [query]);

  return (
    <>
      <TableContainer>
        <TableHeader
          start={
            <>
              <InputFieldLine
                id="SearchCertidao"
                placeHolder={"Buscar Certidão por CPF"}
                value={query.search}
                onChange={(e) =>
                  setQuery((q) => ({ ...q, search: e.target.value }))
                }
              ></InputFieldLine>
            </>
          }
          center="Tabela de Certidões"
          end={
            <>
              <div className="flex items-center">
                <span className="mr-2">Modo Perigoso</span>
                <InputSwitch
                  checked={sudoMode}
                  onChange={(e) => setSudoMode(e.value)}
                ></InputSwitch>
              </div>
              <div className="text-text-muted">Total: {total || 0}</div>
            </>
          }
        ></TableHeader>
        <div className="w-full flex md:flex-row p-4 gap-1">
          <div className="w-full">
            <DataTable
              rowHover
              value={data}
              header={
                <h1 className="text-center font-bold">Painel de Munícipes</h1>
              }
              onRowClick={(e) => {
                setTarget(e.data);
                // Aqui você pode navegar, abrir modal, etc.
              }}
            >
              <Column
                field="uuid"
                header="uuid"
                className="max-w-30 text-nowrap overflow-hidden"
              ></Column>
              <Column field="name" header="Nome"></Column>
              <Column field="email" header="Email"></Column>
              {sudoMode && <Column header="Actions"></Column>}
            </DataTable>
          </div>
          <div className="border-1 border-gray-200 rounded-md p-4 w-full max-w-70 overflow-y-scroll max-h-78">
            <h1 className="text-center font-bold">Documentos</h1>
            {target && <Files data={target} />}
          </div>
        </div>
        <Paginator
          first={query.page}
          rows={query.limit}
          totalRecords={total}
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={(e) =>
            setQuery((prev) => ({
              ...prev,
              page: e.page,
              limit: e.rows,
            }))
          }
        />
      </TableContainer>
    </>
  );
};

export default TableCertidao;
