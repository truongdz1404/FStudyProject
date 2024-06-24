import React, { useState, useEffect } from "react";
import { Alert, Chip, Input, Step, Stepper } from "@material-tailwind/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { ChevronLeft, ChevronRight, CircleAlert, X } from "lucide-react";
import { motion } from "framer-motion";
import { Category } from "@/types/category"; 
import TopicService from "@/services/TopicService";
import CategoryService from "@/services/CategoryService";

interface AddTopicPopupProps {
  onClose: () => void;
  onTopicCreated: () => void;
}

interface AddTopicFormInputs {
  topicName: string;
  description: string;
  avatar: string; 
  banner: string; 
}

const validation = Yup.object().shape({
  topicName: Yup.string()
    .trim()
    .required("Topic name is required")
    .max(50, "Topic name must be no more than 50 characters"),
  description: Yup.string().trim().required("Description is required"),
  avatar: Yup.string().required("Avatar is required"), 
  banner: Yup.string().required("Banner is required"), 
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
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors }
  } = useForm<AddTopicFormInputs>({
    mode: "onTouched",
    resolver: yupResolver(validation)
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await CategoryService.getAllCategory();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleNext = async () => {
    let isValid = false;
    switch (activeStep) {
      case 0:
        isValid = await trigger(["topicName", "description"]);
        break;
      case 1:
        isValid = await trigger(["avatar", "banner"]);
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
        avatar: data.avatar,
        banner: data.banner,
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

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId]
    );
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "avatar" | "banner"
  ) => {
    const file = event.target.files?.[0] || null;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const previewUrl = reader.result as string;
      if (field === "avatar") {
        setAvatarPreview(previewUrl);
        setValue("avatar", previewUrl); 
      } else if (field === "banner") {
        setBannerPreview(previewUrl);
        setValue("banner", previewUrl); 
      }
    };
    reader.readAsDataURL(file);
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

  const renderStep = (step: number) => {
    return (
      <>
        <div className={`mb-6 ${step !== 0 ? "hidden" : ""}`}>
          <p className="text-xl font-semibold">Topic Information</p>
          <p className="text-xs text-gray-600 text-left">
            Provide details about the topic you want to create
          </p>
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
              error={Boolean(errors.topicName)}
            />
            {errors.topicName && (
              <span className="text-red-500 text-xs mt-1">
                {errors.topicName.message}
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
                {errors.description.message}
              </span>
            )}
          </div>
        </div>
        <div className={`mb-6 ${step !== 1 ? "hidden" : ""}`}>
          <p className="text-xl font-semibold">Add Images</p>
          <p className="text-xs text-gray-600 text-left">
            Upload avatar and banner images for your topic
          </p>
          <div className="mb-4">
            <label htmlFor="avatar" className="block font-bold mb-1">
              Avatar
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "avatar")}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="mt-2 h-24 w-24 object-cover rounded-full"
              />
            )}
            {errors.avatar && (
              <span className="text-red-500 text-xs mt-1">
                <CircleAlert className="w-3 h-3 inline" /> {errors.avatar.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="banner" className="block font-bold mb-1">
              Banner
            </label>
            <input
              id="banner"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "banner")}
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            />
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Banner Preview"
                className="mt-2 h-24 w-full object-cover rounded"
              />
            )}
            {errors.banner && (
              <span className="text-red-500 text-xs mt-1">
                <CircleAlert className="w-3 h-3 inline" /> {errors.banner.message}
              </span>
            )}
          </div>
        </div>
        <div className={`mb-6 ${step !== 2 ? "hidden" : ""}`}>
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
          className="mb-4"
        >
          <Step>1</Step>
          <Step>2</Step>
          <Step>3</Step>
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
