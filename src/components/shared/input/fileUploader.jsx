import PropTypes from "prop-types";
import { useRef, useState } from "react";

import { FileUpload } from "primereact/fileupload";
import { useToast } from "@/components/shared/toast/ToastProvider";

import { CiImageOn } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";
import { CiBookmarkRemove } from "react-icons/ci";
import { Tooltip } from "primereact/tooltip";
import { ProgressBar } from "primereact/progressbar";

const FileUploader = ({ type, maxSize, label, upload }) => {
  const { showToast } = useToast();
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);

  const handleUpload = async (event) => {
    const { files } = event;
console.log(fileUploadRef)
console.log(fileUploadRef)
    if (!files || !files.length) {
      showToast("error", "Erro", "Nenhum arquivo selecionado");
      return;
    }

    const file = files[0];

    const formData = new FormData();
    formData.append(type, file);

    try {
      await upload(formData);
      fileUploadRef.current?.onUpload?.();
      fileUploadRef.current?.onUpload?.();
      showToast("success", "Sucesso", "Upload realizado com sucesso");
    } catch (error) {
      fileUploadRef.current?.onError?.();
      showToast("error", "Erro", "Erro ao fazer upload: " + error.response.data.message);
    }
  };

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    showToast("info", "Success", "File Uploaded");
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size || 0);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";
  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    showToast("info", "Success", "File Uploaded");
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size || 0);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>
            {formatedValue} / {maxSize / (1024 * 1024)}MB
          </span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>
            {formatedValue} / {maxSize / (1024 * 1024)}MB
          </span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };


  const chooseOptions = {
    icon: <CiImageOn />,
    iconOnly: true,
    className: "custom-choose-btn rounded-full bg-primary-500 hover:bg-primary-700",
  };
  const uploadOptions = {
    icon: <IoCloudUploadOutline />,
    iconOnly: true,
    className: "custom-upload-btn rounded-full bg-green-500 hover:bg-green-700",
  };
  const cancelOptions = {
    icon: <CiBookmarkRemove />,
    iconOnly: true,
    className: "custom-cancel-btn rounded-full bg-red-500 hover:bg-red-700",
  };


  const chooseOptions = {
    icon: <CiImageOn />,
    iconOnly: true,
    className: "custom-choose-btn rounded-full bg-primary-500 hover:bg-primary-700",
  };
  const uploadOptions = {
    icon: <IoCloudUploadOutline />,
    iconOnly: true,
    className: "custom-upload-btn rounded-full bg-green-500 hover:bg-green-700",
  };
  const cancelOptions = {
    icon: <CiBookmarkRemove />,
    iconOnly: true,
    className: "custom-cancel-btn rounded-full bg-red-500 hover:bg-red-700",
  };

  return (
    <>
      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name={type}
        mode="advanced"
        customUpload
        maxFileSize={maxSize}
        chooseLabel={label}
        uploadHandler={handleUpload}
        onUpload={onTemplateUpload}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        onRemove={onTemplateRemove}
        headerTemplate={headerTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
      />
    </>
    <>
      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name={type}
        mode="advanced"
        customUpload
        maxFileSize={maxSize}
        chooseLabel={label}
        uploadHandler={handleUpload}
        onUpload={onTemplateUpload}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        onRemove={onTemplateRemove}
        headerTemplate={headerTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
      />
    </>
  );
};

FileUploader.propTypes = {
  type: PropTypes.string.isRequired,
  maxSize: PropTypes.number.isRequired,
  label: PropTypes.string,
  upload: PropTypes.func.isRequired,
};

export default FileUploader;
