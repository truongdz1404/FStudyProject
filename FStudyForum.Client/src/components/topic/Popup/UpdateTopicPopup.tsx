import React, { useState } from "react";

interface UpdateTopicPopupProps {
  onClose: () => void;
}

const UpdateTopicPopup: React.FC<UpdateTopicPopupProps> = ({ onClose }) => {
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [semester, setSemester] = useState("");
  const [major, setMajor] = useState("");

  const handleAddTopic = () => {
    // Submit the form data
    const formData = {
      topicName,
      description,
      semester,
      major
    };
    console.log(formData);

    // Close the popup after adding topic
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-md w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Topic</h2>
        <div className="mb-4">
          <label htmlFor="topicName" className="block font-bold mb-1">Topic Name:</label>
          <input type="text" id="topicName" value={topicName} onChange={(e) => setTopicName(e.target.value)} className="border border-gray-300 rounded px-2 py-1 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-bold mb-1">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 rounded px-2 py-1 w-full h-24 resize-none"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="semester" className="block font-bold mb-1">Semester:</label>
          <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value)} className="border border-gray-300 rounded px-2 py-1 w-full">
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="major" className="block font-bold mb-1">Major:</label>
          <select id="major" value={major} onChange={(e) => setMajor(e.target.value)} className="border border-gray-300 rounded px-2 py-1 w-full">
            <option value="">Select Major</option>
            <option value="computer-science">Computer Science</option>
            <option value="engineering">Engineering</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="flex justify-between">
          <button onClick={handleAddTopic} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Close</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTopicPopup;
