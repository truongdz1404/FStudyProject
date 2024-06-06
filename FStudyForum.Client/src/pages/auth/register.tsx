import AuthService from "@/services/AuthService";
import { FC } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { checkEmail, cn } from "@/helpers/utils";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";
import { Button, Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

type RegisterFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required").test("is-mailFPT", "Email must have @fpt.edu.vn", (value) => {
    return checkEmail(value);
  }),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), undefined], "Passwords must match").defined(),
});

const SignUp: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({ resolver: yupResolver(validation) });

  const handleRegister = async (form: RegisterFormInputs) => {
    try {
       await AuthService.register(form.email, form.password);
      navigate(`/auth/confirm-email?email=${form.email}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message);
      } else {
        console.error("Register failed!");
      }
    }
  };

  return (
    <div className="flex h-screen font-inter">
      <div
        className={cn("w-full  lg:w-1/2", "flex items-center justify-center")}
      >
        <div className="max-w-md p-6">
          <h1
            className={cn("text-3xl font-bold mb-6", " text-black text-center")}
          >
            Register
          </h1>
          <h1
            className={cn(
              "text-sm font-semibold mb-6",
              " text-gray-500 text-center"
            )}
          >
            Join to Our Community with all time access and free
          </h1>
          <div className={cn("mt-4 flex flex-col lg:flex-row justify-center")}>
          </div>
          <form
            onSubmit={handleSubmit(handleRegister)}
            method="POST"
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold m-1"
              >
                Username
              </label>
              <Input
                type="email"
                id="username"
                placeholder="Email Address"
                className={cn(
                  "!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                )}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                crossOrigin={undefined}
                {...register("email")}
              />

              {errors.email && (
                <p className={cn("text-red-500 text-xs m-2")}>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold m-1"
              >
                Password
              </label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                crossOrigin={undefined}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs m-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold m-1"
              >
                Confirm Password
              </label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                crossOrigin={undefined}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs m-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              Register
            </Button>
          </form>

          <div className="mt-4 text-xs text-gray-600 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/auth/signin" className="font-medium text-black hover:underline "> Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;