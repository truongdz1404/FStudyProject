import React from "react"
import Filter from "@/components/topic/Filter/Filter"

interface SemesterFilterProps {
  onSelect: (selectedValue: string) => void
}

const SemesterFilter: React.FC<SemesterFilterProps> = ({ onSelect }) => {
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] // Hard-coded semesters

  return <Filter options={semesters} onSelect={onSelect} />
}

export default SemesterFilter
