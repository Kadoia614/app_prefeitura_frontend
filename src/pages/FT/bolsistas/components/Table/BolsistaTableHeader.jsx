import PropTypes from "prop-types";

import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";
import TableHeader from "../../../../../components/shared/table/TableHeader";

const BolsistaTableHeader = ({ setOpenModalEdit }) => {
  const items = [
    {
      label: "Adicionar Bolsista",
      icon: "pi pi-user",
      className: "add-bolsista-btn bg-primary/70 hover:bg-primary-700/70",
      command: () => {
        setOpenModalEdit(true);
      },
    },
  ];

  return (
    <>
      <Tooltip target=".add-bolsista-btn" position="bottom" />

      <TableHeader
        center={
          <div>
            <h2 className="text-2xl font-semibold">Bolsistas</h2>
          </div>
        }
        end={
          <div className="overflow-visible">
            <SpeedDial
              className="relative"
              model={items}
              direction="down"
              type="linear"
              style={{ right: 0 }}
            ></SpeedDial>
          </div>
        }
      ></TableHeader>
    </>
  );
};
BolsistaTableHeader.propTypes = {
  setOpenModalEdit: PropTypes.func.isRequired,
  tag: PropTypes.objectOf(
    PropTypes.shape({
      style: PropTypes.string,
      icon: PropTypes.node,
      label: PropTypes.string,
    })
  ).isRequired,
};

export default BolsistaTableHeader;
