import PropTypes from "prop-types";
import { Button } from "primereact/button";

import { Divider } from "primereact/divider";
import { Link } from "react-router";

const ReservasNav = ({ sideOpen, setSideOpen, options, tab, setTab }) => {
  return (
    <nav
      className={`${
        sideOpen ? "md:w-1/8" : "md:w-1/15"
      } bg-background rounded-md shadow-sm transition-all duration-300 ease-in-out max-w-full overflow-auto md:overflow-visible`}
    >
      <div
        className="md:flex justify-center items-center p-3 hidden"
        onClick={() => setSideOpen(!sideOpen)}
      >
        <i
          className={`pi pi-angle-double-right ${
            sideOpen ? "" : "rotate-180"
          } transition`}
        ></i>
      </div>
      <Divider className="my-0"></Divider>
      <div
        className={`p-3 bg-background-muted
          flex md:flex-col gap-2 md:justify-center ${
            !sideOpen && "items-center"
          }`}
      >
        {options &&
          options.map((option, index) => (
            <Link to={option.link} key={index}>
              <Button
                link
                tooltip={!sideOpen ? option.label : ""}
                label={sideOpen ? option.label : ""}
                className={`text-sm gap-2 flex items-center  hover:text-text-secondary ${
                  index == tab ? "text-text-secondary" : "text-text-muted"
                }`}
                icon={option.icon}
                onClick={() => setTab(index)}
              />
            </Link>
          ))}
      </div>
    </nav>
  );
};

ReservasNav.propTypes = {
  sideOpen: PropTypes.bool,
  setSideOpen: PropTypes.func,
  options: PropTypes.array,
  tab: PropTypes.number,
  setTab: PropTypes.func,
};

export default ReservasNav;
