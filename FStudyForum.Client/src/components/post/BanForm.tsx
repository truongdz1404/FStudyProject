import React, { useState } from "react";

const SelectDate: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    console.log("Selected:", event.target.value);
  };

  return (
    <>
      <label htmlFor="select-version">Select Version</label>
      <select id="select-version" value={selectedOption} onChange={handleChange}>
        <option value="html">Material Tailwind HTML</option>
        <option value="react">Material Tailwind React</option>
        <option value="vue">Material Tailwind Vue</option>
        <option value="angular">Material Tailwind Angular</option>
        <option value="svelte">Material Tailwind Svelte</option>
      </select>
      <p>Selected Option: {selectedOption}</p>
    </>
  );
};
export default SelectDate;
