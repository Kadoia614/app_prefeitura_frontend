import { useState } from "react";
import ModalAtleta from "./components/ModalAtleta";
import Table from "./components/Table";
import SportProvider from "../../context/sport/SportProvider";

const Esporte = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [excludeOpen, setExcludeOpen] = useState(false);

  return (
    <div id="Esporte" className="content">
      <SportProvider>
        <Table setEditOpen={setEditOpen} setExcludeOpen={setExcludeOpen} />
        <ModalAtleta isOpen={editOpen} setIsOpen={setEditOpen} />
      </SportProvider>
    </div>
  );
};

export default Esporte;
