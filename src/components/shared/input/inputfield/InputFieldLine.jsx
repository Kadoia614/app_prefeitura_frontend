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

  
}) => (
  <fieldset className={`flex mt-2 ${widthField}`}>
    <span className={`p-inputgroup-addon ${inputClass}`}>
      {icon}
    </span>
    <InputText
      id={id}
      placeholder={placeHolder || ""}
      value={value}
      disabled={disabled}
      invalid={invalid}
      onChange={onChange}
    />
  </fieldset>
);
InputFieldLine.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  inputClass: PropTypes.string,
  placeHolder: PropTypes.string,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.any,
  widthField: PropTypes.string,
};

export default InputFieldLine;
