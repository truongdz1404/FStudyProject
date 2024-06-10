import React from "react";

interface FilterProps {
  options: string[];
  onSelect: (selectedValue: string) => void;
}

const Filter: React.FC<FilterProps> = ({ options, onSelect }) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onSelect(selectedValue);
  };

  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="filter" className="font-medium">
      </label>
      <select
        id="filter"
        onChange={handleSelectChange}
        className="block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
