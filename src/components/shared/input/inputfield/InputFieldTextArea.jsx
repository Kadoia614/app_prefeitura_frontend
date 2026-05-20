import { InputTextarea } from 'primereact/inputtextarea';

import PropTypes from "prop-types";

const InputFieldTextArea = ({
  id,
  label,
  value,
  onFocusOff,
  onChange,
  maxLength,
  inputClass,
  placeHolder,
  disabled,
  invalid,
  fieldClass,
  rows,
  cols
}) => (
  <fieldset className={`mt-2 ${fieldClass || "" }`}>
    <label htmlFor={id} className="font-bold text-text-muted">
      {label}
    </label>
    <div className="mt-1">
      <InputTextarea
        invalid={invalid || false}
        id={id}
        className={`rounded-md ps-2 py-1.5 focus:border-primary ring ring-gray-300 focus:ring-blue-200 ${inputClass} ${
          disabled ? "bg-gray-100" : ""
        }`}
        onBlur={onFocusOff}
        placeholder={`${placeHolder || label}`}
        value={value || ""}
        onChange={onChange}
        maxLength={maxLength}
        disabled={disabled || false}
        rows={rows}
        cols={cols}
      />
    </div>
  </fieldset>
);

InputFieldTextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onFocusOff: PropTypes.func,
  maxLength: PropTypes.number,
  inputClass: PropTypes.string,
  placeHolder: PropTypes.string,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
  cols: PropTypes.number,
  fieldClass: PropTypes.string,
};

export default InputFieldTextArea;
