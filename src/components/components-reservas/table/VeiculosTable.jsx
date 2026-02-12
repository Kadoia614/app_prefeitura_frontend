import { useEffect, useState } from "react";
import Table from "../../shared/table/Table";
import RenderStatus from "../../shared/renderStatus";
import { useUserContext } from "../../../context/user/UserContext";
import { useVeiculoContext } from "../../../context/reservas/veiculo/VeiculoContext";
import { Button } from "primereact/button";
import TableButton from "../../shared/table/TableButton";
import VeiculoModal from "../modal/VeiculoModal";

const VeiculosTable = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  let {
    query,
    setQuery,
    veiculo,
    fetchVeiculo,
    total,
    setTarget,
    panel,
    setPanel,
  } = useVeiculoContext();

  const { permissions } = useUserContext();

  useEffect(() => {
    fetchVeiculo();
  }, [query]);

  const renderActions = (rowData) => (
    <div className="flex gap-2">
      {permissions.edit && (
        <>
          <TableButton
            tooltip={`Editar`}
            icon={"pi pi-pen-to-square"}
            iconPos="left"
            color="table-button-info"
            onClick={() => {
              setIsEditOpen(true);
              setTarget(rowData);
            }}
          />
        </>
      )}

      {permissions.del && (
        <TableButton
          tooltip={`Excluir`}
          icon={"pi pi-trash"}
          color="table-button-danger"
          onClick={() => {
            setTarget(rowData);
            // setExcludeModalOpen(true);
          }}
        />
      )}
    </div>
  );

  const status = (rowData) => {
    switch (rowData.status) {
      case "ativo":
        return <RenderStatus type={"success"}> {rowData.status} </RenderStatus>;
      case "manutencao":
        return <RenderStatus type={"warning"}> {rowData.status} </RenderStatus>;
      case "inativo":
        return <RenderStatus type={"danger"}> {rowData.status} </RenderStatus>;
      default:
        return <RenderStatus type={"default"}> {rowData.status} </RenderStatus>;
    }
  };
  //   Não coloca objeto para coluna
  const cols = [
    { key: "uuid", label: "Identificador" },
    { key: "placa", label: "Placa" },
    { key: "modelo", label: "Modelo" },
    { key: "marca", label: "Marca" },
    { key: "ano", label: "Ano" },
    { key: "cor", label: "Cor" },
    {
      key: "status",
      label: "Status",
      body: (rowData) => status(rowData),
    },
  ];

  return (
    <>
      {" "}
      <VeiculoModal isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
      <div className="flex md:flex-row flex-col w-full">
        <Table
          titulo={"Veiculos cadastrados"}
          onRowClick={(e) => {
            setPanel(e.data);
          }}
          adc={
            permissions.write && (
              <Button
                onClick={() => setIsEditOpen(true)}
                icon={"pi pi-plus"}
                className="btn-adc"
              />
            )
          }
          query={query}
          setQuery={setQuery}
          actions={renderActions}
          data={veiculo}
          cols={cols}
          total={total}
          id={"VeiculosTable"}
          inputPlaceholder={"Buscar..."}
        ></Table>
        <div className="w-5/12 bg-background shadow-sm rounded-md p-4">
          <div className="bg-background-muted p-4 rounded-md">
            <h3 className="text-xl text-center text-text-secondary py-4 font-bold text-primary">
              Informações
            </h3>
            {panel && (
              <div className="text-start">
                <p>
                  Placa:{" "}
                  {panel && (
                    <span className="text-text-muted">{panel.placa}</span>
                  )}
                </p>
                <p>
                  Modelo:{" "}
                  {panel && (
                    <span className="text-text-muted">{panel.modelo}</span>
                  )}
                </p>
                <p>
                  Marca:{" "}
                  {panel && (
                    <span className="text-text-muted">{panel.marca}</span>
                  )}
                </p>
                <p>
                  Ano:{" "}
                  {panel && (
                    <span className="text-text-muted">{panel.ano}</span>
                  )}
                </p>
                <p>
                  Cor:{" "}
                  {panel && (
                    <span className="text-text-muted">{panel.cor}</span>
                  )}
                </p>
              </div>
            )}
          </div>
          <div className="bg-background-muted p-4 rounded-md mt-2">
            <div>
              <h4 className="text-md text-center text-text-secondary py-4 font-bold text-primary">
                Agenda
              </h4>
              <p className="text-center text-text-muted animate-pulse">
                Em breve... Adicionar Calendar...
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VeiculosTable;
