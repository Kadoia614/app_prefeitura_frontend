import { InputNumber } from 'primereact/inputnumber';
import PropTypes from "prop-types";

const InputFieldMoney = ({
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
  fieldClass
}) => (
  <fieldset className={`mt-2 ${fieldClass}`}>
    <label htmlFor={id} className="font-bold text-text-muted">
      {label}
    </label>
    <div className="mt-1">
      <InputNumber
        invalid={invalid || false}
        keyfilter={keyfilter || ""}
        id={id}
        className={`${inputClass} ${
          disabled ? "bg-gray-100" : ""
        }`}
        placeholder={`${placeHolder || label}`}
        value={value || ""}
        onValueChange={onChange}
        maxLength={maxLength}
        disabled={disabled || false}
        mode="currency" currency="BRL" locale="pt-BR"
      />
    </div>
  </fieldset>
);
InputFieldMoney.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  keyfilter: PropTypes.string,
  inputClass: PropTypes.string,
  placeHolder: PropTypes.string,
  fieldClass: PropTypes.string,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default InputFieldMoney;
