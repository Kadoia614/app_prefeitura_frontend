import { Paginator } from "primereact/paginator";
import Protypes from "prop-types";
import InputFieldLine from "../input/inputfield/InputFieldLine";
import TableHeader from "./TableHeader";
import TableContainer from "./TableContainer";
import { DataTable } from "primereact/datatable";
import { Skeleton } from "primereact/skeleton";
import { useLoadingContext } from "../../../context/loading/LoadingContext";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";

const Table = ({
  query,
  setQuery,
  header,
  data,
  cols,
  total,
  id,
  inputPlaceholder,
  actions,
  titulo
}) => {
  const { isLoading } = useLoadingContext();
  return (
    <TableContainer>
      <TableHeader
        end={
          <div>
            {titulo}
          </div>
        }
        start={
          <>
            <InputFieldLine
              id="SearchCertidao"
              placeHolder={inputPlaceholder || "Buscar..."}
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
          id={id}
          value={data}
          size="small"
          stripedRows
          rowClassName="hover:bg-gray-100 transition duration-200"
          header={header}
        >
          {cols.map((col, i) => (
            <ColumnGroup
              key={i}
              field={col.key}
              header={col.label}
              body={col.body || false}
              className={col.classname || ""}
            ></ColumnGroup>
          ))}

          {actions ? <Column header="Ações" body={actions} /> : ""}
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
  );
};

export default Table;

Table.propTypes = {
  titulo: Protypes.string,
  data: Protypes.array.isRequired,
  total: Protypes.number.isRequired,
  query: Protypes.object.isRequired,
  setQuery: Protypes.func.isRequired,
  cols: Protypes.array.isRequired,
  header: Protypes.node,
  id: Protypes.string.isRequired,
  inputPlaceholder: Protypes.string,
  actions: Protypes.array,
};
