import { useState } from "react";
import SelectField from "@/components/shared/input/SelectField";
import { Button } from "primereact/button";
import SideBarBolsista from "./SideBarBolsista";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IoIosDocument } from "react-icons/io";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

import { useToast } from "@/components/shared/toast/ToastProvider";
import Modal from "@/components/shared/modal/Modal";
import TableContainer from "@/components/layout/TableContainer";

import TableButton from "@/components/shared/table/TableButton";
import TableHeader from "../../../../../components/shared/table/TableHeader";
import { deleteBolsista } from "@/service/ft_appServices";

import PropTypes from "prop-types";

const BolsistasTable = ({
  tableData,
  setOpenModalEdit,
  setModalData,
  scopo,
  fetchData,
  setIsLoading,
  selectedTable,
  setSelectedTable,
  tableOptions,
}) => {
  let [excludeModalOpen, setExcludeModalOpen] = useState(false);
  let [excludeModal, setExcludeModal] = useState(null);
  const [sideBarStatus, setSideBarStatus] = useState(false);
  const [sideBarData, setSideBarData] = useState({});

  const { showToast } = useToast();

  // To delete some item
  const toDelete = (id) => {
    setExcludeModal(id);
    setExcludeModalOpen(true);
  };

  const handleRemove = async (id) => {
    try {
      setIsLoading(true);
      await deleteBolsista(`${id}`);

      showToast("success", "Confirmed", "Bolsista Deletado com sucesso");
      setExcludeModalOpen(false);
      fetchData();
    } catch (error) {
      showToast(
        "error",
        "Error",
        "Não foi possível deletar o bolsista: " + error
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TableContainer>
        <TableHeader
          start={
            <SelectField
              id="SelectEdital"
              label="Selecione o Edital"
              selectClass={"select"}
              value={selectedTable}
              onChange={(e) => {
                setSelectedTable(e.target.value);
              }}
              defaultValue={" Bolsistas"}
              defaultDisabled={false}
              options={tableOptions}
            />
          }
          end={
            <>
              {" "}
              <Button
                label="Cadastrar Bolsista"
                className="btn-primary"
                onClick={() => {
                  setOpenModalEdit(true);
                }}
              />
            </>
          }
        ></TableHeader>
        <DataTable
          id="BolistaTable"
          value={tableData}
          paginator
          rows={25}
          stripedRows
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          className="min-w-full p-4"
          rowClassName="hover:bg-gray-100 transition duration-200"
        >
          <Column
            headerClassName="p-2"
            field="id"
            header="Id"
            className="text-sm text-gray-800 p-4 whitespace-nowrap"
          />

          <Column
            headerClassName="p-2"
            field="nome"
            header="Nome"
            sortable
            filter
            filterPlaceholder="Pesquisar Nome"
            filterMatchMode="contains"
            className="text-sm text-gray-800 p-4"
          />
          <Column
            headerClassName="p-2"
            field="local"
            header="Local"
            sortable
            filter
            filterPlaceholder="Pesquisar Local"
            filterMatchMode="contains"
            className="text-sm text-gray-800 p-4"
          />
          <Column
            headerClassName="p-2"
            field="vencimento"
            header="Vencimento"
            sortable
            filter
            filterPlaceholder="Pesquisar status"
            filterMatchMode="contains"
            className="text-sm text-gray-800 p-4"
          />
          <Column
            headerClassName="p-2"
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
          {scopo == 1 || scopo == 2 ? (
            <Column
              header="Ações"
              body={(rowData) => (
                <div className="flex flex-wrap gap-2">
                  <TableButton
                    label="Editar"
                    icon={<FaEdit />}
                    iconPos="left"
                    color="text-white bg-primary-500 hover:bg-primary-700"
                    onClick={() => {
                      setOpenModalEdit(true);
                      setModalData(rowData);
                    }}
                  />
                  <TableButton
                    label="Documentos"
                    icon={<IoIosDocument />}
                    iconPos="left"
                    color="text-white bg-primary-500 hover:bg-primary-700"
                    onClick={() => {
                      setSideBarStatus(true);
                      setSideBarData(rowData.id);
                    }}
                  />
                  {(scopo == 1 || scopo == 2) && (
                    <TableButton
                      icon={<FaTrash />}
                      label="Deletar"
                      color="text-white bg-red-500 hover:bg-red-700"
                      onClick={() => {
                        toDelete(rowData.id);
                      }}
                    />
                  )}
                </div>
              )}
            />
          ) : (
            ""
          )}
        </DataTable>
      </TableContainer>

      {/* Exclude Confirmation Dialog */}
      <Modal
        id={"ExcludeModalBolsista"}
        title={"Excluir Bolsista?"}
        acept={() => handleRemove(excludeModal)}
        aceptLabel={"Excluir"}
        refuse={() => setExcludeModalOpen(false)}
        typeAction={"btn-danger"}
        open={excludeModalOpen}
        onClose={() => setExcludeModalOpen(false)}
      >
        <p className="text-red-500 font-bold mt-2">
          Tem certeza que deseja excluir esse item? Os dados excluídos não
          poderão ser recuperados.
        </p>
      </Modal>

      <SideBarBolsista
        sideBarStatus={sideBarStatus}
        setSideBarStatus={setSideBarStatus}
        sideBarData={sideBarData}
      />
    </>
  );
};

BolsistasTable.propTypes = {
  tableData: PropTypes.array.isRequired,
  setOpenModalEdit: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setSideBarStatus: PropTypes.func.isRequired,
  setSideBarData: PropTypes.func.isRequired,
  scopo: PropTypes.any.isRequired,
  fetchData: PropTypes.func.isRequired,
  selectedTable: PropTypes.any.isRequired,
  setSelectedTable: PropTypes.func.isRequired,
  tableOptions: PropTypes.array.isRequired,
};

export default BolsistasTable;
