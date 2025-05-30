const SelectField = ({
  id,
  label,
  value,
  options,
  onChange,
  disabled,
  defaultValue,
  selectClass,
  defaultDisabled
}) => (
  <fieldset className="mt-2">
    <label htmlFor={id} className="font-bold text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <select
        id={id}
        className={`rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 w-full ps-2 py-1.5 ${selectClass} ${disabled ? "bg-gray-100" : "bg-"}`}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="" disabled={defaultDisabled ? defaultDisabled : ""}>
          {defaultValue || "Escolha uma opção"}
        </option>
        {options?.map((option) => (
          <option key={option.id || 0} value={option.id || ""}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  </fieldset>
);

export default SelectField;
