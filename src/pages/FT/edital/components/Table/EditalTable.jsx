import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import Modal from "@/components/shared/modal/Modal";
import TableContainer from "@/components/shared/table/TableContainer";
import TableButton from "@/components/shared/table/TableButton";
import SelectField from "../../../../../components/shared/input/SelectField";

import { toggleBolsista } from "@/service/ft_appServices";

import { useEditalContext } from "../../../../../context/ft/edital/EditalContext";
import TableHeader from "../../../../../components/shared/table/TableHeader";
import { SpeedDial } from "primereact/speeddial";
import { Paginator } from "primereact/paginator";

const tag = {
  ativo: {
    style:
      "bg-success-primary-hover text-text-muted p-2 text-sm rounded-md font-bold",
    icon: <i className="pi pi-check-circle"></i>,
    label: "Ativo",
  },
  concluido: {
    style:
      "bg-success-primary-hover text-text-muted p-2 text-sm rounded-md font-bold",
    icon: <i className="pi pi-check-circle"></i>,
    label: "Concluido",
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

const EditalTable = ({ setIsEditalModalOpen, setIsVincularModalOpen }) => {
  const { edital, targetEdital, setTargetEdital, fetchEdital, editalBolsista, handleToggleBolsista } =
    useEditalContext();

  useEffect(() => {
    fetchEdital();
  }, []);

  const renderStatus = (row) => {
    const status = row.BolsistasEdital?.status;
    const item = tag[status];
    if (!item) return null;
    return (
      <div className={`flex gap-2 items-center ${item.style}`}>
        {item.icon}
        {item.label}
      </div>
    );
  };

  const renderActions = (rowData) => (
    <div className="flex flex-wrap gap-2">
      {targetEdital && (
        <TableButton
          tooltip={`Inativar bolsista`}
          icon={"pi pi-times"}
          iconPos="left"
          color="text-danger bg-white border-none"
          onClick={() => {
            handleToggleBolsista(rowData.id);
          }}
        />
      )}
    </div>
  );

const renderItems = [
    {
      label: "Novo Edital",
      icon: "pi pi-file-plus",
      className: "add-edital-btn bg-highlight hover:bg-highlight-hover",
      command: () => {
        setIsEditalModalOpen(true);
      },
    },
    {
      label: "Vincular Bolsista",
      icon: "pi pi-link",
      disabled: !targetEdital,
      className: "vinculate-bolsista-edital-btn bg-success-primary hover:bg-success-primary-hover",
      command: () => {
        setIsVincularModalOpen(true);
      },
    },
    {
      label: "Gerar Relatório",
      icon: "pi pi-address-book",
      className: "generate-relatory",
      disabled: !targetEdital,
      // command: () => {
      //   openRelatory();
      // },
    },
  ];

  return (
    <>
      <TableContainer>
        <TableHeader
          end={
            <div>
              <SelectField
                id="SelectEdital"
                label="Selecione o Edital"
                fieldsetClass={"text-end"}
                selectClass={"select text-end"}
                value={targetEdital || ""}
                onChange={(e) => {
                  setTargetEdital(e.target.value);
                }}
                defaultValue={"Selecione o Edital"}
                defaultDisabled={false}
                options={edital}
              />
            </div>
          }
          start={
            <div>
              <h1 className="text-center">Edital</h1>
            </div>
          }
        ></TableHeader>
        <DataTable
          id="BolsistaTable"
          value={editalBolsista}
          size="small"
          stripedRows
          rowClassName="hover:bg-gray-100 transition duration-200"
          header={<div className="relative flex justify-between items-center px-4">
                        <div className="sm:absolute sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%]">
                          <h1 className="font-bold text-nowrap">Painel de Munícipes</h1>
                        </div>
                        <div>
                          <p className="text-xs text-text-muted">total: {0}</p>
                        </div>
                        <div>
                          <SpeedDial
                            className="relative"
                            model={renderItems}
                            direction="down"
                            type="linear"
                            style={{ right: 0 }}
                          ></SpeedDial>
                        </div>
                      </div>}
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
            field="BolsistasEdital.status"
            header="Status"
            body={renderStatus}
            sortable
            className="text-sm text-text-muted p-4"
          />
          <Column
            field="BolsistasEdital.data_vinculo"
            header="Vinculo"
            sortable
            filter
            filterPlaceholder="Pesquisar data"
            filterMatchMode="contains"
            className="text-sm text-text-muted p-4 whitespace-nowrap"
            body={(rowData) =>
              new Date(rowData.BolsistasEdital.data_vinculo).toLocaleDateString(
                "pt-BR"
              )
            }
          />

          <Column
            field="BolsistasEdital.data_vinculo"
            header="Encerramento"
            sortable
            filter
            filterPlaceholder="Pesquisar data"
            filterMatchMode="contains"
            className="text-sm text-text-muted p-4 whitespace-nowrap"
            body={(rowData) =>
              !rowData.BolsistasEdital.prorrogated ? (
                new Date(rowData.BolsistasEdital.expire_at).toLocaleDateString(
                  "pt-BR"
                )
              ) : (
                <p className="text-success font-bold">Prorrogado</p>
              )
            }
          />

          <Column header="Ações" body={renderActions} />
        </DataTable>
                <Paginator
                  // first={query.page}
                  // rows={query.limit}
                  // totalRecords={total}
                  // rowsPerPageOptions={[10, 20, 30]}
                  // onPageChange={(e) =>
                  //   setQuery((prev) => ({
                  //     ...prev,
                  //     page: e.page,
                  //     limit: e.rows,
                  //   }))
                  // }
                />
      </TableContainer>

      {/* <Modal
        id="ToggleBolsista"
        title="Alterar Status do Bolsista?"
        onAcept={() => handleToggle(alterId)}
        aceptLabel="Alterar"
        onRefuse={() => setAlterModalOpen(false)}
        typeAction="btn-danger"
        isOpen={alterModalOpen}
      >
        <p className="text-danger font-bold mt-2">
          Tem certeza que deseja alterar esse item? Os dados alterados não
          poderão ser recuperados.
        </p>
      </Modal> */}
    </>
  );
};

EditalTable.propTypes = {
  setIsEditalModalOpen: PropTypes.func,
  setIsVincularModalOpen: PropTypes.func.isRequired,
};

export default EditalTable;
