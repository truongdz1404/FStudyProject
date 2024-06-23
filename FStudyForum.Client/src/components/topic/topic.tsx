import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import type { Topic as TopicType } from "@/types/topic";
import UpdateTopicPopup from "@/components/topic/Popup/UpdateTopicPopup";
import DeleteTopicPopup from "@/components/topic/Popup/DeleteTopicPopup";
import TopicService from "@/services/TopicService";
import { Pencil, Trash } from "lucide-react";

interface TopicProps {
  topic: TopicType;
  onTopicDeleted: (id: number) => void;
  onTopicUpdated: () => void;
}

const TopicCard: React.FC<TopicProps> = ({
  topic,
  onTopicDeleted,
  onTopicUpdated
}) => {
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const handleEditClick = () => {
    setIsUpdatePopupOpen(true);
  };

  const handleCloseUpdatePopup = () => {
    setIsUpdatePopupOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeletePopupOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await TopicService.deleteTopic(topic.name);
      onTopicDeleted(topic.id);
      setIsDeletePopupOpen(false);
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const handleCloseDeletePopup = () => {
    setIsDeletePopupOpen(false);
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
          <Link to={`/topic/${topic.name}`}>
            <Button>View</Button>
          </Link>
          <div className="hidden">
            <Pencil
              style={{ color: "orange", cursor: "pointer" }}
              onClick={handleEditClick}
            />
            <Trash
              style={{ color: "red", cursor: "pointer" }}
              onClick={handleDeleteClick}
            />
          </div>
        </CardFooter>
      </Card>
      {isUpdatePopupOpen && (
        <UpdateTopicPopup
          open={isUpdatePopupOpen}
          topic={topic}
          onClose={handleCloseUpdatePopup}
          onUpdate={onTopicUpdated}
        />
      )}
      {isDeletePopupOpen && (
        <DeleteTopicPopup
          open={isDeletePopupOpen}
          onClose={handleCloseDeletePopup}
          onDelete={handleDeleteConfirm}
        />
      )}
    </>
  );
};

export default TopicCard;
