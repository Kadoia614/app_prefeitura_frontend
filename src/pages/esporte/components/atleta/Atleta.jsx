import { useState } from "react";
import Table from "./Table";
import ModalAtleta from "./ModalAtleta";
import ModalExcludeAtleta from "./ModalExcludeAtleta";

const Atleta = () => {
      const [editOpen, setEditOpen] = useState(false);
      const [excludeOpen, setExcludeOpen] = useState(false);
  return (
    <>
      <Table setEditOpen={setEditOpen} setExcludeOpen={setExcludeOpen} />
      <ModalAtleta isOpen={editOpen} setIsOpen={setEditOpen} />
      <ModalExcludeAtleta isOpen={excludeOpen} setIsOpen={setExcludeOpen} />
    </>
  );
};

export default Atleta;
