import PropTypes from "prop-types";
import { useRef } from "react";

import { FileUpload } from "primereact/fileupload";
import { useToast } from "@/components/shared/toast/ToastProvider";
import { Tooltip } from "primereact/tooltip";

const FileUploadIptu = ({label }) => {
  const { showToast } = useToast();
  const fileUploadRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.files[0];
    if (!file) {
    showToast("error", "Erro", "Nenhum arquivo selecionado");
    return;
  }

    try {
      const reader = new FileReader();

      await reader.readAsDataURL(file);

      reader.onloadend = () => {
        alert(reader.result);
      };

      showToast("success", "Sucesso", "Upload realizado com sucesso");
      fileUploadRef.current.clear();
    } catch (error) {
        alert(error)
      fileUploadRef.current?.onError?.();

      showToast(
        "error",
        "Erro",
        "Erro ao fazer upload: " + error.response?.data?.message || error
      );
    }
  };

  return (
    <>
      <Tooltip
        target=".custom-choose-btn"
        content="Escolher Arquivo"
        position="bottom"
      />

      <FileUpload
        ref={fileUploadRef}
        name="uploadCertidao"
        mode="basic"
        customUpload
        accept="image/*"
        maxFileSize={2000000}
        uploadHandler={handleUpload}
        chooseLabel={label}
        auto
      />
    </>
  );
};

FileUploadIptu.propTypes = {
  label: PropTypes.string,
};

export default FileUploadIptu;
