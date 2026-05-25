import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Tooltip } from "primereact/tooltip";
import { SpeedDial } from "primereact/speeddial";

import TableButton from "@/components/shared/table/TableButton";
import TableContainer from "@/components/shared/table/TableContainer";
import TableHeader from "@/components/shared/table/TableHeader";
import InputFieldLine from "@/components/shared/input/inputfield/InputFieldLine";

import SideBarBolsista from "../sidebar/SideBarBolsista";

import { useBolsistaContext } from "../../../../context/ft/bolsista/BolsistaContext";
import { useUserContext } from "@/context/user/UserContext";
import { useLoadingContext } from "../../../../context/loading/LoadingContext";
import { Skeleton } from "primereact/skeleton";
import RenderStatus from "../../../shared/RenderStatus";

const BolsistasTable = ({ setOpenModalEdit, setExcludeModalOpen }) => {
  const { query, setQuery, fetchBolsistas, total, bolsistas, setTarget } =
    useBolsistaContext();

  const { permissions } = useUserContext();
  let { isLoading } = useLoadingContext();

  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [sideBarId, setSideBarId] = useState(null);

  const renderStatus = (rowData) => {
    switch (rowData.status) {
      case "ativo":
        return <RenderStatus type={"success"}> {rowData.status} </RenderStatus>;
      case "inativo":
        return <RenderStatus type={"warning"}> {rowData.status} </RenderStatus>;
      case "pendente":
        return <RenderStatus type={"danger"}> {rowData.status} </RenderStatus>;
      default:
        return <RenderStatus type={"default"}> {rowData.status} </RenderStatus>;
    }
  };

  const renderItems = [
    {
      label: "Adicionar Bolsista",
      icon: "pi pi-user",
      className: "add-bolsista-btn bg-info hover:bg-primary-hover",
      command: () => {
        setOpenModalEdit(true);
      },
    },
  ];

  const renderActions = (rowData) => (
    <div className="flex gap-2">
      {permissions.edit && (
        <>
          <TableButton
            tooltip={`Editar`}
            icon={"pi pi-pen-to-square"}
            iconPos="left"
            color="table-button-info"
            onClick={() => {
              setOpenModalEdit(true);
              setTarget(rowData);
            }}
          />
          <TableButton
            tooltip={`Documentos`}
            icon={"pi pi-file"}
            iconPos="left"
            color="table-button-warning"
            onClick={() => {
              setSideBarOpen(true);
              setSideBarId(rowData.id);
            }}
          />
        </>
      )}

      {permissions.del && (
        <TableButton
          tooltip={`Excluir`}
          icon={"pi pi-trash"}
          color="table-button-danger"
          onClick={() => {
            setTarget(rowData);
            setExcludeModalOpen(true);
          }}
        />
      )}
    </div>
  );

  useEffect(() => {
    fetchBolsistas(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <TableContainer>
        <TableHeader
          center={
            <div className="md:absolute left-[50%] md:top-[50%] md:translate-x-[-50%] md:translate-y-[-50%]">
              Bolsistas
            </div>
          }
          start={
            <>
              <InputFieldLine
                id="SearchCertidao"
                placeHolder={"Buscar Bolsista por CPF ou nome"}
                value={query.search}
                onChange={(e) =>
                  setQuery((q) => ({ ...q, search: e.target.value, page: 0 }))
                }
              ></InputFieldLine>
            </>
          }
        ></TableHeader>

        {isLoading ? (
          <div>
            <Skeleton className="w-full min-h-15"></Skeleton>
            <Skeleton className="w-full min-h-52 mt-2"></Skeleton>
          </div>
        ) : (
          <DataTable
            id="BolsistaTable"
            value={bolsistas}
            size="small"
            stripedRows
            rowClassName="hover:bg-gray-100 transition duration-200"
            header={
              <div className="relative flex justify-between items-center px-4">
                <div className="sm:absolute sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%]">
                  <h1 className="font-bold text-nowrap">Painel de Munícipes</h1>
                </div>
                <div>
                  <p className="text-xs text-text-muted">total: {total}</p>
                </div>
                {permissions?.write && (
                  <div>
                    <Tooltip target=".add-bolsista-btn" position="bottom" />
                    <SpeedDial
                      className="custom-speed-dial"
                      model={renderItems}
                      direction="down"
                      type="linear"
                      style={{ right: 0 }}
                    ></SpeedDial>
                  </div>
                )}
              </div>
            }
          >
            <Column
              field="id"
              header="Id"
              className="text-sm text-text-muted p-4 whitespace-nowrap"
            />
            <Column
              field="nome"
              header="Nome"
              sortable
              filter
              filterPlaceholder="Pesquisar Nome"
              filterMatchMode="contains"
              className="text-sm text-text-muted p-4"
            />
            <Column
              field="local"
              header="Local"
              sortable
              filter
              filterPlaceholder="Pesquisar Local"
              filterMatchMode="contains"
              className="text-sm text-text-muted p-4"
            />
            <Column
              field="status"
              header="Status"
              body={(rowData) => renderStatus(rowData)}
              sortable
              className="text-sm text-text-muted p-4"
            />
            <Column
              field="createdAt"
              header="Criação"
              sortable
              filter
              filterPlaceholder="Pesquisar data"
              filterMatchMode="contains"
              className="text-sm text-text-muted p-4 whitespace-nowrap"
              body={(rowData) =>
                new Date(rowData.createdAt).toLocaleDateString("pt-BR")
              }
            />
            {permissions && <Column header="Ações" body={renderActions} />}
          </DataTable>
        )}

        <Paginator
          first={query.page * query.limit} // ← aqui está o ajuste
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

      <SideBarBolsista
        sideBarStatus={sideBarOpen}
        setSideBarStatus={setSideBarOpen}
        sideBarData={sideBarId}
      />
    </>
  );
};

BolsistasTable.propTypes = {
  setOpenModalEdit: PropTypes.func.isRequired,
  setExcludeModalOpen: PropTypes.func,
};

export default BolsistasTable;
