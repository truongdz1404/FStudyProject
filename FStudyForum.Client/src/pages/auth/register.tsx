import AuthService from "@/services/AuthService";
import { FC } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { checkEmail, cn } from "@/helpers/utils";
import { Button, Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "@/components/Icons";
import React from "react";
import { AxiosError } from "axios";
import { Response } from "@/types/response";
import { CircleAlert } from "lucide-react";

type RegisterFormInputs = {
  username: string;
  password: string;
  confirmPassword: string;
};

const validation = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .test("is-mailFPT", "Email must have @fpt.edu.vn", (value) => {
      return checkEmail(value);
    }),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must have at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Confirm password do not match"),
});

const SignUp: FC = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    mode: "onTouched",
    resolver: yupResolver(validation),
  });

  const handleRegister = async (form: RegisterFormInputs) => {
    try {
      setError("");
      setLoading(true);
      await AuthService.register(form.username, form.password);
      navigate(`/auth/confirm-email?email=${form.username}`);
    } catch (e) {
      const error = e as AxiosError;
      setError((error?.response?.data as Response)?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col mb-4 items-center">
        <Icons.logo className="w-10 h-10" />
        <span className="font-bold text-lg">Register</span>
      </div>
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-gray-700 text-sm m-1">
            Username
          </label>
          <Input
            id="username"
            type="email"
            placeholder="Email Address"
            className={cn(
              "!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:opacity-100",
              " focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10  placeholder:text-gray-500",
              Boolean(errors?.username?.message) &&
                "focus:!border-red-600 focus:!border-t-red-600 focus:ring-red-600/10 !border-red-500  placeholder:text-red-500"
            )}
            labelProps={{ className: "hidden" }}
            disabled={loading}
            crossOrigin={undefined}
            {...register("username")}
          />

          {errors.username && (
            <span
              className={cn(
                "text-red-500 text-xs mt-1 ml-1 flex gap-x-1 items-center"
              )}
            >
              <CircleAlert className="w-3 h-3" /> {errors.username.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm m-1">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            className={cn(
              "!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:opacity-100",
              " focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10  placeholder:text-gray-500",
              Boolean(errors?.password?.message) &&
                "focus:!border-red-600 focus:!border-t-red-600 focus:ring-red-600/10 !border-red-500  placeholder:text-red-500"
            )}
            labelProps={{ className: "hidden" }}
            disabled={loading}
            crossOrigin={undefined}
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500 text-xs mt-1 ml-1 flex gap-x-1 items-center">
              <CircleAlert className="w-3 h-3" /> {errors.password.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm text-gray-700 m-1"
          >
            Confirm password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Cofirm password"
            className={cn(
              "!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:opacity-100",
              " focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10  placeholder:text-gray-500",
              Boolean(errors?.confirmPassword?.message) &&
                "focus:!border-red-600 focus:!border-t-red-600 focus:ring-red-600/10 !border-red-500  placeholder:text-red-500"
            )}
            labelProps={{ className: "hidden" }}
            disabled={loading}
            crossOrigin={undefined}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs mt-1 ml-1 flex gap-x-1 items-center">
              <CircleAlert className="w-3 h-3" />
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        {error && (
          <span className="flex items-center tracking-wide text-xs text-red-500 mt-1 ml-1 gap-x-1 ">
            <CircleAlert className="w-3 h-3" /> {error}
          </span>
        )}
        <div>
          <Button
            type="submit"
            className="mt-6 normal-case text-sm text-center"
            fullWidth
            disabled={loading}
            variant="gradient"
            color="deep-orange"
          >
            Register
          </Button>
        </div>
      </form>

      <div className="mt-4 text-xs text-gray-600 text-center">
        <span>
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="text-deep-orange-600 font-bold hover:underline "
          >
            Sign in
          </Link>
        </span>
      </div>
    </>
  );
};

export default SignUp;
