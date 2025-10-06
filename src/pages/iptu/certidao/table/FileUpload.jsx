import PropTypes from "prop-types";
import { useRef } from "react";

import { FileUpload } from "primereact/fileupload";
import { useToast } from "@/components/shared/toast/ToastProvider";
import { Tooltip } from "primereact/tooltip";
import { IPTUCertidaoService } from "../../../../service/iptu";
import prepareBase64 from "../../../../assets/js/prepareBase64";

const FileUploadIptu = ({ uuid, setData, setTarget }) => {
  const { showToast } = useToast();
  const fileUploadRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.files[0];
    if (!file) {
      showToast("error", "Erro", "Nenhum arquivo selecionado");
      return;
    }

    try {
      if (!uuid) {
        showToast("error", "Erro", "Nenhum municipe selecionado");
      }
      const base64 = await prepareBase64(file);

      const payload = {
        municipe_uuid: uuid,
        name: base64.name,
        archive: base64.archive,
      };

      const { cert } = await IPTUCertidaoService.post(payload);

      setData((prevVisitors) =>
        prevVisitors.map((item) =>
          item.uuid === uuid ? { ...item, certs: [...item.certs, cert] } : item
        )
      );

      setTarget((prev) => ({ ...prev, certs: [...prev.certs, cert] }));

      showToast("success", "Sucesso", "Upload realizado com sucesso");
    } catch (error) {
      fileUploadRef.current?.onError?.();

      showToast(
        "error",
        "Erro",
        "Erro ao fazer upload: " + error.response?.data?.message || error
      );
    } finally {
      fileUploadRef.current?.clear?.();
    }
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-file-plus",
    label: "Adicionar Arquivo",
    className: "btn-primary custom-choose-btn w-full text-center",
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
        accept="application/pdf"
        maxFileSize={2000000}
        chooseOptions={chooseOptions}
        uploadHandler={handleUpload}
        auto
      />
    </>
  );
};

FileUploadIptu.propTypes = {
  uuid: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  setTarget: PropTypes.func.isRequired,
};

export default FileUploadIptu;
