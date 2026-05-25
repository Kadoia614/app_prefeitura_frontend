import { useEffect, useState } from "react";
import Table from "../../shared/table/Table";
import RenderStatus from "../../shared/RenderStatus";
import { useMotoristaContext } from "../../../context/reservas/motorista/MotoristaContext";
import { useUserContext } from "../../../context/user/UserContext";
import MotoristaModal from "../modal/MotoristaModal";
import TableButton from "../../shared/table/TableButton";
import { Button } from "primereact/button";

const MotoristasTable = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  let {
    query,
    setQuery,
    motorista,
    fetchMotorista,
    total,
    setTarget,
    panel,
    setPanel,
  } = useMotoristaContext();
  const { permissions } = useUserContext();

  useEffect(() => {
    fetchMotorista();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      case "inativo":
        return <RenderStatus type={"warning"}> {rowData.status} </RenderStatus>;
      case "suspenso":
        return <RenderStatus type={"danger"}> {rowData.status} </RenderStatus>;
      default:
        return <RenderStatus type={"default"}> {rowData.status} </RenderStatus>;
    }
  };
  //   Não coloca objeto para coluna
  const cols = [
    { key: "uuid", label: "Identificador" },
    { key: "nome", label: "Nome" },
    { key: "cnh", label: "CNH" },
    {
      key: "status",
      label: "Status",
      body: (rowData) => status(rowData),
    },
  ];

  return (
    <>
      <MotoristaModal isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
      <div className="flex md:flex-row flex-col w-full">
        <Table
          titulo={"Motoristas cadastrados"}
          onRowClick={(e) => {
            setPanel(e.data);
          }}
          adc={
            permissions.write && 
              <Button onClick={()=>setIsEditOpen(true)} icon={"pi pi-plus"} className="btn-adc"/>
            
          }
          query={query}
          setQuery={setQuery}
          data={motorista}
          cols={cols}
          total={total}
          id={"MotoristasTable"}
          inputPlaceholder={"Buscar..."}
          actions={renderActions}
        ></Table>
        <div className="w-5/12 bg-background shadow-sm rounded-md p-4">
          <div className="bg-background-muted p-4 rounded-md">
            <h3 className="text-xl text-center text-text-secondary py-4 font-bold text-primary">
              Informações
            </h3>{
              panel &&
            <div className="text-start">
              <p>Nome: {panel && <span className="text-text-muted">{panel.nome}</span>}</p>
              <p>
                CNH:{" "}
                {panel && <span className="text-text-muted">{panel.cnh}</span>}
              </p>
              <p>
                Status:{" "}
                {panel && (
                  <span className="text-text-muted">{panel.status}</span>
                )}
              </p>
              <p>
                Telefone:{" "}
                {panel && (
                  <span className="text-text-muted">{panel.telefone}</span>
                )}
              </p>
              <p>
                E-mail:{" "}
                {panel && (
                  <span className="text-text-muted">{panel.email}</span>
                )}
              </p>
            </div>}
          </div>
          <div className="bg-background-muted p-4 rounded-md mt-2">
            <div>
              <h4 className="text-md text-center text-text-secondary py-4 font-bold text-primary">
                Agenda
              </h4>
              <p className="text-center text-text-muted animate-pulse">
                Em breve...
                Adicionar Calendar...
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MotoristasTable;
