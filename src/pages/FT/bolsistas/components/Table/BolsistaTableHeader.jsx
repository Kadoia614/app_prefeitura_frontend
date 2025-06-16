import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import TableHeader from "@/components/shared/table/TableHeader";
import SelectField from "@/components/shared/input/SelectField";

import { FaUnlink, FaUser, FaRegNewspaper, FaFileCsv } from "react-icons/fa";

import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from 'primereact/tooltip';

import { getRelatory } from "@/service/ft_appServices";

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

  async function openRelatory() {
    const data = await getRelatory(selectedTable);

    const archive = URL.createObjectURL(data);

    window.open(archive, "_blank");
  }

  const items = [
    {
      label: "Adicionar Bolsista",
      icon: <FaUser />,
      className: "add-bolsista-btn bg-primary-500/70 hover:bg-primary-700/70",
      command: () => {
        setOpenModalEdit(true);
      },
    },
    {
      label: "Novo Edital",
      icon: <FaRegNewspaper />,
      className: "add-edital-btn bg-yellow-600/70 hover:bg-yellow-700/70",
      command: () => {
        setIsEditalModalOpen(true);
      },
    },
    {
      label: "Vincular Bolsista",
      icon: <FaUnlink />,
      disabled: status === "inativo" || !selectedTable,
      className: "vinculate-bolsista-edital-btn bg-green-600/70 hover:bg-green-700/70",
      command: () => {
        setIsVincularModalOpen(true);
      },
    },
    {
      label: "Gerar Relatório",
      icon: <FaFileCsv />,
      className: "generate-relatory",
      disabled: status === "inativo" || !selectedTable,
      command: () => {
        openRelatory();
      },
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
      <Tooltip target=".add-bolsista-btn" position="bottom" />
      <Tooltip target=".add-edital-btn" position="bottom" />
      <Tooltip target=".vinculate-bolsista-edital-btn" position="bottom" />
      <Tooltip target=".generate-relatory" position="bottom" />

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
                {tag[status].label}
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
  tag: PropTypes.objectOf(
    PropTypes.shape({
      style: PropTypes.string,
      icon: PropTypes.node,
      label: PropTypes.string,
    })
  ).isRequired,
};

export default BolsistaTableHeader;
