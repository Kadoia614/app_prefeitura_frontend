import TableContainer from "@/components/shared/table/TableContainer";
import TableHeader from "@/components/shared/table/TableHeader";
import TableButton from "@/components/shared/table/TableButton";

import { Paginator } from "primereact/paginator";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";

import { useUserContext } from "../../../../context/user/UserContext";
import { useSportContext } from "../../../../context/sport/SportContext";

import PropTypes from 'prop-types';

const mocked = [
  {
    id: 1,
    name: "Atleta 1",
    birthday: "27/07/2001",
    cpf: "123.456.789-00",
    bithday: "1990-01-01",
    tel: "(11) 99999-9999",
    email: "(11) 99999-9999",
    // address
    cep: "06853450",
    numero: "123",
    logradouro: "Rua Terra Nova",
    bairro: "jd Itapecerica",
    cidade: "Itapecerica da serra",
    uf: "SP",

    status: "ativo",
    creator: "kadoia",
  },
  {
    id: 2,
    name: "Atleta 1",
    birthday: "27/07/2001",
    cpf: "123.456.789-00",
    bithday: "1990-01-01",
    tel: "(11) 99999-9999",
    email: "(11) 99999-9999",
    // address
    cep: "06853450",
    numero: "123",
    logradouro: "Rua Terra Nova",
    bairro: "jd Itapecerica",
    cidade: "Itapecerica da serra",
    uf: "SP",

    status: "ativo",
    creator: "kadoia",
  },
  {
    id: 3,
    name: "Atleta 1",
    birthday: "27/07/2001",
    cpf: "123.456.789-00",
    bithday: "1990-01-01",
    tel: "(11) 99999-9999",
    email: "(11) 99999-9999",
    // address
    cep: "06853450",
    numero: "123",
    logradouro: "Rua Terra Nova",
    bairro: "jd Itapecerica",
    cidade: "Itapecerica da serra",
    uf: "SP",

    status: "ativo",
    creator: "kadoia",
  },
  {
    id: 4,
    name: "Atleta 1",
    birthday: "27/07/2001",
    cpf: "123.456.789-00",
    bithday: "1990-01-01",
    tel: "(11) 99999-9999",
    email: "(11) 99999-9999",
    // address
    cep: "06853450",
    numero: "123",
    logradouro: "Rua Terra Nova",
    bairro: "jd Itapecerica",
    cidade: "Itapecerica da serra",
    uf: "SP",

    status: "ativo",
    creator: "kadoia",
  },
];

const Table = ({ setEditOpen, setExcludeOpen }) => {
  const { permissions } = useUserContext();
  const { setAtletaTarget } = useSportContext();

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
              setAtletaTarget(rowData);
              setEditOpen(true);
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
            setAtletaTarget(rowData);
            setExcludeOpen(true);
          }}
        />
      )}
    </div>
  );

  const renderItems = [
    {
      label: "Adicionar Bolsista",
      icon: "pi pi-user",
      className: "add-atleta-btn bg-primary hover:bg-primary-hover",
      command: () => {
        setEditOpen(true);
      },
    },
  ];

  return (
    <>
      {console.log(permissions)}
      <TableContainer>
        <TableHeader>Esporte</TableHeader>
        <DataTable
          id="BolsistaTable"
          value={mocked}
          size="small"
          stripedRows
          rowClassName="hover:bg-gray-100 transition duration-200"
          header={
            <div className="relative flex justify-between items-center px-4">
              <div className="sm:absolute sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%]">
                <h1 className="font-bold text-nowrap">Painel de Atletas</h1>
              </div>
              <div>
                {/* <p className="text-xs text-text-muted">total: {total}</p> */}
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
            field="id"
            header="Id"
            className="text-sm text-text-muted p-4 whitespace-nowrap"
          />
          <Column
            field="name"
            header="Nome"
            className="text-sm text-text-muted p-4"
          />
          <Column
            field="cpf"
            header="CPF"
            className="text-sm text-text-muted p-4"
          />
          <Column
            field="bairro"
            header="Endereço"
            className="text-sm text-text-muted p-4"
          />
          <Column
            field="birthday"
            header="nascimento"
            className="text-sm text-text-muted p-4"
          />
          <Column
            field="status"
            header="Status"
            // body={renderStatus}
            className="text-sm text-text-muted p-4"
          />

          <Column
            field="creator"
            header="Criado por"
            className="text-sm text-text-muted p-4 whitespace-nowrap"
          />
          {permissions && <Column header="Ações" body={renderActions} />}
        </DataTable>

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

export default Table;

Table.propTypes = {
  setEditOpen: PropTypes.func.isRequired,
  setExcludeOpen: PropTypes.func.isRequired,
};