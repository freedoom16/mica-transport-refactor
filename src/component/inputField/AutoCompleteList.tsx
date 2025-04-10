import React from "react";

type AutoCompleteListProps = {
  items: string[] | { Model: string }[];
  onSelect: (item: string) => void;
};

const AutoCompleteList: React.FC<AutoCompleteListProps> = ({
  items,
  onSelect,
}) => {
  return (
    <ul className="absolute z-5 w-full mt-2 bg-[#2c2c2c] border border-gray-500 rounded max-h-48 overflow-y-auto text-sm text-white">
      {items.map((item, idx) => {
        const display = typeof item === "string" ? item : item.Model;

        return (
          <li
            key={idx}
            onClick={() => onSelect(display)}
            className="px-4 py-2 cursor-pointer hover:bg-[#6DB8D1]"
          >
            {display}
          </li>
        );
      })}
    </ul>
  );
};

export default AutoCompleteList;
