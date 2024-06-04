import { signIn } from "@/contexts/auth/reduce";
import { useAuth } from "@/hooks/useAuth";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { checkEmail, cn } from "@/helpers/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";
import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";
type LoginFormsInputs = {
  username: string;
  password: string;
};

const validation = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .test("is-mailFPT", "Username must have @fpt.edu.vn", (value) => {
      return checkEmail(value);
    }),
  password: Yup.string().required("Password is required"),
});

const SignIn: FC = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = async (form: LoginFormsInputs) => {
    let message;
    try {
      message = await AuthService.login(form.username, form.password);
      const user = await UserService.getProfile();
      dispatch(signIn({ user }));
      toast.success(String(message)); // Convert message to a string
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.warning(error.message);
      } else {
        toast.warning("Login failed");
      }
    }
  };
  const handleGoogleLogin = async (response: CredentialResponse) => {
    try {
      const idToken = response.credential;
      if (!idToken) return;
      const message = await AuthService.loginGoogle(idToken);
      const user = await UserService.getProfile();
      dispatch(signIn({ user }));
      toast.success(String(message));
      navigate("/");
    } catch (error) {
      toast.warning("Login failed");
    }
  };

  return (
    <div className="flex h-screen font-inter">
      <div
        className={cn(
          "w-full bg-gray-200 lg:w-1/2",
          "flex items-center justify-center"
        )}
      >
        <div className="max-w-md w-full p-6">
          <h1
            className={cn("text-3xl font-bold mb-6", " text-black text-center")}
          >
            Sign In
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
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>or with email</p>
          </div>
          <form
            onSubmit={handleSubmit(handleLogin)}
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
                {...register("username")}
              />

              {errors.username && (
                <p className={cn("text-red-500 text-xs m-2")}>
                  {errors.username.message}
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
            <div className="-ml-2.5">
              <Checkbox
                label={
                  <Typography color="blue-gray" className="text-sm">
                    Remember Me
                  </Typography>
                }
                crossOrigin={undefined}
              />
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              sign up
            </Button>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              You don't have an account?{" "}
              <a href="#" className="text-black hover:underline">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
