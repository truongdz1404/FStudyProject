import { cn } from "@/helpers/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { ArrowLeft, CircleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import { Response } from "@/types/response";
import React from "react";
import PaymentService from "@/services/PaymentService";
import { Link, useLocation } from "react-router-dom";
const validation = Yup.object({
  description: Yup.string(),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .min(10000, "Amount must be greater than or equal 10.000đ")
});
interface DonateInputs {
  description?: string;
  amount: number;
}

const Donate = () => {
  const { user } = useAuth();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DonateInputs>({
    mode: "onTouched",
    resolver: yupResolver(validation)
  });

  const handleDonate = async (form: DonateInputs) => {
    if (user == null) {
      setError("User is not authenticated");
      return;
    }
    setLoading(true);

    const save = async () => {
      try {
        const response = await PaymentService.generatePaymentUrl({
          username: user.username,
          fullname: `${user.firstName} ${user.lastName}`,
          description: form.description || "",
          amount: form.amount
        });
        window.location.href = `${response.data}`;
      } catch (e) {
        const error = e as AxiosError;
        setError((error?.response?.data as Response)?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    save();
  };
  React.useEffect(() => {
    const fetchPaymentResponse = async () => {
      const query = location.search;
      if (query) {
        try {
          const response = await PaymentService.paymentResponse(query);
          await PaymentService.saveUserDonate({
            username: user?.username || "",
            amount: response.amount || 0,
            message: response.orderDescription || ""
          });
        } catch (e) {
          const error = e as AxiosError;
          setError(
            (error?.response?.data as { message: string })?.message ||
              error.message
          );
        }
      }
    };
    fetchPaymentResponse();
  }, [location.search, user?.username]);
  return (
    <>
      <div className="mb-6">
        <p className="text-md font-semibold flex gap-x-2 items-center">
          <Link
            to={`/home`}
            className="rounded-full bg-blue-gray-50 hover:bg-blue-gray-100 p-2 -ml-10 hidden md:block"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          Donation
        </p>
        <p className="text-xs text-gray-600 text-left">
          If you love this forum and want it to continue operating, please
          donate to us
        </p>
      </div>
      <form onSubmit={handleSubmit(handleDonate)} className="mt-2">
        <div className="flex xl:justify-between xl:flex-row flex-col gap-y-4 xl:gap-x-4"></div>
        <div className="w-full mt-6">
          <label htmlFor="phone" className="block text-gray-700 text-sm m-1">
            Amount
          </label>
          <Input
            id="phone"
            type="text"
            placeholder="ex: 20000"
            className={cn(
              "!border !border-gray-300 bg-white text-gray-900 shadow-xl shadow-gray-900/5 ring-4 ring-transparent placeholder:opacity-100",
              " focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10  placeholder:text-gray-500",
              Boolean(errors.amount?.message) &&
                "focus:!border-red-600 focus:!border-t-red-600 focus:ring-red-600/10 !border-red-500  placeholder:text-red-500"
            )}
            labelProps={{ className: "hidden" }}
            crossOrigin={undefined}
            {...register("amount")}
            disabled={loading}
          />
          {errors.amount && (
            <span
              className={cn(
                "text-red-500 text-xs mt-1 ml-1 flex gap-x-1 items-center"
              )}
            >
              <CircleAlert className="w-3 h-3" /> {errors.amount.message}
            </span>
          )}
        </div>

        <div className="w-full mt-6 gap-x-2">
          <label className="block text-gray-700 text-sm m-1">Description</label>
          <Textarea
            color="blue-gray"
            className={cn(
              "!border !border-gray-300 bg-white text-gray-900 shadow-xl shadow-gray-900/5 ring-4 ring-transparent placeholder:opacity-100",
              " focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10  placeholder:text-gray-500"
            )}
            labelProps={{ className: "hidden" }}
            disabled={loading}
            {...register("description")}
          />
        </div>
        {error && (
          <span className="flex items-center tracking-wide text-xs text-red-500 mt-1 ml-1 gap-x-1 ">
            <CircleAlert className="w-3 h-3" /> {error}
          </span>
        )}
        <div className="flex items-center justify-end">
          <Button
            variant="gradient"
            color="deep-orange"
            type="submit"
            className="mt-4 w-full lg:w-fit normal-case text-sm"
            disabled={loading}
          >
            Donate
          </Button>
        </div>
      </form>
    </>
  );
};

export default Donate;
