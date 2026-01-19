import { InputMask } from "primereact/inputmask";
import PropTypes from "prop-types";

const InputFieldMask = ({
  id,
  label,
  value,
  onFocusOff,
  onChange,
  maxLength,
  keyfilter,
  inputClass,
  placeHolder,
  disabled,
  invalid,
  mask,
  fieldClass,
}) => (
  <fieldset className={`mt-2 ${fieldClass}`}>
    <label htmlFor={id} className="font-bold text-text-muted">
      {label}
    </label>
    <div className="mt-1">
      <InputMask
        invalid={invalid || false}
        keyfilter={keyfilter || ""}
        id={id}
        className={`rounded-md ps-2 py-1.5 focus:border-primary ring ring-gray-300 focus:ring-blue-200 ${inputClass} ${
          disabled ? "bg-gray-100" : ""
        }`}
        placeholder={`${placeHolder || label}`}
        value={value || ""}
        onBlur={onFocusOff}
        onChange={onChange}
        maxLength={maxLength}
        disabled={disabled || false}
        mask={mask}
      />
    </div>
  </fieldset>
);

InputFieldMask.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onFocusOff: PropTypes.func,
  maxLength: PropTypes.number,
  keyfilter: PropTypes.string,
  inputClass: PropTypes.string,
  placeHolder: PropTypes.string,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  fieldClass: PropTypes.string,
  mask: PropTypes.string,
};

export default InputFieldMask;
