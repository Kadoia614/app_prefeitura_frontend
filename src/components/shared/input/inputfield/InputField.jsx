import { InputText } from "primereact/inputtext";
import PropTypes from "prop-types";

const InputField = ({
  id,
  label,
  value,
  onChange,
  maxLength,
  keyfilter,
  inputClass,
  placeHolder,
  disabled,
  invalid,
  widthField,
}) => (
  <fieldset className={`mt-2 ${widthField}`}>
    <label htmlFor={id} className="font-bold text-text-muted">
      {label}
    </label>
    <div className="mt-1">
      <InputText
        invalid={invalid || false}
        keyfilter={keyfilter || ""}
        id={id}
        className={`rounded-md ps-2 py-1.5 focus:border-primary ring ring-gray-300 focus:ring-blue-200 ${inputClass} ${
          disabled ? "bg-gray-100" : ""
        }`}
        placeholder={`${placeHolder || label}`}
        value={value || ""}
        onChange={onChange}
        maxLength={maxLength}
        disabled={disabled || false}
      />
    </div>
  </fieldset>
);
InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
  keyfilter: PropTypes.string,
  inputClass: PropTypes.string,
  placeHolder: PropTypes.string,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  widthField: PropTypes.string,
};

export default InputField;
