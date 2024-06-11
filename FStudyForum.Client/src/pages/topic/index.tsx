import React, { useState } from "react";
import SemesterFilter from "@/components/topic/Filter/SemesterFilter";
import MajorFilter from "@/components/topic/Filter/MajorFilter";
import TopicList from "@/components/topic/TopicList";
import AddButton from "@/components/topic/Button/ButtonAdd";
import AddTopicPopup from "@/components/topic/AddTopicPopup/AddTopicPopup";

const TopicsPage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSemesterSelect = (selectedValue: string) => {
    console.log("Semester selected:", selectedValue);
  };

  const handleMajorSelect = (selectedValue: string) => {
    console.log("Major selected:", selectedValue);
  };

  const handleAddButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <div className="text-3xl border border-gray-400 bg-gray-200 p-4 flex items-center justify-between"> {/* Thay đổi flex thành justify-between */}
        <div className="flex"> 
          <SemesterFilter onSelect={handleSemesterSelect} />
          <MajorFilter onSelect={handleMajorSelect} />
        </div>
        <AddButton onClick={handleAddButtonClick} />
      </div> 
      <TopicList />
      {isPopupOpen && <AddTopicPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default TopicsPage;
