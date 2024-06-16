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
import TopicService from "@/services/TopicService";
import { Pencil, Trash } from "lucide-react";
import UpdateTopicPopup from "@/components/topic/Popup/UpdateTopicPopup";
import DeleteTopicPopup from "@/components/topic/Popup/DeleteTopicPopup";
import { useAuth } from "@/hooks/useAuth";
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
  const [isLocked, setIsLocked] = useState(false);
  const { user } = useAuth();
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
      await TopicService.Delete(topic.name);
      onTopicDeleted(topic.id);
      setIsDeletePopupOpen(false);
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const handleCloseDeletePopup = () => {
    setIsDeletePopupOpen(false);
  };
  const handleViewClick = async () => {
    const isLocked = await TopicService.isLoked(user?.username ?? "", topic.id);
    if (!isLocked.data) {
      console.log("Tài khoản của bạn không bị khóa và có thể xem chủ đề này.");
    } else {
      const unlockTime = await TopicService.unlockTime(
        user?.username ?? "",
        topic.id
      );
      const unlockTimeDate = new Date(String(unlockTime.data));
      const now = new Date();
      if(now.getTime() >= unlockTimeDate.getTime()){
        const unlocked = await TopicService.unlocked(user?.username ?? "", topic.id);
        console.log(unlocked.data)
      }
      const timeDiff = unlockTimeDate.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      alert(
        `Tài khoản của bạn còn ${daysDiff} ngày để mở khóa.`
      );
    }
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
          <Button onClick={handleViewClick}>View</Button>
          {/* <Link to={`/topic/${topic.name}`}>
            <Button>View</Button>
          </Link> */}
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
