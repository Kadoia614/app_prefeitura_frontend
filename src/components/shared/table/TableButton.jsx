import { Button } from "primereact/button";
import PropTypes from "prop-types";

const TableButton = ({ onClick, icon, label, color }) => {
  return (
    <>
      <Button
        label={label}
        icon={icon}
        iconPos="left"
        className={`flex items-center gap-1 px-3 py-1 text-sm ${color} rounded-lg transition`}
        onClick={onClick}
      />
    </>
  );
};

TableButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default TableButton;
