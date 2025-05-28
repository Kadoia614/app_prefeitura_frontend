import { Calendar } from "primereact/calendar";
import PropTypes from "prop-types";

const CalendarInput = ({
  id,
  label,
  value,
  onChange,
  view,
  inputClass,
  placeHolder,
  format,
  disabled
}) => (
  <fieldset className="mt-2">
    <label htmlFor={id} className="font-bold text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <Calendar
        id={id}
        placeholder={`${placeHolder || label || ""}`}
        value={value ? value : null}
        className={`rounded-md focus:border-blue-500 ring ring-gray-300 focus:ring-blue-200 ${inputClass} ${disabled ? "bg-gray-100" : ""}`}
        onChange={onChange}
        view={view}
        dateFormat={format || "mm/dd/yy"}
      />
    </div>
  </fieldset>
);
CalendarInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  view: PropTypes.string,
  inputClass: PropTypes.string,
  placeHolder: PropTypes.string,
  format: PropTypes.string,
  disabled: PropTypes.bool
};

export default CalendarInput;
