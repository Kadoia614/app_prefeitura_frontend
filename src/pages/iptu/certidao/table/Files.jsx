import PropTypes from "prop-types";
import FileUploadIptu from "./FileUpload";
import { Button } from "primereact/button";
import { IPTUCertidaoService } from "../../../../service/iptu";
import { useToast } from "../../../../components/shared/toast/ToastProvider";

const Files = ({ data, sudoMode }) => {
  const { showToast } = useToast();

  const deleteCertidao = async (id) => {
    try {
      const response = await IPTUCertidaoService.delete(id);
      showToast(
        "success",
        "Sucesso",
        response?.message || "Deletado com sucesso!"
      );
    } catch (error) {
      showToast(
        "error",
        "Falha ao deletar: " + error.response?.data?.message || error
      );
    }
  };

  const getArchive = async (uuid) => {
    try {
      const response = await IPTUCertidaoService.getOne(uuid);
      const { archive, name } = response.cert;

      // Detecta o tipo do arquivo (ajuste se necessário)
      const mimeType = archive.startsWith("data:")
        ? archive.split(";")[0].replace("data:", "")
        : "application/octet-stream";

      // Se já for dataURL, usa direto, senão monta
      const dataUrl = archive.startsWith("data:")
        ? archive
        : `data:${mimeType};base64,${archive}`;

      // Cria link temporário para download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = name || "arquivo";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      showToast(
        "error",
        "Falha ao baixar: " + (error.response?.data?.message || error)
      );
    }
  };

  return (
    <>
      <div className="border-1 border-gray-200 rounded-md p-4 w-full max-w-80 overflow-y-scroll max-h-78">
        <h1 className="text-center font-bold">Documentos</h1>
        <div>
          <FileUploadIptu
            uuid={data.uuid}
            maxSize={2000000}
            type="file"
            className="btn-primary w-full"
          ></FileUploadIptu>
          {data?.certs &&
            data.certs.map((c) => {
              const create = new Date(c.createdAt).toLocaleString("pt-BR");
              return (
                <div
                  key={c.uuid}
                  className="bg-gray-200 p-4 overflow-hidden mt-2 rounded-md hover:bg-gray-300 cursor-pointer flex justify-between"
                >
                  <div
                    className="flex flex-col"
                    onClick={() => getArchive(c.uuid)}
                  >
                    <p className="text-sm text-nowrap">{c.name}</p>
                    <p className="text-xs text-text-muted">{create}</p>
                  </div>
                  {sudoMode && (
                    <>
                      <Button
                        tooltip={"Excluir Certidão"}
                        icon={"pi pi-trash"}
                        iconPos="left"
                        className={`flex items-center gap-1 px-3 py-1 bg-white border-0 text-danger rounded-lg transition text-xl`}
                        onClick={() => {
                          deleteCertidao(c.uuid);
                        }}
                      />
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

Files.propTypes = {
  sudoMode: PropTypes.bool,
  data: PropTypes.shape({
    uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    certs: PropTypes.arrayOf(
      PropTypes.shape({
        uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        archive: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default Files;
