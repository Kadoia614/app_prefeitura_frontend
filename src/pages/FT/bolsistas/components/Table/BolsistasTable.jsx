import { useState } from "react";
import PropTypes from "prop-types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import SideBarBolsista from "../sidebar/SideBarBolsista";
import TableButton from "@/components/shared/table/TableButton";
import BolsistaTableHeader from "./BolsistaTableHeader";
import { useUserContext } from "@/context/user/UserContext";
import TableContainer from "../../../../../components/shared/table/TableContainer";

const tag = {
  ativo: {
    style: "bg-green-200/70 text-gray-500/70 p-2 text-sm rounded-md font-bold",
    icon: <i className="pi pi-check-circle">  </i>,
    label: "Ativo",
  },
  inativo: {
    style: "bg-amber-200/70 text-gray-500/70 p-2 text-sm rounded-md font-bold",
    icon: <i className="pi pi-exclamation-triangle"></i>,
    label: "Inativo",
  },
  pendente: {
    style: "bg-red-200/70 text-gray-500/70 p-2 text-sm rounded-md font-bold",
    icon: <i className="pi pi-exclamation-triangle"></i>,
    label: "Pendente",
  },
};

const BolsistasTable = ({
  tableData,
  setOpenModalEdit,
  setModalData,
  setExcludeModal,
  setExcludeModalOpen,
}) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [sideBarId, setSideBarId] = useState(null);
  const { user } = useUserContext();

  const scopo = user.scopo;

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

  const renderActions = (rowData) => (
    <div className="flex gap-2">
      <TableButton
        tooltip={`Editar`}
        icon={"pi pi-pen-to-square"}
        iconPos="left"
        color="text-primary-500 bg-white border-none"
        onClick={() => {
          setOpenModalEdit(true);
          setModalData(rowData);
        }}
      />
      <TableButton
        tooltip={`Documentos`}
        icon={"pi pi-file"}
        iconPos="left"
        color="text-primary-500 bg-white border-none"
        onClick={() => {
          setSideBarOpen(true);
          setSideBarId(rowData.id);
        }}
      />

      {(scopo == 1 || scopo == 2) && (
        <TableButton
          tooltip={`Excluir`}
          icon={"pi pi-trash"}
          color="text-red-500 bg-white border-none"
          onClick={() => {
            setExcludeModal(rowData.id), setExcludeModalOpen(true);
          }}
        />
      )}
    </div>
  );

  return (
    <>
      <TableContainer>
        <BolsistaTableHeader tag={tag} setOpenModalEdit={setOpenModalEdit} />

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
            field="status"
            header="Status"
            body={renderStatus}
            sortable
            className="text-sm text-gray-800 p-4"
          />
          <Column
            field="createdAt"
            header="Criação"
            sortable
            filter
            filterPlaceholder="Pesquisar data"
            filterMatchMode="contains"
            className="text-sm text-gray-800 p-4 whitespace-nowrap"
            body={(rowData) =>
              new Date(rowData.createdAt).toLocaleDateString("pt-BR")
            }
          />

          <Column header="Ações" body={renderActions} />
        </DataTable>
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
  tableData: PropTypes.array.isRequired,
  setOpenModalEdit: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired,
  setExcludeModal: PropTypes.func,
  setExcludeModalOpen: PropTypes.func,
  attIsLoading: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default BolsistasTable;
