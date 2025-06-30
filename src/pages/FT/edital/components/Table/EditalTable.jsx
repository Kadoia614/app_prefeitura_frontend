import { useState } from "react";
import PropTypes from "prop-types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { GiConfirmed } from "react-icons/gi";
import { CiWarning } from "react-icons/ci";
import { AiOutlineExclamation } from "react-icons/ai";
import { ImCross } from "react-icons/im";

import { useToast } from "@/components/shared/toast/ToastProvider";
import Modal from "@/components/shared/modal/Modal";
import TableContainer from "@/components/shared/table/TableContainer";
import TableButton from "@/components/shared/table/TableButton";
import EditalTableHeader from "./EditalTableHeader";

import { toggleBolsista } from "@/service/ft_appServices";

const tag = {
  ativo: {
    style: "bg-green-200/70 text-gray-500/70 p-2 text-sm rounded-md font-bold",
    icon: <GiConfirmed />,
    label: "Ativo",
  },
  concluido: {
    style: "bg-green-200/70 text-gray-500/70 p-2 text-sm rounded-md font-bold",
    icon: <GiConfirmed />,
    label: "Concluido",
  },
  inativo: {
    style: "bg-amber-200/70 text-gray-500/70 p-2 text-sm rounded-md font-bold",
    icon: <CiWarning />,
    label: "Inativo",
  },
  pendente: {
    style: "bg-red-200/70 text-gray-500/70 p-2 text-sm rounded-md font-bold",
    icon: <AiOutlineExclamation />,
    label: "Pendente",
  },
};

const EditalTable = ({
  tableData,
  setOpenModalEdit,
  setIsEditalModalOpen,
  fetchData,
  setIsLoading,
  selectedTable,
  setSelectedTable,
  setIsVincularModalOpen,
  tableOptions,
}) => {
  const [alterModalOpen, setAlterModalOpen] = useState(false);
  const [alterId, setAlterId] = useState(null);
  const { showToast } = useToast();

  const confirmToggle = (id) => {
    setAlterId(id);
    setAlterModalOpen(true);
  };

  const handleToggle = async (id) => {
    try {
      setIsLoading(true);
      await toggleBolsista(`${id}`, `${selectedTable}`);
      showToast("success", "Confirmado", "Bolsista alterado com sucesso");
      fetchData(selectedTable);
    } catch (err) {
      showToast(
        "error",
        "Erro",
        `Erro ao alterar bolsista: ${err.response.data.message}`
      );
    } finally {
      setAlterModalOpen(false);
      setIsLoading(false);
    }
  };

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
      {selectedTable && (
        <TableButton
          tooltip={`Inativar bolsista`}
          icon={<ImCross />}
          iconPos="left"
          color="text-yellow-500 bg-white border-none"
          onClick={() => {
            confirmToggle(rowData.id);
          }}
        />
      )}
    </div>
  );

  return (
    <>
      <TableContainer>
        <EditalTableHeader
          tag={tag}
          setOpenModalEdit={setOpenModalEdit}
          setIsEditalModalOpen={setIsEditalModalOpen}
          setIsVincularModalOpen={setIsVincularModalOpen}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
          tableOptions={tableOptions}
        />
        <DataTable
          id="BolsistaTable"
          value={tableData}
        size="small"
          paginator
          rows={25}
          stripedRows
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          rowClassName="hover:bg-gray-100 transition duration-200"
        >
          <Column
            field="id"
            header="Id"
            className="text-sm text-gray-800 p-4 whitespace-nowrap"
          />
          <Column
            field="nome"
            header="Nome"
            sortable
            filter
            filterPlaceholder="Pesquisar Nome"
            filterMatchMode="contains"
            className="text-sm text-gray-800 p-4"
          />
          <Column
            field="local"
            header="Local"
            sortable
            filter
            filterPlaceholder="Pesquisar Local"
            filterMatchMode="contains"
            className="text-sm text-gray-800 p-4"
          />
          <Column
            field="BolsistasEdital.status"
            header="Status"
            body={renderStatus}
            sortable
            className="text-sm text-gray-800 p-4"
          />
          <Column
            field="BolsistasEdital.data_vinculo"
            header="Vinculo"
            sortable
            filter
            filterPlaceholder="Pesquisar data"
            filterMatchMode="contains"
            className="text-sm text-gray-800 p-4 whitespace-nowrap"
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
            className="text-sm text-gray-800 p-4 whitespace-nowrap"
            body={(rowData) =>
              !rowData.BolsistasEdital.prorrogado ? (
                new Date(
                  rowData.BolsistasEdital.data_vencimento
                ).toLocaleDateString("pt-BR")
              ) : (
                <p className="text-green-500 font-bold">Prorrogado</p>
              )
            }
          />

          <Column header="Ações" body={renderActions} />
        </DataTable>
      </TableContainer>

      <Modal
        id="ToggleBolsista"
        title="Alterar Status do Bolsista?"
        onAcept={() => handleToggle(alterId)}
        aceptLabel="Alterar"
        onRefuse={() => setAlterModalOpen(false)}
        typeAction="btn-danger"
        isOpen={alterModalOpen}
      >
        <p className="text-red-500 font-bold mt-2">
          Tem certeza que deseja alterar esse item? Os dados alterados não
          poderão ser recuperados.
        </p>
      </Modal>
    </>
  );
};

EditalTable.propTypes = {
  tableData: PropTypes.array.isRequired,
  setOpenModalEdit: PropTypes.func.isRequired,
  setIsEditalModalOpen: PropTypes.func,
  setIsVincularModalOpen: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  selectedTable: PropTypes.any,
  setSelectedTable: PropTypes.func.isRequired,
  tableOptions: PropTypes.array.isRequired,
};

export default EditalTable;
