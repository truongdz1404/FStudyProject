import React, { useState } from "react";
import { Alert } from "@material-tailwind/react"; // Optional, for displaying errors

interface AddTopicPopupProps {
  onClose: () => void;
}

const AddTopicPopup: React.FC<AddTopicPopupProps> = ({ onClose }) => {
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<string[]>([]); // Adjusted to handle multiple categories
  const [error, setError] = useState<string | null>(null);

  const handleAddTopic = async () => {
    try {
      const response = await fetch("/api/Topic/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: topicName,
          description,
          categories, // This is an array of category IDs
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create topic");
      }

      // Optionally handle response data if needed
      const data = await response.json();
      console.log("Topic created successfully:", data);

      // Clear form and close popup
      setTopicName("");
      setDescription("");
      setCategories([]);
      onClose();
    } catch (error) {
      console.error("Error creating topic:", error);
      setError("Error creating topic. Please try again later.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Add Topic</h2>
        {error && <Alert color="red" className="mb-4">{error}</Alert>}
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
            multiple
          >
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            {/* Add more options or fetch dynamically */}
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
