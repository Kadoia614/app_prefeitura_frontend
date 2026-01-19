import Title from "@/components/shared/title/Title";
import CadastrosTable from "./Table/CadastrosTable";
import { MinhaCasaProvider } from "../../context/minhacasa/MinhaCasaProvider";
import { useState } from "react";
import Modais from "./modal/Modais";

const MinhaCasa = () => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  return (
    <div id="FT">
      <Title>
        Minha Casa Minha Vida <br />
        <h4 className="text-lg">Prefeitura de Itapecerica da Serra</h4>
      </Title>

      <div>
        <h1>Em desenvolvimento</h1>
        <MinhaCasaProvider> 
          <Modais openEdit={modalEdit} setOpenEdit={setModalEdit} openExclude={modalDelete} setOpenExclude={setModalDelete}></Modais>
          <CadastrosTable setOpenModalEdit={setModalEdit} setExcludeModalOpen={setModalDelete}></CadastrosTable>
        </MinhaCasaProvider>
      </div>
    </div>
  );
};

export default MinhaCasa;
