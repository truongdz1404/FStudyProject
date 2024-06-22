import React, { useState, useEffect } from "react";
import { Alert } from "@material-tailwind/react";
import CategoryService from "@/services/CategoryService";
import { UpdateCategoryDTO, Category } from "@/types/category";

interface UpdateCategoryPopupProps {
  open: boolean;
  category: Category;
  onClose: () => void;
  onUpdate: () => void;
}

const UpdateCategoryPopup: React.FC<UpdateCategoryPopupProps> = ({
  open,
  category,
  onClose,
  onUpdate,
}) => {
  const [categoryName, setCategoryName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [type, setType] = useState(category.type);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateCategory = async () => {
    try {
      const updatedCategory: UpdateCategoryDTO = {
        name: categoryName,
        description,
        type,
      };
      await CategoryService.update(category.name, updatedCategory);
      onUpdate(); // Trigger reload or update action
      onClose(); // Close the popup
    } catch (error) {
      console.error("Error updating category:", error);
      setError("Error updating category. Please try again later.");
    }
  };

  useEffect(() => {
    if (open) {
      setCategoryName(category.name);
      setDescription(category.description);
      setType(category.type);
      setError(null); // Clear any previous errors when the popup opens
    }
  }, [open, category]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ${
        open ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Update Category</h2>
        {error && (
          <Alert color="red" className="mb-4">
            {error}
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
            onClick={handleUpdateCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Category
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryPopup;
