import { useEffect } from "react";
import PropTypes from "prop-types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
import { SpeedDial } from "primereact/speeddial";

import TableButton from "@/components/shared/table/TableButton";
import TableContainer from "@/components/shared/table/TableContainer";
import TableHeader from "@/components/shared/table/TableHeader";
import InputFieldLine from "@/components/shared/input/inputfield/InputFieldLine";

import { useUserContext } from "@/context/user/UserContext";
import { Skeleton } from "primereact/skeleton";
import { useLoadingContext } from "../../../context/loading/LoadingContext";
import { useMinhaCasaContext } from "../../../context/minhacasa/MinhaCasaContext";

const tag = {
  ativo: {
    style:
      "bg-success-primary-hover text-text-muted p-2 text-sm rounded-md font-bold",
    icon: <i className="pi pi-check-circle"> </i>,
    label: "Ativo",
  },
  inativo: {
    style: "bg-amber-200/70 text-text-muted p-2 text-sm rounded-md font-bold",
    icon: <i className="pi pi-exclamation-triangle"></i>,
    label: "Inativo",
  },
  pendente: {
    style: "bg-red-200/70 text-text-muted p-2 text-sm rounded-md font-bold",
    icon: <i className="pi pi-exclamation-triangle"></i>,
    label: "Pendente",
  },
};

const CadastrosTable = ({ setOpenModalEdit, setExcludeModalOpen }) => {

  const { cadastros, cadastrosTotal, setTarget, fetchCadastro, query, setQuery } = useMinhaCasaContext();

  const { permissions } = useUserContext();
  let { isLoading } = useLoadingContext();

  // componentizar
  const renderStatus = ({ status }) => {
    const item = tag[status];
    if (!item) return null;
    return (
      <div className={`flex gap-2 items-center ${item.style}`}>
        {item.icon}
        {item.label}
      </div>
    );
  };

  // componentizar
  const renderItems = [
    {
      label: "Adicionar Cadastro",
      icon: "pi pi-user",
      className: "add-bolsista-btn bg-primary hover:bg-primary-hover",
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
            color="text-text-secondary bg-white border-none"
            onClick={() => {
              setTarget(rowData);
              setOpenModalEdit(true);
            }}
          />
        </>
      )}

      {permissions.del && (
        <TableButton
          tooltip={`Excluir`}
          icon={"pi pi-trash"}
          color="text-danger bg-white border-none"
          onClick={() => {
            setTarget(rowData);
            setExcludeModalOpen(true);
          }}
        />
      )}
    </div>
  );

  useEffect(() => {
    fetchCadastro(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <TableContainer>
        <TableHeader
          center={
            <div className="md:absolute left-[50%] md:top-[50%] md:translate-x-[-50%] md:translate-y-[-50%]">
              Cadastros
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
            value={cadastros}
            size="small"
            stripedRows
            rowClassName="hover:bg-gray-100 transition duration-200"
            header={
              <div className="relative flex justify-between items-center px-4">
                <div className="sm:absolute sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%]">
                  <h1 className="font-bold text-nowrap">Painel de Cadastros</h1>
                </div>
                <div>
                  <p className="text-xs text-text-muted">
                    total: {cadastrosTotal}
                  </p>
                </div>
                {permissions?.write && (
                  <div>
                    <Tooltip target=".add-bolsista-btn" position="bottom" />
                    <SpeedDial
                      className="relative"
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
              field="uuid"
              header="Id"
              className="text-sm text-text-muted p-4 whitespace-nowrap"
            />
            <Column
              field="responsavel1.nome"
              header="Nome"
              sortable
              filter
              filterPlaceholder="Pesquisar Nome"
              filterMatchMode="contains"
              className="text-sm text-text-muted p-4"
            />
            <Column
              field="moradia.cep"
              header="CEP"
              sortable
              filter
              filterPlaceholder="Pesquisar Local"
              filterMatchMode="contains"
            />
                        <Column
              field="cond_moradia"
              header="Condição de Moradia"
            />
            <Column
              field="status"
              header="Status"
              body={renderStatus}
              sortable
            />
            <Column
              field="createdAt"
              header="Criação"
              sortable
              filter
              filterPlaceholder="Pesquisar data"
              filterMatchMode="contains"
              body={(rowData) =>
                new Date(rowData.createdAt).toLocaleDateString("pt-BR")
              }
            />
            {permissions &&
            <Column header="Ações" body={renderActions} />}
          </DataTable>
        )}

        {/* <Paginator
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
        /> */}
      </TableContainer>
    </>
  );
};

CadastrosTable.propTypes = {
  setOpenModalEdit: PropTypes.func.isRequired,
  setExcludeModalOpen: PropTypes.func.isRequired,
};

export default CadastrosTable;
