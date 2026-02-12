import PropTypes from "prop-types";

const SelectField = ({
  id,
  label,
  fieldsetClass,
  value,
  options,
  onChange,
  disabled,
  valueKey,
  labelOptions,
  defaultValue,
  selectClass,
  defaultDisabled
}) => (
  <fieldset className={`mt-2 text-end ${fieldsetClass}`}>
    <label htmlFor={id} className={`font-bold text-text-muted`}>
      {label}
    </label>
    <div className="mt-1">
      <select
        id={id}
        className={`rounded-md border-gray-300 focus:border-primary focus:ring focus:ring-blue-200 w-full ps-2 py-1.5 ${selectClass} ${disabled ? "bg-background-muted" : "bg-"}`}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="" disabled={defaultDisabled ? defaultDisabled : ""} className="text-text">
          {defaultValue || "Escolha uma opção"}
        </option>
        {options && options.map((option, index) => (  
          <option key={index} value={option[valueKey] || option.id || ""} className="text-text">
            {option[labelOptions] || option.name || ""}
          </option>
        ))}
      </select>
    </div>
  </fieldset>
);

SelectField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  fieldsetClass: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  labelOptions: PropTypes.string,
  valueKey: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  selectClass: PropTypes.string,
  defaultDisabled: PropTypes.bool,
};

export default SelectField;
