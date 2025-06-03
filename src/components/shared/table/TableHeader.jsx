import { Fragment } from "react";
import PropTypes from "prop-types";

import { Toolbar } from "primereact/toolbar";

const TableHeader = ({start, center, end}) => {
  const startContent = (
    <Fragment>
      {start}
    </Fragment>
  );

  const centerContent = (
    <Fragment>
      {center}
    </Fragment>
  );

  const endContent = (
    <Fragment>
      <div className="flex justify-end gap-4 items-center relative">
      {end}
      </div>
    </Fragment>
  );

  return (
    <div className="relative header-table">
      <Toolbar start={startContent} center={centerContent} end={endContent} />
    </div>
  );
};
TableHeader.propTypes = {
  start: PropTypes.node,
  center: PropTypes.node,
  end: PropTypes.node,
};

export default TableHeader;
