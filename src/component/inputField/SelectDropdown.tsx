import React, { useState } from "react";

interface Option {
  value: string;
  img?: string;
}

interface SelectDropdownProps {
  label: string;
  value: string;
  placeholder?: string;
  options: Option[];
  onChange: (value: string) => void;
  error?: boolean;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  value,
  placeholder = "--- Select ---",
  options,
  onChange,
  error = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-4">
      <label className="absolute px-3 py-2 text-sm rounded-xl bg-[#2c2c2c] text-white transform translate-x-2.5 -translate-y-3.5 scale-[0.75] origin-[left_top] transition-all">
        {label}
      </label>

      <div
        onClick={toggleDropdown}
        className={`w-full h-14 px-3 py-2 text-sm text-white mt-1 rounded-xl bg-[#2c2c2c] border-1 cursor-pointer ${
          error ? "border-red-500" : "border-[#938f99]"
        }`}
      >
        {value || placeholder}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#2c2c2c] border border-[#938f99] rounded-xl shadow-lg z-10 mt-2 text-white">
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(option.value)}
              className="flex items-center p-3 hover:bg-[#6DB8D1] cursor-pointer"
            >
              {option.img && (
                <img
                  src={option.img}
                  alt={option.value}
                  className="mr-2 w-5 h-5"
                />
              )}
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
