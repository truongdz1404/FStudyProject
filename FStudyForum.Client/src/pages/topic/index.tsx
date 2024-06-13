import React, { useState, useEffect } from "react";
import TopicList from "@/components/topic/TopicList";
import AddButton from "@/components/topic/button/ButtonAdd";
import AddTopicPopup from "@/components/topic/popup/AddTopicPopup";

const TopicsPage: React.FC = () => {
  const [popupOpen, setIsPopupOpen] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);

  const handleAddButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleTopicCreated = () => {
    setReloadPage(true);
  };

  useEffect(() => {
    if (reloadPage) {
      window.location.reload(); 
    }
  }, [reloadPage]);

  return (
    <div>
      <div className="text-3xl border border-gray-400 bg-gray-200 p-4 items-center justify-between hidden">
        <AddButton onClick={handleAddButtonClick} />
      </div> 
      <TopicList />
      {popupOpen && (
        <AddTopicPopup
          onClose={handleClosePopup}
          onTopicCreated={handleTopicCreated}
        />
      )}
    </div>
  );
};

export default TopicsPage;
