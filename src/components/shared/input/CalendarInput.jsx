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
  disabled,
  invalid,
}) => (
  <fieldset className="mt-2 border=0">
    <label htmlFor={id} className="font-bold text-text-muted">
      {label}
    </label>
    <div className="mt-1">
      <Calendar
        invalid={invalid || false}
        id={id}
        placeholder={`${placeHolder || label || ""}`}
        value={value ? value : null}
        className={`rounded-md py-1.5 focus:border-primary ${inputClass} ${
          disabled ? "bg-gray-100" : ""
        }`}
        onChange={onChange}
        view={view}
        dateFormat={format || "mm/dd/yy"}
        showIcon
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
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
};

export default CalendarInput;
