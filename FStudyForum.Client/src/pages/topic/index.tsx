import React, { useState, useEffect } from "react";
import SemesterFilter from "@/components/topic/filter/SemesterFilter";
// import MajorFilter from "@/components/topic/Filter/MajorFilter";
import TopicList from "@/components/topic/TopicList";
import AddButton from "@/components/topic/button/ButtonAdd";
import AddTopicPopup from "@/components/topic/popup/AddTopicPopup";

const TopicsPage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reloadPage, setReloadPage] = useState(false); 

  const handleSemesterSelect = (selectedValue: string) => {
    console.log("Semester selected:", selectedValue);
  };

  // const handleMajorSelect = (selectedValue: string) => {
  //   console.log("Major selected:", selectedValue);
  // };

  const handleAddButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleTopicCreated = () => {
    console.log("Topic created!");
    setReloadPage(true); 
  };

  useEffect(() => {
    if (reloadPage) {
      window.location.reload(); 
    }
  }, [reloadPage]);

  return (
    <div>
      <div className="text-3xl border border-gray-400 bg-gray-200 p-4 flex items-center justify-between"> 
        <div className="flex"> 
          <SemesterFilter onSelect={handleSemesterSelect} />
          {/* <MajorFilter onSelect={handleMajorSelect} /> */}
        </div>
        <AddButton onClick={handleAddButtonClick} />
      </div> 
      <TopicList />
      {isPopupOpen && <AddTopicPopup onClose={handleClosePopup} onTopicCreated={handleTopicCreated} />}
    </div>
  );
};

export default TopicsPage;
