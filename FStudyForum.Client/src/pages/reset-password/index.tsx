import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import UserService from "@/services/UserService";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkEmail } from "@/helpers/utils";
import * as Yup from "yup";
import { Icons } from "@/components/Icons";
import { Link, useNavigate } from "react-router-dom";

type ForgotPasswordFormInputs = {
  email: string;
};

const validation = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .test("is-mailFPT", "Email must have @fpt.edu.vn", (value) => {
      return checkEmail(value);
    }),
});

const ForgotPassword: FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: yupResolver(validation),
  });

  const onSubmit = async (form: ForgotPasswordFormInputs) => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    setLoading(true);
    try {
      await UserService.forgotPassword(form.email);
      navigate(`/reset-password/confirm-reset-email?email=${email}`, {
        replace: true,
        state: { email },
      });
    } catch (error) {
      console.error("Failed to send password reset email.");
    }
    setLoading(false);
  };

  const handleRequestNewOne = async () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    if (!checkEmail(email)) {
      console.error("Invalid email address.");
      return;
    }
    setLoading(true);
    try {
      await UserService.forgotPassword(email);
      navigate("/reset-password", { replace: true, state: { email } });
    } catch (error) {
      console.error("Failed to resend password reset email.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="w-full max-w-xl">
        <div className="flex justify-center mb-12">
          <Icons.logo className="mx-auto h-28" />
        </div>
        <div className="block text-black-700 font-bold mb-3 text-3xl text-center">
          FStudy.com
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-9">
            <label
              htmlFor="email"
              className="block text-gray-800 font-bold mb-3 text-xl"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
              className="shadow appearance-none border rounded w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xl"
            />
            {errors.email && (
              <p className="text-red-500 text-sm italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded focus:outline-none focus:shadow-outline w-full text-xl"
            disabled={loading}
          >
            {loading ? "Sending email..." : "Reset password"}
          </button>
        </form>
        <div className="mt-9 text-center">
          <p className="text-gray-700 text-sm">
            Didn't receive a confirmation email?
            {/* <a href="#" className="text-blue-500 hover:text-blue-700" onClick={handleRequestNewOne}>Request a new one</a> */}
            <Link
              to=""
              className="inline text-blue-500 hover:text-blue-700 text-sm"
              onClick={handleRequestNewOne}
            >
              {" "}
              Request a new one
            </Link>
          </p>
          <p className="inline text-sm text-gray-700">
            Already have an account?
          </p>
          <Link
            to="/auth/signin"
            className="inline text-blue-500 hover:text-blue-700 text-sm"
          >
            {" "}
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
