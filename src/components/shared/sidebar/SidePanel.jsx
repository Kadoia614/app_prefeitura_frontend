import { Sidebar } from "primereact/sidebar";
import PropTypes from "prop-types";

const SidePanel = ({ sideBarStatus, setSideBarStatus, header, children, onShow, onHide, className }) => {
  return (
    <Sidebar
      visible={sideBarStatus}
      position="right"
      header={<h1 className='font-bold text-xl'>{header}</h1>}
      onHide={() => {setSideBarStatus(false); onHide && onHide()}}
      className={`p-4 box-border ${className || ""}`}
      onShow={onShow || ""}
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow mt-6 overflow-auto pt-1 ps-1">{children}</div>
      </div>
    </Sidebar>
  );
};

SidePanel.propTypes = {
  sideBarStatus: PropTypes.bool.isRequired,
  setSideBarStatus: PropTypes.func.isRequired,
  children: PropTypes.any,
  header: PropTypes.string.isRequired,
  onShow: PropTypes.func,
  className: PropTypes.string,
  onHide: PropTypes.func,
};

export default SidePanel;
