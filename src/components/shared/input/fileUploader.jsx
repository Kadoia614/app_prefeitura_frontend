import PropTypes from "prop-types";
import { useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { useToast } from "@/components/shared/toast/ToastProvider";

const FileUploader = ({ type, maxSize, label, icon, upload, inputClass }) => {
  const { showToast } = useToast();

  const [fileStatus, setFileStatus] = useState({
    name: "",
    status: "pendente", // "pendente" | "sucesso" | "erro"
  });

  const handleUpload = async (event) => {
    const { files } = event;

    if (!files || !files.length) {
      showToast("error", "Erro", "Nenhum arquivo selecionado");
      return;
    }

    const file = files[0];
    setFileStatus({ name: file.name, status: "pendente" });

    const formData = new FormData();
    formData.append(type, file);

    try {
      await upload(formData);
      setFileStatus({ name: file.name, status: "sucesso" });
      showToast("success", "Sucesso", "Upload realizado com sucesso");
    } catch (error) {
      setFileStatus({ name: file.name, status: "erro" });
      showToast("error", "Erro", "Erro ao fazer upload: " + error.message);
    }
  };

  const itemTemplate = () => {
    if (!fileStatus.name) return null;

    let bgClass = "bg-yellow-100 text-yellow-800";
    let label = "Pendente";

    if (fileStatus.status === "sucesso") {
      bgClass = "bg-green-100 text-green-800";
      label = "Enviado";
    } else if (fileStatus.status === "erro") {
      bgClass = "bg-red-100 text-red-800";
      label = "Erro";
    }

    return (
      <div className="flex items-center justify-between p-2 border rounded shadow-sm">
        <span className="text-sm font-medium truncate">{fileStatus.name}</span>
        <span className={`ml-4 px-2 py-1 rounded text-xs font-semibold ${bgClass}`}>
          {label}
        </span>
      </div>
    );
  };

  return (
    <FileUpload
      name={type}
      mode="advanced"
      auto
      customUpload
      maxFileSize={maxSize}
      chooseLabel={label}
      uploadHandler={handleUpload}
      itemTemplate={itemTemplate}
      pt={{
        chooseButton: {
          className: inputClass || "btn-primary",
          icon: icon || "",
        },
      }}
    />
  );
};

FileUploader.propTypes = {
  type: PropTypes.string.isRequired,
  maxSize: PropTypes.number.isRequired,
  label: PropTypes.string,
  icon: PropTypes.any,
  upload: PropTypes.func.isRequired,
  inputClass: PropTypes.string,
};

export default FileUploader;
