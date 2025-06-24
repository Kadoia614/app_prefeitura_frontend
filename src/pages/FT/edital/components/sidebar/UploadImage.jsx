import PropTypes from "prop-types";
import { FaUpload } from "react-icons/fa";
import FileUploader from "@/components/shared/input/fileUploader";
import { postDoc } from "@/service/ft_appServices";

const UploadImage = ({ type, id, posAction }) => {
  const handleUpload = async (formData) => {
    try {
      const response = await postDoc(id, formData);
      if (posAction) posAction();
      console.log(response.data);
    } catch (error) {
      throw { message: "Erro ao fazer upload do arquivo", error };
    }
  };

  return (
    <FileUploader
      mode={`basic`}
      maxSize={2097152} // 2MB
      type={type}
      label="Subir arquivo"
      icon={<FaUpload />}
      upload={handleUpload}
    />
  );
};

UploadImage.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  posAction: PropTypes.func,
};

export default UploadImage;
