import { Calendar } from "primereact/calendar";

const CalendarInput = ({
  id,
  label,
  value,
  onChange,
  view,
  inputClass,
  placeHolder,
  format,
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
        className={`rounded-md ps-2 py-1.5 focus:border-blue-500
            ring ring-gray-300 focus:ring-blue-200 ${inputClass}`}
        onChange={onChange}
        view={view}
        dateFormat={format || "mm/dd/yy"}
      />
    </div>
  </fieldset>
);

export default CalendarInput;
