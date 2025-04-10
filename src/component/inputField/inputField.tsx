import React from "react";

interface InputFieldProps {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: boolean;
  className?: string;
  type?: string;
  inputMode?:
    | "text"
    | "search"
    | "email"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
  //   name?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  placeholder = "",
  label,
  error = false,
  className = "",
  type = "text",
  inputMode,
  //   name,
}) => {
  return (
    <div className="relative">
      {label && (
        <label className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
          {label}
        </label>
      )}
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        // name={name}
        className={`w-full h-14 px-3 py-2 text-sm text-white rounded-xl bg-[#2c2c2c] border ${
          error ? "border-red-500" : "border-[#938f99]"
        } outline-none transition-all focus:border-[#2098ee] ${className}`}
      />
    </div>
  );
};

export default InputField;
