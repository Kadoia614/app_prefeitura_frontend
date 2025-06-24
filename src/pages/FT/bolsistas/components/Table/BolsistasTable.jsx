import { useState } from "react";
import PropTypes from "prop-types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { IoIosDocument } from "react-icons/io";
import { FaTrash, FaEdit } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { CiWarning } from "react-icons/ci";
import { AiOutlineExclamation } from "react-icons/ai";

import SideBarBolsista from "../sidebar/SideBarBolsista";
import { useToast } from "@/components/shared/toast/ToastProvider";
import Modal from "@/components/shared/modal/Modal";
import TableContainer from "@/components/shared/table/TableContainer";
import TableButton from "@/components/shared/table/TableButton";
import BolsistaTableHeader from "./BolsistaTableHeader";
import { useUserContext } from "@/context/UserContext";

import { deleteBolsista } from "@/service/ft_appServices";

const tag = {
  ativo: {
    style: "bg-green-200/70 text-gray-500/70 p-2 text-sm rounded-md font-bold",
    icon: <GiConfirmed />,
    label: "Ativo",
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

const BolsistasTable = ({
  tableData,
  setOpenModalEdit,
  setModalData,
  fetchData,
  setIsLoading,
}) => {
  const [excludeModalOpen, setExcludeModalOpen] = useState(false);
  const [excludeId, setExcludeId] = useState(null);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [sideBarId, setSideBarId] = useState(null);
  const { showToast } = useToast();
  const { scopo } = useUserContext();

  const confirmDelete = (id) => {
    setExcludeId(id);
    setExcludeModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await deleteBolsista(`${id}`);
      showToast("success", "Confirmado", "Bolsista deletado com sucesso");
      fetchData();
    } catch (err) {
      showToast("error", "Erro", `Erro ao deletar bolsista: ${err.response.data.message}`);
    } finally {
      setExcludeModalOpen(false);
      setIsLoading(false);
    }
  };

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
    <div className="flex flex-wrap gap-2">
      <TableButton
        tooltip={`Editar`}
        tooltip={`Editar`}
        icon={<FaEdit />}
        iconPos="left"
        color="text-primary-500 bg-white border-none"
        onClick={() => {
          setOpenModalEdit(true);
          setModalData(rowData);
        }}
      />
      <TableButton
        tooltip={`Documentos`}
        tooltip={`Documentos`}
        icon={<IoIosDocument />}
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
          icon={<FaTrash />}
          color="text-red-500 bg-white border-none"
          onClick={() => confirmDelete(rowData.id)}
        />
      )}
    </div>
  );

  return (
    <>
      <TableContainer>
        <BolsistaTableHeader
          tag={tag}
          setOpenModalEdit={setOpenModalEdit}
        />

        <DataTable
          id="BolsistaTable"
          value={tableData}
          paginator
          rows={25}
          stripedRows
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          className="min-w-full p-4"
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

      <Modal
        id="ExcludeModalBolsista"
        title="Excluir Bolsista?"
        acept={() => handleDelete(excludeId)}
        aceptLabel="Excluir"
        refuse={() => setExcludeModalOpen(false)}
        typeAction="btn-danger"
        open={excludeModalOpen}
      >
        <p className="text-red-500 font-bold mt-2">
          Tem certeza que deseja excluir esse item? Os dados excluídos não
          poderão ser recuperados.
        </p>
      </Modal>

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
  setIsLoading: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default BolsistasTable;
