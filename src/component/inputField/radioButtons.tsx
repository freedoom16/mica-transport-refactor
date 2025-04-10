import React from "react";

interface RadioButtonProps {
  name: string;
  value: string | number | boolean;
  checked: boolean;
  onChange: () => void;
  label: string;
  className?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  value,
  checked,
  onChange,
  label,
  className = "",
}) => {
  return (
    <label className={`flex items-center space-x-2 ${className}`}>
      <input
        type="radio"
        name={name}
        value={value.toString()}
        checked={checked}
        onChange={onChange}
        className="form-radio text-[#ECECEC] w-6 h-6 border-2 border-gray-300"
      />
      <span className="text-sm text-white">{label}</span>
    </label>
  );
};

export default RadioButton;
