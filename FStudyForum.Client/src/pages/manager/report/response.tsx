import ReportService from "@/services/ReportService";
import { Alert, Button, Spinner } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { cn } from "@/helpers/utils";
import { ArrowLeft, CircleAlert, CircleCheckBig } from "lucide-react";
import React from "react";
import { AxiosError } from "axios";
import { Response } from "@/types/response";
import TextareaAutosize from "react-textarea-autosize";

type ResponseInput = {
  responseContent: string;
};

const validation = Yup.object().shape({
  responseContent: Yup.string().required("Response is required")
});

const ResponseForm = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [respSuccess, setRespSuccess] = React.useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<ResponseInput>({
    resolver: yupResolver(validation)
  });

  const {
    data: report,
    error,
    isLoading
  } = useQuery({
    queryKey: ["REPORT_DETAIL", reportId],
    queryFn: () => ReportService.getReportById(reportId ?? "")
  });
  const [responseContent, setResponseContent] = React.useState(
    report?.responseContent
  );
  const { mutate: handleSubmitResponse, isPending: pending } = useMutation({
    mutationFn: async (form: ResponseInput) => {
      await ReportService.responseReport(reportId ?? "", form.responseContent);
    },
    onSuccess: () => {
      setRespSuccess(true);
    },
    onError: e => {
      const error = e as AxiosError;
      setError("responseContent", {
        type: "manual",
        message: (error?.response?.data as Response)?.message || error.message
      });
      setRespSuccess(false);
    }
  });

  if (error)
    return (
      <Alert color="red" className="p-4">
        Can't fetch posts
      </Alert>
    );
  if (isLoading) return <Spinner className="mx-auto" />;
  return (
    <div className="max-w-4xl mx-auto p-2 relative">
      <div
        onClick={() => navigate("/manager/report")}
        className="rounded-full bg-blue-gray-50 hover:bg-blue-gray-100 hover:cursor-pointer p-2 absolute top-2 -left-10"
      >
        <ArrowLeft className="w-5 h-5" />
      </div>
      <form
        onSubmit={handleSubmit(form => handleSubmitResponse(form))}
        className="space-y-6"
      >
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-base leading-6 font-medium text-gray-900">
              Report Information
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Title</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {report?.type}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Content</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {report?.content.Content}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Reporter</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {report?.creater}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-sm  text-gray-700">
            <label htmlFor="responseContent" className="text-sm font-medium">
              Reponse
            </label>
            <Link
              to={`/topic/${report?.content.ReportedTopicname}/comments/${report?.content.ReportedPostId}`}
              className="hover:underline"
            >
              Go to post
            </Link>
          </div>
          <TextareaAutosize
            id="responseContent"
            value={responseContent ?? report?.responseContent ?? ""}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm min-h-24"
            {...register("responseContent", {
              onChange: e => setResponseContent(e.target.value)
            })}
          />
          {respSuccess && (
            <span
              className={cn(
                "text-green-500 text-xs mt-1 ml-1 flex gap-x-1 items-center"
              )}
            >
              <CircleCheckBig className="w-3 h-3" />
              Response successfully
            </span>
          )}
          {errors.responseContent && respSuccess == false && (
            <span
              className={cn(
                "text-red-500 text-xs mt-1 ml-1 flex gap-x-1 items-center"
              )}
            >
              <CircleAlert className="w-3 h-3" />{" "}
              {errors.responseContent.message}
            </span>
          )}
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={pending}
            className="px-4 py-3 bg-orange-500 rounded-md text-white outline-none"
          >
            Accept
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResponseForm;
