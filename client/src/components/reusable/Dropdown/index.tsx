import React, { memo } from "react";

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className="p-1 px-2 rounded-lg border border-gray-800 focus:outline-none bg-primary text-xs w-full"
        >
            {options.map((option) => (
                <option className="bg-primary hover:bg-secondary text-xs" key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default memo(Dropdown);
