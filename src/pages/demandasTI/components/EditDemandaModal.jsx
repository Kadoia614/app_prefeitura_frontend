import { InputTextarea } from "primereact/inputtextarea";
import Modal from "../../../components/shared/modal/Modal";
import {updateDemanda} from '../../../service/demandasService';

const EditDemandaModal = ({ visible, onHide, demanda, fetchData, toast }) => {
  const [descricao, setDescricao] = useState(demanda?.descricao || "");

  const showToast = (severity, summary, detail) => {
    toast.current?.show({ severity, summary, detail, life: 3000 });
  };

  const handleUpdate = async () => {
    try {
      await updateDemanda(demanda.id, { ...demanda, descricao });
      showToast("success", "Demanda atualizada com sucesso", "");
      fetchData();
      onHide();
    } catch (error) {
      showToast("error", "Erro ao atualizar demanda", error.message);
    }
  };

  return (
    <Modal
      id="edit-demanda-modal"
      title="Editar Demanda"
      acept={handleUpdate}
      aceptLabel="Salvar"
      refuse={onHide}
      typeAction="p-button-success"
      open={visible}
      onClose={onHide}
    >
      <div className="w-full">
        <label htmlFor="descricao" className="block mb-2 text-sm font-medium text-gray-700">
          Descrição
        </label>
        <InputTextarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={4}
          className="w-full"
          autoResize
        />
      </div>
    </Modal>
  );
};

export default EditDemandaModal;
