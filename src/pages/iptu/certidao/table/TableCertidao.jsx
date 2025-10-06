import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import { Paginator } from "primereact/paginator";

import TableContainer from "../../../../components/shared/table/TableContainer";
import TableHeader from "../../../../components/shared/table/TableHeader";
import TableButton from "../../../../components/shared/table/TableButton";

import InputFieldLine from "../../../../components/shared/input/inputfield/InputFieldLine";
import { IPTUMunicipeService } from "../../../../service/iptu";
import Files from "./files";

import { useToast } from "../../../../components/shared/toast/ToastProvider";
import { Button } from "primereact/button";

const TableCertidao = ({ setModalData, setIsOpen, setExcludeIsOpen }) => {
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

  const actions = [
    {
      name: "edit",
      icon: "pi pi-pen-to-square",
      color: "text-primary bg-cancel hover:bg-cancel-hover border-none",
      onClick: (rowData) => {
        setModalData(rowData);
        setIsOpen(true);
      },
    },
    {
      name: "delete",
      icon: "pi pi-trash",
      color: "text-danger bg-cancel hover:bg-cancel-hover border-none",
      onClick: async (rowData) => {
        setModalData(rowData);
        setExcludeIsOpen(true);
      },
    },
  ];

  const fetchData = async () => {
    try {
      const { municipe, count } = await IPTUMunicipeService.getMunicipe(query);

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
        <div className="w-full flex flex-col-reverse items-center lg:flex-row p-4 gap-1">
          <DataTable
            className="w-full"
            rowHover
            value={data}
            header={
              <div className="relative">
                <h1 className="text-center font-bold">Painel de Munícipes</h1>
                <div className="absolute right-4 top-[-50%] traslate-y-[-50%]">
                  <Button
                    icon="pi pi-plus"
                    tooltip="Adicionar Municipe"
                    className="bg-white text-primary border-0"
                    onClick={() => setIsOpen(true)}
                  ></Button>
                </div>
              </div>
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
            {sudoMode && (
              <Column
                header="Actions"
                body={(rowData) => {
                  return (
                    <div className="flex gap-2">
                      {actions.map((action, i) => (
                        <TableButton
                          key={i}
                          tooltip={action.name}
                          iconPos="center"
                          color={action.color}
                          onClick={() => action.onClick(rowData)}
                          icon={action.icon}
                          label={action.label}
                        />
                      ))}
                    </div>
                  );
                }}
              ></Column>
            )}
          </DataTable>
          {target && (
            <Files
              data={target}
              sudoMode={sudoMode}
              setData={setData}
              setTarget={setTarget}
            />
          )}
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
TableCertidao.propTypes = {
  setModalData: PropTypes.func.isRequired,
  setExcludeIsOpen: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default TableCertidao;
