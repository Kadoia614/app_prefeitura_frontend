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
  fieldClass,
  format,
  disabled,
  icon,
  invalid,
  timeOnly,
  children,
}) => (
  <fieldset className={`mt-2 ${fieldClass || ""}`}>
    <label htmlFor={id} className="font-bold text-text-muted">
      {label}
    </label>
    <div className="mt-1 flex flex-row gap-2 items-center">
      {timeOnly ? (
        <Calendar
          invalid={invalid || false}
          icon={icon}
          id={id}
          placeholder={`${placeHolder || label || ""}`}
          disabled={disabled}
          value={value ? value : null}
          className={`rounded-md py-1.5 focus:border-primary ${inputClass}`}
          onChange={onChange}
          timeOnly
          showIcon
        />
      ) : (
        <Calendar
          invalid={invalid || false}
          icon={icon}
          id={id}
          placeholder={`${placeHolder || label || ""}`}
          disabled={disabled}
          value={value ? value : null}
          className={`rounded-md py-1.5 focus:border-primary ${inputClass} 
          }`}
          onChange={onChange}
          view={view}
          dateFormat={format || "dd/mm/yy"}
          showIcon
        />
      )}

      {children}
    </div>
  </fieldset>
);
CalendarInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  view: PropTypes.string,
  showTime: PropTypes.bool,
  inputClass: PropTypes.string,
  placeHolder: PropTypes.string,
  icon: PropTypes.any,
  format: PropTypes.string,
  timeOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  fieldClass: PropTypes.string,
  children: PropTypes.any,
};

export default CalendarInput;
