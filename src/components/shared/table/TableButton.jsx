import { Button } from "primereact/button";
import PropTypes from "prop-types";

const TableButton = ({ onClick, icon, label, color, tooltip }) => {
  return (
    <>
      <Button
      tooltip={tooltip}
        label={label}
        icon={icon}
        iconPos="left"
        className={`flex items-center gap-1 px-3 py-1 text-sm ${color} rounded-lg transition text-xl`}
        onClick={onClick}
      />
    </>
  );
};

TableButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.any,
  label: PropTypes.string,
  color: PropTypes.string,
  tooltip: PropTypes.string,
};

export default TableButton;
