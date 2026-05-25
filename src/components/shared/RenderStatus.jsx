import PropTypes from "prop-types";

const RenderStatus = ({type, children}) => {
    // Mapeamento de cores (Tailwind precisa das classes completas)
    const statusConfig = {
      info: "bg-info-soft hover:bg-info-hover text-info-foreground border-info-border",
      warning: "bg-warning-soft hover:bg-warning-hover text-warning-foreground border-warning-border",
      success: "bg-success-soft hover:bg-success-hover text-success-foreground border-success-border",
      danger: "bg-danger-soft hover:bg-danger-hover text-danger-foreground border-danger-border",
      default: "bg-neutral-soft hover:bg-neutral-hover text-neutral-foreground border-neutral-border",
    };

    const style = statusConfig[type] || statusConfig.default;

    return (
      <div
        className={`flex gap-2 items-center px-2 py-1 rounded-full border text-xs font-semibold w-fit uppercase ${style}`}
      >
        <span className="w-2 h-2 rounded-full bg-current"></span>
        {children}
      </div>
    );
  };

  RenderStatus.propTypes = {
    type: PropTypes.string,
    children: PropTypes.node,
  };

  export default RenderStatus