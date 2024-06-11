import React from "react";
import Filter from "@/components/topic/Filter/Filter";

interface MajorFilterProps {
    onSelect: (selectedValue: string) => void;
  }
  
  const MajorFilter: React.FC<MajorFilterProps> = ({ onSelect }) => {
    const majors = ["IT", "Design", "Engineering", "Business"]; // Hard-coded majors
  
    return <Filter options={majors} onSelect={onSelect} />;
  };
  
  export default MajorFilter;
