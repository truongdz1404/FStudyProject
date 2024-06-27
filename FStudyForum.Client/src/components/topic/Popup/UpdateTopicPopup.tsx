import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import TopicService from "@/services/TopicService";
import CategoryService from "@/services/CategoryService";
import { UpdateTopicDTO, Topic as TopicType } from "@/types/topic";
import { Category } from "@/types/category";

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
  onUpdate,
}) => {
  const { register, handleSubmit, setValue, watch } = useForm<UpdateTopicFormInputs>({
    defaultValues: {
      topicName: topic.name,
      description: topic.description,
      avatar: topic.avatar,
      banner: topic.banner,
      categories: topic.categories.map(String),
    },
  });

  const [categories, setCategories] = useState<Category[]>([]); 
  const [activeStep, setActiveStep] = useState(1); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await CategoryService.getAllCategory(); 
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const onSubmit = async (data: UpdateTopicFormInputs) => {
    try {
      const updatedTopic: UpdateTopicDTO = {
        name: data.topicName,
        description: data.description,
        avatar: data.avatar,
        banner: data.banner,
        categories: data.categories.map(Number),
      };

      await TopicService.update(topic.name, updatedTopic);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  useEffect(() => {
    setValue("topicName", topic.name);
    setValue("description", topic.description);
    setValue("avatar", topic.avatar);
    setValue("banner", topic.banner);
    setValue("categories", topic.categories.map(String));
  }, [topic, setValue]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-96 shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Topic</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 1 && (
            <>
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
                      message: "Topic name must be no more than 50 characters",
                    },
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
                    required: "Description is required",
                  })}
                  className="border border-gray-300 rounded px-2 py-1 w-full h-24 resize-none"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <Button color="blue" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </>
          )}

          {activeStep === 2 && (
            <>
              <div className="mb-4">
                <label htmlFor="avatar" className="block font-bold mb-1">
                  Avatar URL:
                </label>
                <input
                  type="text"
                  id="avatar"
                  {...register("avatar")}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="banner" className="block font-bold mb-1">
                  Banner URL:
                </label>
                <input
                  type="text"
                  id="banner"
                  {...register("banner")}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </div>
              <div className="flex justify-between">
                <Button color="gray" onClick={handleBack}>
                  Back
                </Button>
                <Button color="blue" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </>
          )}

          {activeStep === 3 && (
            <>
              <div className="mb-4">
                <label htmlFor="categories" className="block font-bold mb-1">
                  Categories:
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      color={watch("categories").includes(String(category.id)) ? "black" : "white"}
                      onClick={() => {
                        const selectedCategories = [...watch("categories")];
                        const categoryIndex = selectedCategories.indexOf(
                          String(category.id)
                        );
                        if (categoryIndex === -1) {
                          selectedCategories.push(String(category.id));
                        } else {
                          selectedCategories.splice(categoryIndex, 1);
                        }
                        setValue("categories", selectedCategories);
                      }}
                      className={`rounded-full border border-black px-2 py-1 ${
                        watch("categories").includes(String(category.id)) ? "text-white" : "text-black"
                      }`}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button color="gray" onClick={handleBack}>
                  Back
                </Button>
                <Button color="blue" type="submit">
                  Update
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateTopicPopup;
