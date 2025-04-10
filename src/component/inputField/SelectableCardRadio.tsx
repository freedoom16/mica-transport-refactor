import React from "react";

interface SelectableCardRadioProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  error?: boolean;
}

const SelectableCardRadio: React.FC<SelectableCardRadioProps> = ({
  name,
  value,
  checked,
  onChange,
  label,
  error = false,
}) => {
  return (
    <div
      className={`w-2/4 h-14 flex items-center text-xl cursor-pointer rounded-xl pl-4 gap-3 bg-[#2c2c2c] border transition-all ${
        checked ? "border-2 border-[#2098ee]" : "border border-gray-300"
      } ${error ? "border-red-500" : ""}`}
      onClick={onChange}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-6 h-6 bg-[#ECECEC] text-[#ECECEC]"
      />
      <p className="text-white">{label}</p>
    </div>
  );
};

export default SelectableCardRadio;
