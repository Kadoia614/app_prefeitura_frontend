import { useEffect, useState } from "react";
import { useToast } from "@/components/shared/toast/ToastProvider";

import { getDocs, getOneDoc } from "@/service/ft_appServices";

import SideBar from "@/components/shared/sidebar/SidePanel";
import PropTypes from "prop-types";
import { FaPrint, FaUpload } from "react-icons/fa";
import { Image } from "primereact/image";
import { Button } from "primereact/button";

const SideBarBolsista = ({ sideBarStatus, setSideBarStatus, sideBarData }) => {
  const { showToast } = useToast();

  const [archives, setArchives] = useState([]);
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);

  const getData = async (id) => {
    try {
      const { data } = await getDocs(`${id}`);
      setData(data.archives);
      setTypes(data.types);
      showToast("success", "Confirmed", "Documentos carregados com sucesso");
    } catch (error) {
      showToast("error", "Error", "Erro ao buscar documentos " + error);
    }
  };

  const createImage = async (archive) => {
    try {
      const { data } = await getOneDoc(archive.path);
      const imageUrl = URL.createObjectURL(data);

      // Append ao array anterior
      setArchives((prev) => [...prev, { imageUrl, type: archive.type_id }]);
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
        createImage(archive);
      });
    }
  }, [data]);

  useEffect(() => {
    if (sideBarStatus) {
      getData(sideBarData?.id || 10); // usa o `sideBarData.id` se tiver, senão usa 10
    } else {
      clearSideBar();
    }
  }, [sideBarStatus]);

  return (
    <SideBar
      setSideBarStatus={setSideBarStatus}
      sideBarStatus={sideBarStatus}
      header={"Documentos"}
    >
      <div className="sidebar-content flex flex-col gap-4">
        {types.map((type, typeIndex) => (
          <div key={typeIndex} className="flex flex-col">
            <h4 className="text-lg font-bold">{type.toUpperCase()}</h4>
            <div>
              <Button
                icon={<FaUpload />}
                className="btn-primary text-white bg-primary-500 hover:bg-primary-700"
              />
              <Button icon={<FaPrint />} className="btn-primary ms-2" />

              
            </div>
            {archives
                .filter((archive) => archive.type === typeIndex)
                .map((archive, archiveIndex) => (
                  <Image
                    key={archiveIndex}
                    src={archive.imageUrl}
                    alt={`Imagem de ${type}`}
                    width="250"
                    preview
                  />
                ))}
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
