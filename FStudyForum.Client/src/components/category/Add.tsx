import React, { useState, useEffect } from "react";
import { Alert } from "@material-tailwind/react";
import { CreateCategoryDTO } from "@/types/category";
import CategoryService from "@/services/CategoryService";

interface AddCategoryPopupProps {
  onClose: () => void;
  onCategoryCreated: () => void;
}

const AddCategoryPopup: React.FC<AddCategoryPopupProps> = ({ onClose, onCategoryCreated }) => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(""); 
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddCategory = async () => {
    try {
      const newCategory: CreateCategoryDTO = {
        name: categoryName,
        description,
        type
      };

      await CategoryService.create(newCategory);
      setCategoryName("");
      setDescription("");
      setType(""); 
      setSuccessMessage("Category created successfully!");
      onCategoryCreated();
    } catch (error) {
      console.error("Error creating category:", error);
      setError("Error creating category. Please try again later.");
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
        <h2 className="text-xl font-bold mb-4">Add Category</h2>
        {error && (
          <Alert color="red" className="mb-4">
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert color="green" className="mb-4">
            {successMessage}
          </Alert>
        )}
        <div className="mb-4">
          <label htmlFor="categoryName" className="block font-bold mb-1">
            Category Name:
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-bold mb-1">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full h-24 resize-none"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block font-bold mb-1">
            Type:
          </label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Category
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

export default AddCategoryPopup;
