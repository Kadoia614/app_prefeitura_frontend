import editableItem from "../../../assets/js/editableItem";
import { useVeiculoContext } from "../../../context/reservas/veiculo/VeiculoContext";
import InputField from "../../shared/input/inputfield/InputField";
import SelectField from "../../shared/input/SelectField";
import Modal from "../../shared/modal/Modal";
import PropTypes from "prop-types";

const VeiculoModal = ({ isOpen, setIsOpen }) => {
  let { clearTarget, setTarget, target, salvarVeiculo } = useVeiculoContext();

  const colorConfig = {
    info: "text-info-foreground border-info-border",
    warning: "text-warning-foreground border-warning-border",
    success: "text-success-foreground border-success-border",
    danger: "text-danger-foreground border-danger-border",
    default: "text-neutral-foreground border-neutral-border",
  };
  const optionsStatus = [
    { name: "Ativo", value: "ativo", color: colorConfig.info },
    { name: "Inativo", value: "inativo", color: colorConfig.warning },
    { name: "manutencao", value: "Manutencao", color: colorConfig.danger },
  ];

  return (
    <Modal
      id="veiculoModal"
      title={"Cadastro de Veiculos"}
      aceptLabel="Confirmar"
      onHide={()=>{clearTarget(); setIsOpen(false)}}
      refuseLabel="Cancelar"
      onRefuse={clearTarget}
      isOpen={isOpen}
      isDisabled={!(target?.status && target?.placa && target?.modelo && target?.marca && target?.ano && target?.cor) ? true : false}
      onAcept={() => salvarVeiculo()}
      setIsOpen={setIsOpen}
    >
      <div className="py-2">
        <SelectField
          id="VeiculoStatus"
          options={optionsStatus}
          selectClass={`font-bold max-w-50 ${optionsStatus.find((option) => option.value === target?.status)?.color}`}
          value={target?.status}
          valueKey="value"
          labelOptions="name"
          onChange={(e) => editableItem("status", e.target.value, setTarget)}
          label="Status"
        ></SelectField>
      </div>
      <div className="flex flex-row flex-wrap">
        <InputField
          fieldClass={"md:w-6/12 w-12/12 md:pr-2"}
          id="VeiculoPlaca"
          value={target?.placa}
          invalid={!target?.placa}
          onChange={(e) => editableItem("placa", e.target.value.toUpperCase(), setTarget)}
          maxLength={8}
          placeHolder={"ABC-1234 ou ABC1D23"}
          label="Placa (ABC-1234 ou ABC1D23)"
        ></InputField>
        <InputField
          fieldClass={"md:w-6/12 w-12/12 md:pl-2"}
          id="VeiculoModelo"
          value={target?.modelo}
          invalid={!target?.modelo}
          onChange={(e) => editableItem("modelo", e.target.value, setTarget)}
          label="Modelo"
        ></InputField>
        <InputField
          fieldClass={"md:w-6/12 w-12/12 md:pr-2"}
          id="VeiculoMarca"
          value={target?.marca}
          invalid={!target?.marca}
          onChange={(e) => editableItem("marca", e.target.value, setTarget)}
          label="Marca"
        ></InputField>
        <InputField
          fieldClass={"w-12/12"}
          id="VeiculoAno"
          value={target?.ano}
          invalid={!target?.ano}
          onChange={(e) => editableItem("ano", e.target.value, setTarget)}
          label="Ano"
        ></InputField>
        <InputField
          fieldClass={"w-12/12"}
          id="VeiculoCor"
          value={target?.cor}
          invalid={!target?.cor}
          onChange={(e) => editableItem("cor", e.target.value, setTarget)}
          label="Cor"
        ></InputField>
      </div>
    </Modal>
  );
};

VeiculoModal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default VeiculoModal;
