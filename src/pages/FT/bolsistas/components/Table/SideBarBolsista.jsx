import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useToast } from "@/components/shared/toast/ToastProvider";

import { getDocs, getOneDoc } from "@/service/ft_appServices";

import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { FaPrint } from "react-icons/fa";

import SideBar from "@/components/shared/sidebar/SidePanel";
import UploadImage from "../UploadImage";

const SideBarBolsista = ({ sideBarStatus, setSideBarStatus, sideBarData }) => {
  const { showToast } = useToast();

  const [archives, setArchives] = useState([]);
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);

  const getData = async (id) => {
    clearSideBar();
    try {
      const { data } = await getDocs(`${id}`);
      setData(data.archives);
      setTypes(data.types);
    } catch (error) {
      showToast("error", "Error", "Erro ao buscar documentos " + error);
    }
  };

  const createImage = async (archive, mime) => {
    try {
      const { data } = await getOneDoc(archive.path);
      const imageUrl = URL.createObjectURL(data);

      // Append ao array anterior
      setArchives((prev) => [
        ...prev,
        { imageUrl, type: archive.type_id, mime },
      ]);
    } catch (err) {
      console.error("Erro ao carregar imagem:", err);
    }
  };

  const clearSideBar = () => {
    setArchives([]);
    setTypes([]);
    setData([]);
  };

  useEffect(() => {
    if (data.length > 0) {
      data.forEach((archive) => {
        createImage(archive, archive.mime);
      });
    }
  }, [data]);

  useEffect(() => {
    if (sideBarStatus) {
      getData(sideBarData || 10);
    } else {
      clearSideBar();
    }
  }, [sideBarStatus]);

  return (
    <SideBar
      className="w-[400px]" 
      setSideBarStatus={setSideBarStatus}
      sideBarStatus={sideBarStatus}
      header={"Documentos"}
    >
      <div className="sidebar-content flex flex-col gap-4">
        {types.map((type, typeIndex) => (
          <div key={typeIndex} className="flex flex-col min-h-25">
            {/* header */}
            <h4 className="text-lg font-bold">{type.toUpperCase()}</h4>
            {/* content */}
            <div>
              {/* buttons and header */}
              <div className="flex flex-row justify-between mt-2">
                <span>
                  <UploadImage
                    type={type || ""}
                    id={sideBarData}
                    posAction={() => getData(sideBarData)}
                  />
                </span>
              </div>
              {/* images */}
              <div className="mt-4">
                {archives
                  .filter((archive) => archive.type === typeIndex)
                  .map((archive, archiveIndex) => {
                    const isPDF = archive.mime === "pdf";
                    return isPDF ? (
                      <div className="flex flex-row justify-between">
                        <span>
                          <a
                            key={archiveIndex}
                            href={archive.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              label={`Visualizar PDF`}
                              className="btn-primary w-full mb-2"
                            />
                          </a>
                        </span>
                        <span>
                          <Button
                            icon={<FaPrint />}
                            className="btn-primary ms-2"
                            onClick={() => {
                              const printWindow = window.open(
                                archive.imageUrl,
                                "_blank"
                              );
                              printWindow.onload = () => {
                                printWindow.print();
                              };
                            }}
                            tooltip="Imprimir PDF"
                            tooltipOptions={{ position: "left" }}
                          />
                        </span>
                      </div>
                    ) : (
                      // Renderiza a imagem normalmente
                      <Image
                        className="rounded-lg overflow-hidden"
                        key={archiveIndex}
                        src={archive.imageUrl}
                        alt={`Imagem de ${type}`}
                        width="100%"
                        preview
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SideBar>
  );
};

SideBarBolsista.propTypes = {
  sideBarStatus: PropTypes.bool.isRequired,
  setSideBarStatus: PropTypes.func.isRequired,
  sideBarData: PropTypes.any.isRequired,
};

export default SideBarBolsista;
