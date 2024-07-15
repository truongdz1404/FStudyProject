import { CircleAlert, X } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/helpers/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FeedService from "@/services/FeedService";
import { AxiosError } from "axios";
import { Response } from "@/types/response";

type Props = {
  handler: () => void;
  onSuccess: (name: string) => void;
};
const validation = Yup.object({
  name: Yup.string()
    .required("Title is required")
    .min(3, "Title must be longer than 3 characters")
    .max(128, "Title must be shorter than 128 characters")
});
interface FeedSubmit {
  name: string;
  description?: string;
}

const CreateFeedForm: FC<Props> = ({ handler, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FeedSubmit>({
    mode: "onTouched",
    resolver: yupResolver(validation)
  });
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const { mutate: handleCreate } = useMutation({
    mutationFn: async (data: FeedSubmit) =>
      FeedService.createFeed({
        name: data.name,
        description: data.description ?? ""
      }),
    onSuccess: (_, submit) => {
      queryClient.invalidateQueries({ queryKey: ["FEED_LIST"] });
      handler();
      onSuccess(submit.name);
    },
    onError: e => {
      const error = e as AxiosError<Response>;
      setError((error?.response?.data as Response)?.message || error.message);
    }
  });

  return (
    <div className="relative p-2 text-blue-gray-800">
      <h1 className="font-semibold text-center text-md">Create custom feed</h1>
      <button
        type="button"
        className="absolute p-1 bg-blue-gray-700/50 rounded-full right-0 top-0"
        onClick={handler}
      >
        <X className="text-white w-4 h-4" />
      </button>

      <form
        onSubmit={handleSubmit(data => handleCreate(data))}
        className="flex flex-col gap-y-4"
      >
        <div className="text-blue-gray-800">
          <p className="font-medium text-sm ml-1 mb-1">Name</p>
          <input
            type="text"
            placeholder="Name"
            className="bg-blue-gray-50 py-3 px-4 rounded-2xl w-full border-none focus:outline-none"
            autoComplete="off"
            {...register("name")}
          />
          {errors.name && (
            <span
              className={cn(
                "text-red-500 text-xs ml-1 mb-1 flex gap-x-1 items-center"
              )}
            >
              <CircleAlert className="w-3 h-3" /> {errors.name.message}
            </span>
          )}
        </div>
        <div className="text-blue-gray-800">
          <p className="font-medium text-sm ml-1 mb-1">
            Description (optional)
          </p>
          <TextareaAutosize
            placeholder="Description"
            autoComplete="off"
            className={cn(
              "w-full appearance-none overflow-hidden bg-blue-gray-50 rounded-2xl min-h-24",
              "focus:outline-none py-3 px-4"
            )}
            {...register("description")}
          />
          {errors.description && (
            <span
              className={cn(
                "text-red-500 text-xs ml-1 mb-1 flex gap-x-1 items-center font-medium"
              )}
            >
              <CircleAlert className="w-3 h-3" /> {errors.description.message}
            </span>
          )}
        </div>
        {error && (
          <span className="flex items-center tracking-wide text-xs text-red-500 mt-1 ml-1 gap-x-1">
            <CircleAlert className="w-3 h-3" /> {error}
          </span>
        )}
        <div className="flex gap-x-2 justify-end text-blue-gray-800">
          <button
            type="button"
            className="bg-blue-gray-100 p-2 rounded-full text-sm font-medium"
            onClick={handler}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-full text-sm font-medium"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFeedForm;
