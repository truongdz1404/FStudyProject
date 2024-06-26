import React, { useEffect } from "react";
import { Alert, Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import TopicService from "@/services/TopicService";
import { Topic as TopicType, UpdateTopicDTO } from "@/types/topic";

interface UpdateTopicPopupProps {
  open: boolean;
  topic: TopicType;
  onClose: () => void;
  onUpdate: () => void;
}

interface UpdateTopicFormInputs {
  topicName: string;
  description: string;
  avatar: string;
  banner: string;
  categories: string[];
}

const UpdateTopicPopup: React.FC<UpdateTopicPopupProps> = ({
  open,
  topic,
  onClose,
  onUpdate
}) => {
  const { register, handleSubmit, setValue } = useForm<UpdateTopicFormInputs>({
    defaultValues: {
      topicName: topic.name,
      description: topic.description,
      avatar: topic.avatar,
      banner: topic.banner,
      categories: topic.categories.map(String)
    }
  });

  const onSubmit = async (data: UpdateTopicFormInputs) => {
    try {
      const updatedTopic: UpdateTopicDTO = {
        name: data.topicName,
        description: data.description,
        avatar: data.avatar,
        banner: data.banner,
        categories: data.categories.map(Number)
      };

      await TopicService.update(topic.name, updatedTopic);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating topic:", error);
      // Handle error state or display error message
    }
  };

  useEffect(() => {
    // Reset form values when topic prop changes
    setValue("topicName", topic.name);
    setValue("description", topic.description);
    setValue("categories", topic.categories.map(String));
  }, [topic, setValue]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Topic</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Alert color="red" className="mb-4" children={undefined}>
            {/* Display error message if any */}
          </Alert>
          <div className="mb-4">
            <label htmlFor="topicName" className="block font-bold mb-1">
              Topic Name:
            </label>
            <input
              type="text"
              id="topicName"
              {...register("topicName", {
                required: "Topic name is required",
                maxLength: {
                  value: 50,
                  message: "Topic name must be no more than 50 characters"
                }
              })}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-1">
              Description:
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required"
              })}
              className="border border-gray-300 rounded px-2 py-1 w-full h-24 resize-none"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="categories" className="block font-bold mb-1">
              Categories:
            </label>
            <select
              id="categories"
              {...register("categories")}
              className="border border-gray-300 rounded px-2 py-1 w-full"
              multiple
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
            <Button color="blue" type="submit">
              Update
            </Button>
            <Button color="gray" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTopicPopup;
