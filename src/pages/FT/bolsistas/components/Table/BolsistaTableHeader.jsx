import TableHeader from "@/components/shared/table/TableHeader";
import { SpeedDial } from "primereact/speeddial";
import SelectField from "@/components/shared/input/SelectField";
import { FaUnlink, FaUser, FaRegNewspaper, FaFileCsv } from "react-icons/fa";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const BolsistaTableHeader = ({
  setOpenModalEdit,
  selectedTable,
  setSelectedTable,
  tableOptions,
  setIsEditalModalOpen,
  setIsVincularModalOpen,
  tag,
}) => {
  const [status, setStatus] = useState("");

  const items = [
    {
      label: "Adicionar Bolsista",
      icon: <FaUser />,
      command: () => {
        setOpenModalEdit(true);
      },
      tooltip: "Adicionar novo bolsista",
    },
    {
      label: "Novo Edital",
      icon: <FaRegNewspaper />,
      command: () => {
        setIsEditalModalOpen(true);
      },
    },
    {
      label: "Add",
      icon: <FaUnlink />,
      disabled: status === "inativo",
      command: () => {
        setIsVincularModalOpen(true);
      },
      tooltip: "Criar novo edital",
    },
    {
      label: "Vincular Bolsista",
      icon: <FaFileCsv />,
      disabled: status === "",
      command: () => {
        setIsVincularModalOpen(true);
      },
      tooltip: "Vincular bolsista a um edital",
    },
  ];

  const verifyStatus = (id) => {
    if (id) {
      setStatus(tableOptions.find((option) => option.id.includes(id))?.status);
      return;
    }
    setStatus(null);
    return;
  };

  useEffect(() => {
    verifyStatus(selectedTable);
  }, [selectedTable]);

  return (
    <>
      <TableHeader
        start={
          <div className="flex items-end gap-10">
            <SelectField
              id="SelectEdital"
              label="Selecione o Edital"
              selectClass={"select"}
              value={selectedTable}
              onChange={(e) => {
                setSelectedTable(e.target.value);
              }}
              defaultValue={" Bolsistas"}
              defaultDisabled={false}
              options={tableOptions}
            />
            {status ? (
              <div className={`flex gap-2 items-center ${tag[status].style}`}>
                {tag[status].icon}
                {tag[status].label }
              </div>
            ) : (
              ""
            )}
          </div>
        }
        end={
          <>
            <SpeedDial
              model={items}
              direction="down"
              tooltipOptions={{ position: "left" }}
              type="linear"
              style={{ right: 0 }}
            ></SpeedDial>
          </>
        }
      ></TableHeader>
    </>
  );
};
BolsistaTableHeader.propTypes = {
  setOpenModalEdit: PropTypes.func.isRequired,
  selectedTable: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setSelectedTable: PropTypes.func.isRequired,
  tableOptions: PropTypes.array.isRequired,
  setIsEditalModalOpen: PropTypes.func.isRequired,
  setIsVincularModalOpen: PropTypes.func.isRequired,
};

export default BolsistaTableHeader;
