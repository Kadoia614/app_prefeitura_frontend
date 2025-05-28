import { InputText } from "primereact/inputtext";

const InputField = ({ id, label, value, onChange, maxLength, keyfilter, inputClass, placeHolder, disabled }) => (
  <fieldset className="mt-2">
    <label htmlFor={id} className="font-bold text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <InputText
        keyfilter={keyfilter || ""}
        id={id}
        className={`rounded-md ps-2 py-1.5 focus:border-blue-500 ring ring-gray-300 focus:ring-blue-200 ${inputClass} ${disabled ? "bg-gray-100" : ""}`}
        placeholder={`${placeHolder || label}`}
        value={value || ""}
        onChange={onChange}
        maxLength={maxLength}
        disabled={disabled || false}
      />
    </div>
  </fieldset>
);

export default InputField;
