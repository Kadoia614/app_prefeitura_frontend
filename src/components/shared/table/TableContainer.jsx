import PropTypes from "prop-types";

const TableContainer = ({ children }) => {
  return (
    <div className=" w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
      {children}
    </div>
  );
};

TableContainer.propTypes = {
  children: PropTypes.node,
};

export default TableContainer;
