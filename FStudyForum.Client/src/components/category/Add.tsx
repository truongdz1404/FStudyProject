import React, { useState, useEffect } from "react";
import { Alert, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { CreateCategoryDTO } from "@/types/category";
import CategoryService from "@/services/CategoryService";
import CategoryTypeService from "@/services/CategoryTypeService";

interface AddCategoryPopupProps {
  open: boolean;
  onClose: () => void;
  onCategoryCreated: () => void;
}

const AddCategoryPopup: React.FC<AddCategoryPopupProps> = ({ open, onClose, onCategoryCreated }) => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [categoryTypes, setCategoryTypes] = useState<string[]>([]); // State for category types
  const [selectedCategoryType, setSelectedCategoryType] = useState<string>(""); // State for selected category type

  useEffect(() => {
    // Fetch category types when component mounts
    const fetchData = async () => {
      try {
        const types = await CategoryTypeService.getAll();
        setCategoryTypes(types);

        // Set the default selected category type
        if (types.length > 0) {
          setSelectedCategoryType(types[0]); // Select the first category type by default
        }
      } catch (error) {
        console.error("Error fetching category types:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddCategory = async () => {
    try {
      const newCategory: CreateCategoryDTO = {
        name: categoryName,
        description,
        type: selectedCategoryType
      };

      await CategoryService.create(newCategory);
      setCategoryName("");
      setDescription("");
      setSuccessMessage("Category created successfully!");
      onCategoryCreated();
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error creating category:", error);
      setError("Error creating category. Please try again later.");
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50 ${open ? "block" : "hidden"}`}>
      <div className="bg-white rounded-md p-4 shadow-lg w-80">
        <DialogBody>
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
            <select
              id="type"
              value={selectedCategoryType}
              onChange={(e) => setSelectedCategoryType(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            >
              <option value="">Select Category Type</option>
              {categoryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-end">
          <Button
            onClick={handleAddCategory}
            color="blue"
            className="mr-2"
          >
            Add Category
          </Button>
          <Button
            onClick={onClose}
            color="gray"
          >
            Close
          </Button>
        </DialogFooter>
      </div>
    </div>
  );
};

export default AddCategoryPopup;
