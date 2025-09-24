import TableContainer from "../../../../components/shared/table/TableContainer";
import TableHeader from "../../../../components/shared/table/TableHeader";
import InputFieldLine from "../../../../components/shared/input/inputfield/InputFieldLine";
import { InputSwitch } from "primereact/inputswitch";
import { useState } from "react";
const TableCertidao = () => {
  const [excludeMode, setExcludeMode] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <>
      <TableContainer>
        <TableHeader
          start={
            <>
              <InputFieldLine
                placeHolder={"Buscar Certidão"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></InputFieldLine>
            </>
          }
          center="Tabela de Certidões"
          end={
            <>
              <span>Modo Perigoso</span>
              <InputSwitch
                checked={excludeMode}
                onChange={(e) => setExcludeMode(e.value)}
              ></InputSwitch>
            </>
          }
        ></TableHeader>
      </TableContainer>
    </>
  );
};

export default TableCertidao;
