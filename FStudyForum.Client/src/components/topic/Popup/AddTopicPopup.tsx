import React, { useState, useEffect } from "react";
import { Alert } from "@material-tailwind/react"; 
import { CreateTopicDTO } from "@/types/topic"; 
import TopicService from "@/services/TopicService";

interface AddTopicPopupProps {
  onClose: () => void;
  onTopicCreated: () => void; 
}

const AddTopicPopup: React.FC<AddTopicPopupProps> = ({ onClose, onTopicCreated }) => {
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); 
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddTopic = async () => {
    try {
      const newTopic: CreateTopicDTO = {
        name: topicName,
        description,
        categories: selectedCategories.map(category => parseInt(category)), 
      };

      await TopicService.create(newTopic);
      setTopicName("");
      setDescription("");
      setSelectedCategories([]);
      onClose();
      onTopicCreated();
    } catch (error) {
      console.error("Error creating topic:", error);
      setError("Error creating topic. Please try again later.");
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Add Topic</h2>
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
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, option => option.value))}
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
          <button
            onClick={handleAddTopic}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Topic
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTopicPopup;
