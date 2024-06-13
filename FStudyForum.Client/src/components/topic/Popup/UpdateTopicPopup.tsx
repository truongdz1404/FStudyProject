// src/components/topic/Popup/UpdateTopicPopup.tsx
import React, { useEffect, useState } from "react";
import { Alert, Button } from "@material-tailwind/react";
import TopicService from "@/services/TopicService";
import { Topic as TopicType, UpdateTopicDTO } from "@/types/topic";

interface UpdateTopicPopupProps {
  open: boolean;
  topic: TopicType;
  onClose: () => void;
  onUpdate: () => void;
}

const UpdateTopicPopup: React.FC<UpdateTopicPopupProps> = ({ open, topic, onClose, onUpdate }) => {
  const [topicName, setTopicName] = useState(topic.name);
  const [description, setDescription] = useState(topic.description);
  const [categories, setCategories] = useState<string[]>(topic.categories.map(String));
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setTopicName(topic.name);
    setDescription(topic.description);
    setCategories(topic.categories.map(String));
  }, [topic]);

  const handleUpdateTopic = async () => {
    try {
      const updatedTopic: UpdateTopicDTO = {
        name: topicName,
        description,
        categories: categories.map(Number),
      };

      await TopicService.update(topic.id, updatedTopic);
      setSuccessMessage("Topic updated successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
        onUpdate();
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error updating topic:", error);
      setError("Error updating topic. Please try again later.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Topic</h2>
        {error && <Alert color="red" className="mb-4">{error}</Alert>}
        {successMessage && <Alert color="green" className="mb-4">{successMessage}</Alert>}
        <div className="mb-4">
          <label htmlFor="topicName" className="block font-bold mb-1">Topic Name:</label>
          <input
            type="text"
            id="topicName"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-bold mb-1">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full h-24 resize-none"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="categories" className="block font-bold mb-1">Categories:</label>
          <select
            id="categories"
            value={categories}
            onChange={(e) => setCategories(Array.from(e.target.selectedOptions, option => option.value))}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
            <option value="9">Semester 9</option>
            <option value="10">Semester 10</option>
          </select>
        </div>
        <div className="flex justify-between">
          <Button color="blue" onClick={handleUpdateTopic}>Update</Button>
          <Button color="gray" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTopicPopup;
