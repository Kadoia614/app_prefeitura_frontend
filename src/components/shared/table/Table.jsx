import { Paginator } from "primereact/paginator";
import Protypes from "prop-types";
import InputFieldLine from "../input/inputfield/InputFieldLine";
import TableHeader from "./TableHeader";
import TableContainer from "./TableContainer";
import { DataTable } from "primereact/datatable";
import { Skeleton } from "primereact/skeleton";
import { useLoadingContext } from "../../../context/loading/LoadingContext";

const Table = ({children, data, total, query, setQuery, header, id, inputPlaceholder}) => {
const { isLoading } = useLoadingContext();
    return (
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
                    header={
                      header
                    }
                  >
                    {children}
                  </DataTable>
                )}
        
                <Paginator
                  first={query.page * query.limit}
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
    )
}

export default Table

Table.propTypes = {
    children: Protypes.node.isRequired,
    data: Protypes.array.isRequired,
    total: Protypes.number.isRequired,
    query: Protypes.object.isRequired,
    setQuery: Protypes.func.isRequired,
    header: Protypes.node,
    id: Protypes.string
}