import { Divider } from "primereact/divider";
import PanelComponent from "../../shared/PanelComponent";
import PropTypes from "prop-types";
import RenderStatus from "../../shared/RenderStatus";

const ReservaSidePanel = ({ panelData, header }) => {
  const status = (rowData) => {
    switch (rowData.status) {
      case "concluido":
        return <RenderStatus type={"info"}> {rowData.status} </RenderStatus>;
      case "solicitado":
        return <RenderStatus type={"warning"}> {rowData.status} </RenderStatus>;
      case "confirmado":
        return <RenderStatus type={"success"}> {rowData.status} </RenderStatus>;
      case "cancelado":
        return <RenderStatus type={"danger"}> {rowData.status} </RenderStatus>;
      default:
        return <RenderStatus type={"default"}> {rowData.status} </RenderStatus>;
    }
  };

  return (
    <PanelComponent
      header={header}
      className={"md:w-5/12 w-1/1 bg-background shadow-sm rounded-md p-4"}
    >
      <div className="">
        <div className="bg-background-muted p-4 rounded-md">
          {panelData && (
            <div className="text-start">
              <div className="mb-6">
                {status(
                  panelData.status ? panelData : { status: "Não selecionado" },
                )}
              </div>
              <div>
                ID: {<span className="text-primary">{panelData.uuid}</span>}
              </div>
              <div>
                Data:{" "}
                {
                  <span className="text-text-muted">
                    {panelData.data_agendamento}
                  </span>
                }
              </div>
              <div>
                Inicio:{" "}
                {
                  <span className="text-text-muted">
                    {panelData.hora_inicio}
                  </span>
                }
              </div>
              <div>
                Fim:{" "}
                {<span className="text-text-muted">{panelData.hora_fim}</span>}
              </div>
              <div>
                Local de saída:{" "}
                {<span className="text-text-muted">{panelData.origem}</span>}
              </div>
              <div>
                Local final:{" "}
                {<span className="text-text-muted">{panelData.destino}</span>}
              </div>
              <div>
                Motorista:{" "}
                {
                  <span className="text-text-muted">
                    {panelData.motorista?.nome || "Sem motorista"}
                  </span>
                }
              </div>
              <div>
                Veiculo:{" "}
                {
                  <span className="text-text-muted">
                    {panelData.veiculo?.placa || "Sem veiculo"}
                  </span>
                }
              </div>
              <Divider></Divider>
              <div>
                Observações:{" "}
                {
                  <div className="text-text-muted max-h-50 overflow-auto p-2 bg-background">
                    {panelData.observacao || "Sem observação"}
                  </div>
                }
              </div>
            </div>
          )}
        </div>
        <Divider></Divider>
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
    </PanelComponent>
  );
};

ReservaSidePanel.propTypes = {
  panelData: PropTypes.shape({
    status: PropTypes.string,
    uuid: PropTypes.string,
    data_agendamento: PropTypes.string,
    hora_inicio: PropTypes.string,
    hora_fim: PropTypes.string,
    origem: PropTypes.string,
    destino: PropTypes.string, // Add PropTypes for the 'destino' property
    observacao: PropTypes.string,
    motorista: PropTypes.shape({
      nome: PropTypes.string,
    }),
    veiculo: PropTypes.shape({
      placa: PropTypes.string,
    }),
  }),
  header: PropTypes.any,
};

export default ReservaSidePanel;
