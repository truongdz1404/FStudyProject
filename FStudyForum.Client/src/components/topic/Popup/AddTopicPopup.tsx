import React, { useState, useEffect } from "react";
import { Alert, Chip, Input, Step, Stepper } from "@material-tailwind/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { ChevronLeft, ChevronRight, CircleAlert } from "lucide-react";
import { motion } from "framer-motion";
import { Category } from "@/types/category"; 
import TopicService from "@/services/TopicService";
import CategoryService from "@/services/CategoryService";
import Success from "@/assets/images/motivation.gif";
import { X } from "lucide-react"; 

interface AddTopicPopupProps {
  onClose: () => void;
  onTopicCreated: () => void;
}

interface AddTopicFormInputs {
  topicName: string;
  description: string;
}

const validation = Yup.object().shape({
  topicName: Yup.string()
    .trim()
    .required("Topic name is required")
    .max(50, "Topic name must be no more than 50 characters"),
  description: Yup.string().trim().required("Description is required")
});

const AddTopicPopup: React.FC<AddTopicPopupProps> = ({
  onClose,
  onTopicCreated
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [preStep, setPreStep] = useState(-1);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<AddTopicFormInputs>({
    mode: "onTouched",
    resolver: yupResolver(validation)
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const fetchedCategories = await CategoryService.getAllCategory();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleNext = async () => {
    let isValid = false;
    switch (activeStep) {
      case 0:
        isValid = await trigger(["topicName", "description"]);
        break;
      default:
        isValid = true;
        break;
    }
    if (isValid) {
      nextStep();
    }
  };

  const handleAddTopic = async (data: AddTopicFormInputs) => {
    try {
      setLoading(true);
      const newTopic = {
        name: data.topicName,
        description: data.description,
        categories: selectedCategories
      };
      await TopicService.create(newTopic);
      onClose();
      onTopicCreated();
    } catch (error) {
      console.error("Error creating topic:", error);
      setError("Error creating topic. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (!isLastStep) {
      setPreStep(activeStep);
      setActiveStep((cur) => cur + 1);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setPreStep(activeStep);
      setActiveStep((cur) => cur - 1);
    }
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId]
    );
  };

  const renderStep = (step: number) => {
    return (
      <>
        <div className={step !== 0 ? "hidden" : ""}>
          <div className="mb-6">
            <p className="text-xl font-semibold">Topic Information</p>
            <p className="text-xs text-gray-600 text-left">
              Provide details about the topic you want to create
            </p>
          </div>
          <div className="mb-4">
            <label htmlFor="topicName" className="block font-bold mb-1">
              Topic Name
            </label>
            <Input
              crossOrigin={undefined} id="topicName"
              type="text"
              placeholder="Enter topic name"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              {...register("topicName")}
              error={Boolean(errors.topicName?.message)}            />
            {errors.topicName && (
              <span className="text-red-500 text-xs mt-1">
                <CircleAlert className="w-3 h-3" /> {errors.topicName.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-1">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter description"
              className="border border-gray-300 rounded px-2 py-1 w-full h-24 resize-none"
              {...register("description")}
            ></textarea>
            {errors.description && (
              <span className="text-red-500 text-xs mt-1">
                <CircleAlert className="w-3 h-3" /> {errors.description.message}
              </span>
            )}
          </div>
        </div>
        <div className={step !== 1 ? "hidden" : ""}>
          <div className="mb-6">
            <p className="text-xl font-semibold">Select Categories</p>
            <p className="text-xs text-gray-600 text-left">
              Choose categories that fit your topic
            </p>
            <div className="overflow-x-auto max-h-[20rem]">
              <div className="mt-6 w-full flex flex-wrap gap-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className="hover:cursor-pointer"
                  >
                    <Chip
                      color="blue-gray"
                      variant={
                        selectedCategories.includes(category.id)
                          ? "filled"
                          : "ghost"
                      }
                      value={category.name}
                      className="rounded-full capitalize"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={step !== 2 ? "hidden" : ""}>
          <div className="mt-6 flex flex-col items-center justify-center">
            <img className="w-20 h-20" src={Success} alt="Success" />
            <p className="text-lg font-semibold text-blue-gray-800">
              Your topic has been successfully created!
            </p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <form
        className="bg-white p-8 rounded-md w-96 relative" 
        onSubmit={handleSubmit(handleAddTopic)}
      >
        <button
          type="button"
          onClick={onClose} 
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <X className="w-6 h-6 text-gray-600" /> 
        </button>
        <h2 className="text-xl font-bold mb-4">Add Topic</h2>
        {error && (
          <Alert color="red" className="mb-4">
            {error}
          </Alert>
        )}
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
          lineClassName="bg-orange-200"
          activeLineClassName="bg-deep-orange-400"
          className="mb-4"
        >
          <Step
            className="!bg-orange-300 !text-white w-8 h-8"
            activeClassName="!bg-deep-orange-400"
            completedClassName="!bg-deep-orange-400"
          >
            1
          </Step> 
          <Step
            className="!bg-orange-300 !text-white w-8 h-8"
           

            activeClassName="!bg-deep-orange-400"
            completedClassName="!bg-deep-orange-400"
          >
            2
          </Step>
          <Step
            className="!bg-orange-300 !text-white w-8 h-8"
            activeClassName="!bg-deep-orange-400"
            completedClassName="!bg-deep-orange-400"
          >
            3
          </Step>
        </Stepper>
        <motion.div
          key={activeStep}
          initial={{ x: preStep < activeStep ? -2 : 2, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          {renderStep(activeStep)}
        </motion.div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => {
              !loading && prevStep();
            }}
            className={`flex gap-x-2 text-deep-orange-400 hover:cursor-pointer select-none font-bold ${
              isFirstStep ? "text-orange-100" : ""
            }`}
          >
            <ChevronLeft /> Back
          </button>
          <button
            type={isLastStep ? "submit" : "button"}
            onClick={() => {
              !loading && !isLastStep && handleNext();
            }}
            className="flex gap-x-2 text-deep-orange-400 hover:cursor-pointer select-none font-bold"
          >
            {!isLastStep ? "Next" : "Finish"}
            <ChevronRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTopicPopup;
