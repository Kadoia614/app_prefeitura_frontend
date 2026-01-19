import { Password } from "primereact/password";

import PropTypes from "prop-types";

const PasswordFieldLine = ({
  id,
  value,
  label,
  onChange,
  placeHolder,
  disabled,
  invalid,
  fieldClass,
  feedback,
}) => (
  <fieldset className={`mt-2 ${fieldClass}`}>
    <label htmlFor={id} className="font-bold text-text-muted">
      {label}
    </label>
    <div className="mt-1">
      <Password
        id={id}
        placeholder={placeHolder || "Password"}
        value={value || ""}
        disabled={disabled}
        invalid={invalid}
        onChange={onChange}
        feedback={feedback}
      />
    </div>
  </fieldset>
);
PasswordFieldLine.propTypes = {
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
  fieldClass: PropTypes.string,
};

export default PasswordFieldLine;
