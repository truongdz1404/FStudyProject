import React from "react";
import SemesterFilter from "@/components/topic/Filter/SemesterFilter";
import MajorFilter from "@/components/topic/Filter/MajorFilter";
import TopicList from "@/components/topic/TopicList";

const TopicsPage: React.FC = () => {
  const handleSemesterSelect = (selectedValue: string) => {
    console.log("Semester selected:", selectedValue);
  };

  const handleMajorSelect = (selectedValue: string) => {
    console.log("Major selected:", selectedValue);
  };

  return (
    <div>
      
      <div className="text-3xl border border-gray-400 bg-gray-200 p-4 flex items-center">
        <SemesterFilter onSelect={handleSemesterSelect} />
        <MajorFilter onSelect={handleMajorSelect} />
      </div> 
      <TopicList />
    </div>
  );
};

export default TopicsPage;
