import { useState } from "react";
import Title from "../../../components/shared/title/Title";
import MunicipeModal from "./modal/MunicipeModal";
import MunicipeExcludeModal from "./modal/MunicipeExcludeModal";
import TableCertidao from "./table/TableCertidao";

const CertidaoIPTU = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [excludeIsOpen, setExcludeIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  return (
    <div id="CertidaoIPTU">
      <Title>Certidão IPTU</Title>

      <div className="content">
        <h1>Em desenvolvimento</h1>
        <TableCertidao setIsOpen={setIsOpen} setModalData={setModalData} setExcludeIsOpen={setExcludeIsOpen}/>
      </div>
      <MunicipeModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalData={modalData}
        setModalData={setModalData}
      ></MunicipeModal>
      <MunicipeExcludeModal
        isOpen={excludeIsOpen}
        setIsOpen={setExcludeIsOpen}
        modalData={modalData}
        setModalData={setModalData}
      ></MunicipeExcludeModal>
    </div>
  );
};

export default CertidaoIPTU;
