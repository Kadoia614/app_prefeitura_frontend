import { useEffect } from "react";
import PropTypes from "prop-types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { SpeedDial } from "primereact/speeddial";
import { Paginator } from "primereact/paginator";

import TableContainer from "@/components/shared/table/TableContainer";
import TableButton from "@/components/shared/table/TableButton";
import TableHeader from "../../../../shared/table/TableHeader";

import InputFieldLine from "../../../../shared/input/inputfield/InputFieldLine";
import SelectField from "../../../../shared/input/SelectField";

import { getRelatory } from "../../../../../service/ft_appServices";

import { useUserContext } from "@/context/user/UserContext";
import { useEditalContext } from "../../../../../context/ft/edital/EditalContext";

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
  expirado: {
    style: "bg-red-200/70 text-text-muted p-2 text-sm rounded-md font-bold",
    icon: <i className="pi pi-exclamation-triangle"></i>,
    label: "Expirado",
  },
  pendente: {
    style: "bg-red-200/70 text-text-muted p-2 text-sm rounded-md font-bold",
    icon: <i className="pi pi-exclamation-triangle"></i>,
    label: "Pendente",
  },
};

const EditalTable = ({ setIsEditalModalOpen, setIsVincularModalOpen }) => {
  const {
    edital,
    targetEdital,
    setTargetEdital,
    fetchEdital,
    editalBolsista,
    handleToggleBolsista,
    queryEdital,
    setQueryEdital,
  } = useEditalContext();
  let { permissions } = useUserContext();

  async function openRelatory() {
    const data = await getRelatory(targetEdital);

    const archive = URL.createObjectURL(data);

    window.open(archive, "_blank");
  }

  useEffect(() => {
    fetchEdital();
  }, []);

  const renderStatus = (row) => {
    const status = row.bolsistas_edital[0]?.status;
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
      {targetEdital && permissions.edit && (
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

  const renderItems = permissions?.write
    ? [
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
          className:
            "vinculate-bolsista-edital-btn bg-success-primary hover:bg-success-primary-hover",
          command: () => {
            setQueryEdital((q) => ({
              ...q,
              page: 0,
              limit: 100000,
              search: "",
            }));
            setIsVincularModalOpen(true);
          },
        },
        {
          label: "Gerar Relatório",
          icon: "pi pi-address-book",
          className: "generate-relatory",
          disabled: !targetEdital,
          command: () => {
            openRelatory();
          },
        },
      ]
    : [
        {
          label: "Gerar Relatório",
          icon: "pi pi-address-book",
          className: "generate-relatory",
          disabled: !targetEdital,
          command: () => {
            openRelatory();
          },
        },
      ];

  return (
    <>
      <TableContainer>
        <TableHeader
          start={
            <>
              <InputFieldLine
                id="SearchCertidao"
                placeHolder={"Buscar Bolsista por CPF ou nome"}
                value={queryEdital.search}
                onChange={(e) =>
                  setQueryEdital((q) => ({
                    ...q,
                    search: e.target.value,
                    page: 0,
                  }))
                }
              ></InputFieldLine>
            </>
          }
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
          center={
            <div>
              <h1 className="text-center">Edital</h1>
            </div>
          }
        ></TableHeader>
        <DataTable
          id="BolsistaTable"
          value={editalBolsista.bolsistas}
          size="small"
          stripedRows
          rowClassName="hover:bg-gray-100 transition duration-200"
          header={
            <div className="relative flex justify-between items-center px-4">
              <div className="sm:absolute sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%]">
                <h1 className="font-bold text-nowrap">Painel de Munícipes</h1>
              </div>
              <div>
                <p className="text-xs text-text-muted">
                  total: {editalBolsista.count || 0}
                </p>
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
            field="bolsistas_edital[0].status"
            header="Status"
            body={renderStatus}
            sortable
            className="text-sm text-text-muted p-4"
          />
          <Column
            field="bolsistas_edital[0]?.data_vinculo"
            header="Vinculo"
            sortable
            filter
            filterPlaceholder="Pesquisar data"
            filterMatchMode="contains"
            className="text-sm text-text-muted p-4 whitespace-nowrap"
            body={(rowData) =>
              new Date(
                rowData.bolsistas_edital[0]?.data_vinculo
              ).toLocaleDateString("pt-BR")
            }
          />

          <Column
            field="bolsistas_edital[0]?.data_vinculo"
            header="Encerramento"
            sortable
            filter
            filterPlaceholder="Pesquisar data"
            filterMatchMode="contains"
            className="text-sm text-text-muted p-4 whitespace-nowrap"
            body={(rowData) =>
              !rowData.bolsistas_edital[0]?.prorrogated ? (
                new Date(
                  rowData.bolsistas_edital[0]?.expire_at
                ).toLocaleDateString("pt-BR")
              ) : (
                <p className="text-success font-bold">Prorrogado</p>
              )
            }
          />
          {permissions && <Column header="Ações" body={renderActions} />}
        </DataTable>
        <Paginator
          first={queryEdital.page * queryEdital.limit}
          rows={queryEdital.limit}
          totalRecords={editalBolsista.count}
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={(e) =>
            setQueryEdital((prev) => ({
              ...prev,
              page: e.page,
              limit: e.rows,
            }))
          }
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
