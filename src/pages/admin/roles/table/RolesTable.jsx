import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import TableContainer from "@/components/shared/table/TableContainer";
import TableHeader from "@/components/shared/table/TableHeader";
import TableButton from "@/components/shared/table/TableButton";
import PropTypes from "prop-types";

const RolesTable = ({
  tableData,
  setOpenModalEdit,
  setModalData,
  setExcludeModalOpen,
  setExcludeModal,
}) => {
  const renderActions = (rowData) => (
    <div className="flex flex-wrap gap-2">
      <TableButton
        tooltip={`Editar`}
        icon={"pi pi-pen-to-square"}
        iconPos="left"
        color="text-text-secondary bg-white border-none"
        onClick={() => {
          setOpenModalEdit(true);
          setModalData(rowData);
        }}
      />

      <TableButton
        tooltip={`Excluir`}
        icon={"pi pi-trash"}
        iconPos="left"
        color="text-danger bg-white border-none"
        onClick={() => {
          setExcludeModalOpen(true);
          setExcludeModal(rowData.id);
        }}
      />
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full">
      <TableContainer>
        <TableHeader
          start={<h2 className="text-2xl font-semibold">Roles</h2>}
          end={
            <Button
              label="Cadastrar Role"
              className="btn-primary"
              onClick={() => {
                setModalData({});
                setOpenModalEdit(true);
              }}
            />
          }
        />
        <DataTable
          value={tableData}
          size="small"
          rowHover
          stripedRows
          tableClassName="mt-4"
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          tableStyle={{ minWidth: "40rem" }}
        >
          <Column field="id" header="#" />
          <Column field="name" header="Nome" />
          <Column
            header="Actions"
            headerClassName="w-36"
            body={(rowData) => renderActions(rowData)}
          />
        </DataTable>
      </TableContainer>
    </div>
  );
};

RolesTable.propTypes = {
  tableData: PropTypes.array.isRequired,
  setOpenModalEdit: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired,
  setExcludeModalOpen: PropTypes.func.isRequired,
  setExcludeModal: PropTypes.func.isRequired,
};

export default RolesTable;
