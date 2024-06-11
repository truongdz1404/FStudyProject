import React, { useState } from "react";
import { Card, CardBody, CardFooter, Typography, Button} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Edit, Delete } from "@material-ui/icons"; 
import type { Topic as TopicType } from "@/types/topic"; 
import UpdateTopicPopup from "@/components/topic/Popup/UpdateTopicPopup";

interface TopicProps {
  topic: TopicType; 
}

const TopicCard: React.FC<TopicProps> = ({ topic }) => {
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false); 
 
  // Function to handle edit icon click
  const handleEditClick = () => {
    setIsUpdatePopupOpen(true); 
  };

  // Function to handle closing the update topic popup
  const handleCloseUpdatePopup = () => {
    setIsUpdatePopupOpen(false);
  };

  return (
    <>
      <Card className="mt-3 w-50 border border-gray-300">
        <CardBody>
          <Typography variant="h5" color="gray" className="mb-2">
            {topic.name}
          </Typography>
          <Typography>{topic.description}</Typography>
        </CardBody>
        <CardFooter className="pt-0 flex justify-between items-center">
          <Link to={`/topic/detail/${topic.id}`}>
            <Button>View</Button>
          </Link>
          <div>
            {/* Handle click event on edit icon */}
            <Edit style={{ color: 'orange', cursor: 'pointer' }} onClick={handleEditClick} />
            <Delete style={{ color: 'red', cursor: 'pointer' }} />
          </div>
        </CardFooter>
      </Card>
      {/* Render the update topic popup conditionally */}
      {isUpdatePopupOpen && <UpdateTopicPopup onClose={handleCloseUpdatePopup} />}
    </>
  );
};

export default TopicCard;
