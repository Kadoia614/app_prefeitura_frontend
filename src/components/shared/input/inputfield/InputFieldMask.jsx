import { InputMask } from "primereact/inputmask";
import PropTypes from "prop-types";

const InputFieldMask = ({
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
  mask,
  widthField
}) => (
  <fieldset className={`mt-2 ${widthField}`}>
    <label htmlFor={id} className="font-bold text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <InputMask
        invalid={invalid || false}
        keyfilter={keyfilter || ""}
        id={id}
        className={`rounded-md ps-2 py-1.5 focus:border-blue-500 ring ring-gray-300 focus:ring-blue-200 ${inputClass} ${
          disabled ? "bg-gray-100" : ""
        }`}
        placeholder={`${placeHolder || label}`}
        value={value || ""}
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
  maxLength: PropTypes.number,
  keyfilter: PropTypes.string,
  inputClass: PropTypes.string,
  placeHolder: PropTypes.string,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  widthField: PropTypes.string,
  mask: PropTypes.string,
};

export default InputFieldMask;
