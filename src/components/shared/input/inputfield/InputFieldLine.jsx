import { InputText } from "primereact/inputtext";

import PropTypes from "prop-types";

const InputFieldLine = ({
  id,
  icon,
  value,
  onChange,
  inputClass,
  placeHolder,
  disabled,
  invalid,
  widthField,
  spanClass,
  ...props
}) => (
  <fieldset className={`flex mt-2 ${widthField}`}>
    {icon && <span className={`p-inputgroup-addon  ${spanClass}`}>{icon}</span>}
    <InputText
      id={id}
      className={`w-full ${inputClass || ""}`}
      placeholder={placeHolder || ""}
      value={value}
      disabled={disabled}
      invalid={invalid}
      onChange={onChange}
      {...props}
    />
  </fieldset>
);
InputFieldLine.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  inputClass: PropTypes.string,
  spanClass: PropTypes.string,
  placeHolder: PropTypes.string,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.any,
  widthField: PropTypes.string,
};

export default InputFieldLine;
