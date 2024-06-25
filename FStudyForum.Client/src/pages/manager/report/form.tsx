import ReportService from "@/services/ReportService";
import { Button, Chip, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cn } from "@/helpers/utils";
import { CircleAlert } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Response } from "@/types/response";
import { usePosts } from "@/hooks/usePosts";
type ReportForm = {
  type: string;
  content?: string;
};


const validation = Yup.object().shape({
  type: Yup.string().required("Please select a report type"),
  content: Yup.string()
});

const ReportForm = () => {
  const [report, setReport] = useState<string[]>([]);
  const [selectedReport, setSelectedReport] = useState<string>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { postData } = usePosts();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ReportForm>({
    mode: "onTouched",
    resolver: yupResolver(validation)
  });
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await ReportService.getAll();
        setReport(response);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.message);
        }
      }
    };
    fetchReports();
  }, []);

  const { mutate: handleReport, isPending: pending } = useMutation({
    mutationFn: async (form: ReportForm) => {
      if (!user) navigate("/auth/signin");
      const payload = {
        type: form.type,
        content: {
          Content: form.content || "",
          ReportedPostId: postData?.id ?? -1,
          ReportedTopicname: postData?.topicName ?? "",
          ReportedUsername: postData?.author ?? "",
        },
        creater: user?.email ?? ""
      };
      console.log(payload);
      await ReportService.SendReport(payload);
    },
    onSuccess: async () => {
      setSubmitted(true);
    },
    onError: e => {
      const error = e as AxiosError;
      setError((error?.response?.data as Response)?.message || error.message);
    }
  });

  if (submitted) {
    return (
      <div>
        <DialogHeader className="text-xl font-semibold text-gray-900">Report Submitted</DialogHeader>
        <DialogBody className="text-sm text-gray-900 text-left">Thank you for your report. We will review it as soon as possible.</DialogBody>
        <div className="mt-6">
          <Button
            onClick={() => {
              window.location.reload();
            }}
            className="text-white px-6 py-2 rounded-lg w-full"
            variant="gradient"
            color="deep-orange"
          >
            Done
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DialogHeader className="text-xl font-semibold text-gray-900">Submit a Report</DialogHeader>
      <DialogBody className="text-sm text-gray-900 text-left">Thanks for looking out for yourself and your fellow redditors by
        reporting things that break the rules. Let us know what's happening, and
        we'll look into it.</DialogBody>
      <form onSubmit={handleSubmit(form => handleReport(form))}>
        <div className="overflow-x-auto max-h-[20rem]">
          <div className="mt-6 w-full flex flex-wrap gap-2">
            {report.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedReport(item);
                  setValue("type", item, { shouldValidate: true });
                }}
                className="hover:cursor-pointer"
                role="button"
                tabIndex={0}
                aria-pressed={selectedReport === item ? "true" : "false"}
              >
                <Chip
                  className="rounded-full p-4 text-xs capitalize"
                  variant={selectedReport === item ? "filled" : "ghost"}
                  color="blue-gray"
                  value={item}
                  disabled={pending}
                  {...register("type")}
                />
              </div>
            ))}
          </div>
          {errors.type && (
            <span
              className={cn(
                "text-red-500 text-xs mt-1 ml-1 flex gap-x-1 items-center"
              )}
            >
              <CircleAlert className="w-3 h-3" /> {errors.type.message}
            </span>
          )}
          <div className="flex justify-center px-4 ">
            <textarea
              className="w-full h-32 mt-6 p-4 rounded-lg bg-blue-gray-800 text-white"
              placeholder="Tell us more about the issue"
              disabled={pending}
              {...register("content")}
            ></textarea>
          </div>
          <div>
            {!errors.type && error && (
              <span className="flex items-center tracking-wide text-xs text-red-500 mt-1 ml-1 gap-x-1">
                <CircleAlert className="w-3 h-3" /> {error}
              </span>
            )}
          </div>
          <div className="mt-6">
            <Button
              disabled={pending}
              type="submit"
              className=" text-white px-6 py-2 rounded-lg w-full"
              variant="gradient"
              color="deep-orange"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
