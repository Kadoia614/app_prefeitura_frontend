import editableItem from "../../../assets/js/editableItem";
import { useMotoristaContext } from "../../../context/reservas/motorista/MotoristaContext";
import InputField from "../../shared/input/inputfield/InputField";
import InputFieldMask from "../../shared/input/inputfield/InputFieldMask";
import SelectField from "../../shared/input/SelectField";
import Modal from "../../shared/modal/Modal";
import PropTypes from "prop-types";

const MotoristaModal = ({ isOpen, setIsOpen }) => {
  let { clearTarget, setTarget, target, salvarMotorista } =
    useMotoristaContext();

  const colorConfig = {
    info: "text-info-foreground border-info-border",
    warning:
      "text-warning-foreground border-warning-border",
    success:
      "text-success-foreground border-success-border",
    danger:
      "text-danger-foreground border-danger-border",
    default:
      "text-neutral-foreground border-neutral-border",
  };
  
  const optionsStatus = [
    { name: "Ativo", value: "ativo", color: colorConfig.info },
    { name: "Inativo", value: "inativo", color: colorConfig.warning },
    { name: "Suspenso", value: "suspenso", color: colorConfig.danger },
  ];

  return (
    <Modal
      id="motoristaModal"
      title={"Cadastro de Motorista"}
      aceptLabel="Confirmar"
      onHide={()=>{clearTarget(); setIsOpen(false)}}
      refuseLabel="Cancelar"
      onRefuse={clearTarget}
      isOpen={isOpen}
      onAcept={() => salvarMotorista()}
      setIsOpen={setIsOpen}
    >
      <div className="py-2">
        <SelectField id="MotoristaStatus" options={optionsStatus} selectClass={`font-bold max-w-50 ${optionsStatus.find((option) => option.value === target?.status)?.color}`} value={target?.status} valueKey="value" labelOptions="name" onChange={(e) => editableItem("status", e.target.value, setTarget)} label="Status"></SelectField>
      </div>
      <div className="flex flex-row flex-wrap">
        <InputField
          fieldClass={"md:w-6/12 w-12/12 md:pr-2"}
          id="MotoristaNome"
          value={target?.nome}
          onChange={(e) => editableItem("nome", e.target.value, setTarget)}
          label="Nome"
        ></InputField>
        <InputField
          fieldClass={"md:w-6/12 w-12/12 md:pl-2"}
          id="MotoristaCNH"
          value={target?.cnh}
          onChange={(e) => editableItem("cnh", e.target.value, setTarget)}
          label="CNH"
        ></InputField>
        <InputFieldMask
          fieldClass={"md:w-6/12 w-12/12 md:pr-2"}
          id="MotoristaTelefone"
          mask="(99) 99999-9999"
          value={target?.telefone}
          onChange={(e) => editableItem("telefone", e.target.value, setTarget)}
          label="Telefone"
        ></InputFieldMask>
        <InputField
          fieldClass={"w-12/12"}
          id="MotoristaEmail"
          value={target?.email}
          onChange={(e) => editableItem("email", e.target.value, setTarget)}
          label="Email"
        ></InputField>
      </div>
    </Modal>
  );
};

MotoristaModal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default MotoristaModal;
