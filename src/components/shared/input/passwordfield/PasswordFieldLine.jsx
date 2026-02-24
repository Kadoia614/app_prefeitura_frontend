import { Password } from 'primereact/password';

import PropTypes from "prop-types";

const PasswordFieldLine = ({
  id,
  icon,
  value,
  onChange,
  inputClass,
  placeHolder,
  disabled,
  invalid,
  fieldClass,
  feedback,
  spanClass
}) => (
  <fieldset className={`flex mt-2 ${fieldClass}`}>
    <span className={`p-inputgroup-addon ${spanClass}`}>
      {icon}
    </span>
    <Password
      id={id}
      placeholder={placeHolder || "Password"}
      className={`${inputClass}`}
      value={value}
      disabled={disabled}
      invalid={invalid}
      onChange={onChange}
      feedback={feedback}
    />
  </fieldset>
);
PasswordFieldLine.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  keyfilter: PropTypes.string,
  inputClass: PropTypes.string,
  spanClass: PropTypes.string,
  placeHolder: PropTypes.string,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  feedback: PropTypes.bool,
  icon: PropTypes.any,
  fieldClass: PropTypes.string,
};

export default PasswordFieldLine;
