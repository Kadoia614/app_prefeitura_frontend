import TableHeader from "@/components/shared/table/TableHeader";
import { SpeedDial } from "primereact/speeddial";
import SelectField from "@/components/shared/input/SelectField";
import { FaUnlink, FaUser, FaRegNewspaper, FaFileCsv } from "react-icons/fa";
import PropTypes from "prop-types";

const BolsistaTableHeader = ({
  setOpenModalEdit,
  selectedTable,
  setSelectedTable,
  tableOptions,
  setIsEditalModalOpen,
  setIsVincularModalOpen
}) => {
  const items = [
    {
      label: "Add",
      icon: <FaUser />,
      command: () => {
        setOpenModalEdit(true);
      },
    },
    {
      label: "Add",
      icon: <FaRegNewspaper />,
      command: () => {
        setIsEditalModalOpen(true);
      },
    },
    {
      label: "Add",
      icon: <FaUnlink />,
      command: () => {
        setIsVincularModalOpen(true);
      },
    },
        {
      label: "Add",
      icon: <FaFileCsv />,
      disabled: true,
      command: () => {
        setIsVincularModalOpen(true);
      },
    },
  ];

  return (
    <>
      <TableHeader
        start={
          <div className="flex items-center">
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
          </div>
        }
        end={
          <>
            <SpeedDial
              model={items}
              direction="down"
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
