import { Password } from 'primereact/password';

import PropTypes from "prop-types";

const PasswordField = ({
  id,
  icon,
  value,
  onChange,
  inputClass,
  placeHolder,
  disabled,
  invalid,
  widthField,
  feedback
}) => (
  <fieldset className={`flex mt-2 ${widthField}`}>
    <span className={`p-inputgroup-addon ${inputClass}`}>
      {icon}
    </span>
    <Password
      id={id}
      placeholder={placeHolder || "Password"}
      value={value}
      disabled={disabled}
      invalid={invalid}
      onChange={onChange}
      feedback={feedback}
    />
  </fieldset>
);
PasswordField.propTypes = {
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
  feedback: PropTypes.bool,
  icon: PropTypes.any,
  widthField: PropTypes.string,
};

export default PasswordField;
