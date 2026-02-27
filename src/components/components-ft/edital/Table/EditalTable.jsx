import { useEffect } from "react";
import PropTypes from "prop-types";
import { SpeedDial } from "primereact/speeddial";

import TableButton from "@/components/shared/table/TableButton";

import { getRelatory } from "../../../../service/ft_appServices";

import { useUserContext } from "@/context/user/UserContext";
import { useEditalContext } from "../../../../context/ft/edital/EditalContext";
import RenderStatus from "../../../shared/RenderStatus";
import Table from "../../../shared/table/Table";

const EditalTable = ({ setIsEditalModalOpen, setIsVincularModalOpen }) => {
  const {
    edital,
    targetEdital,
    setTargetEdital,
    fetchEdital,
    editalBolsista,
    handleToggleBolsista,
    queryEdital,
    setQueryEdital,
  } = useEditalContext();
  let { permissions } = useUserContext();

  async function openRelatory() {
    const data = await getRelatory(targetEdital);

    const archive = URL.createObjectURL(data);

    window.open(archive, "_blank");
  }

  useEffect(() => {
    fetchEdital();
  }, []);

  const renderStatus = (rowData) => {
    switch (rowData.status) {
      case "ativo":
        return <RenderStatus type={"success"}> {rowData.status} </RenderStatus>;
      case "concluido":
        return <RenderStatus type={"info"}> {rowData.status} </RenderStatus>;
      case "inativo":
        return <RenderStatus type={"warning"}> {rowData.status} </RenderStatus>;
      case "pendente":
        return <RenderStatus type={"danger"}> {rowData.status} </RenderStatus>;
      case "expirado":
        return <RenderStatus type={"danger"}> {rowData.status} </RenderStatus>;
      default:
        return <RenderStatus type={"default"}> {rowData.status} </RenderStatus>;
    }
  };

  const renderActions = (rowData) => (
    <div className="flex flex-wrap gap-2">
      {targetEdital && permissions.edit && (
        <TableButton
          tooltip={`Inativar bolsista`}
          icon={"pi pi-times"}
          iconPos="left"
          color="table-button-danger"
          onClick={() => {
            handleToggleBolsista(rowData.id);
          }}
        />
      )}
    </div>
  );

  const renderItems = permissions?.write
    ? [
        {
          label: "Novo Edital",
          icon: "pi pi-file-plus",
          className: "add-edital-btn bg-highlight hover:bg-highlight-hover",
          command: () => {
            setIsEditalModalOpen(true);
          },
        },
        {
          label: "Vincular Bolsista",
          icon: "pi pi-link",
          disabled: !targetEdital,
          className:
            "vinculate-bolsista-edital-btn bg-success-primary hover:bg-success-primary-hover",
          command: () => {
            setQueryEdital((q) => ({
              ...q,
              page: 0,
              limit: 100000,
              search: "",
            }));
            setIsVincularModalOpen(true);
          },
        },
        {
          label: "Gerar Relatório",
          icon: "pi pi-address-book",
          className: "generate-relatory",
          disabled: !targetEdital,
          command: () => {
            openRelatory();
          },
        },
      ]
    : [
        {
          label: "Gerar Relatório",
          icon: "pi pi-address-book",
          className: "generate-relatory",
          disabled: !targetEdital,
          command: () => {
            openRelatory();
          },
        },
      ];

  //   Não coloca objeto para coluna
  const cols = [
    { key: "uuid", label: "Identificador" },
    { key: "nome", label: "Nome" },
    { key: "local", label: "Local" },

    {
      key: "status",
      label: "Status",
      body: (rowData) => renderStatus(rowData),
    },
    {
      key: "bolsistas_edital[0]?.data_vinculo",
      label: "Data de Encerramento",
    },
    {
      key: "bolsistas_edital[0]?.data_vinculo",
      label: "Data de vinculação",
    },
  ];

  return (
    <>
      <Table
        titulo={"Motoristas cadastrados"}
        adc={
          <SpeedDial
            className="custom-speed-dial"
            model={renderItems}
            direction="down"
            type="linear"
            style={{ right: 0 }}
          ></SpeedDial>
        }
        query={queryEdital}
        setQuery={setQueryEdital}
        data={editalBolsista.bolsistas}
        cols={cols}
        total={queryEdital.total}
        id={"MotoristasTable"}
        inputType={"select"}
        selectData={{
          value: targetEdital || "",
          data: edital,
          onChange: (e) => {
            setTargetEdital(e);
          },
        }}
        inputPlaceholder={"Buscar..."}
        actions={renderActions}
      ></Table>

      {/* <Modal
        id="ToggleBolsista"
        title="Alterar Status do Bolsista?"
        onAcept={() => handleToggle(alterId)}
        aceptLabel="Alterar"
        onRefuse={() => setAlterModalOpen(false)}
        typeAction="btn-danger"
        isOpen={alterModalOpen}
      >
        <p className="text-danger font-bold mt-2">
          Tem certeza que deseja alterar esse item? Os dados alterados não
          poderão ser recuperados.
        </p>
      </Modal> */}
    </>
  );
};

EditalTable.propTypes = {
  setIsEditalModalOpen: PropTypes.func,
  setIsVincularModalOpen: PropTypes.func.isRequired,
};

export default EditalTable;
