import { signIn } from "@/contexts/auth/reduce";
import { useAuth } from "@/hooks/useAuth";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { FC } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { checkEmail, cn } from "@/helpers/utils";
import { AxiosError } from "axios";
import { Button, Input } from "@material-tailwind/react";
import { Icons } from "@/components/Icons";
import React from "react";
import { Response } from "@/types/response";
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
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({
    mode: "onTouched",
    resolver: yupResolver(validation),
  });

  const handleLogin = async (form: LoginFormsInputs) => {
    try {
      setError("");
      setLoading(true);
      await AuthService.login(form.username, form.password);
      const user = await UserService.getProfile();
      dispatch(signIn({ user }));
      navigate("/");
    } catch (e) {
      const error = e as AxiosError;
      setError((error?.response?.data as Response)?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (response: CredentialResponse) => {
    try {
      setError("");
      setLoading(true);
      const idToken = response.credential;
      if (!idToken) return;
      await AuthService.loginGoogle(idToken);
      const user = await UserService.getProfile();
      dispatch(signIn({ user }));
      navigate("/");
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
        <span className="font-bold text-xl">Login</span>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-semibold m-1">
            Username
          </label>
          <Input
            type="email"
            id="username"
            placeholder="Email Address"
            className={cn(
              "!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:opacity-100",
              " focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10  placeholder:text-gray-500",
              Boolean(errors?.username?.message) &&
                "focus:!border-red-600 focus:!border-t-red-600 focus:ring-red-600/10 !border-red-500  placeholder:text-red-500"
            )}
            labelProps={{ className: "hidden" }}
            crossOrigin={undefined}
            disabled={loading}
            {...register("username", {
              onChange: (e) => setUsername(e.target.value),
            })}
          />

          {errors.username && (
            <span className={cn("text-red-500 text-xs ml-1")}>
              {errors.username.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold m-1">
            Password
          </label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            className={cn(
              "!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:opacity-100",
              "focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10  placeholder:text-gray-500",
              Boolean(errors?.password?.message) &&
                "focus:!border-red-700 focus:!border-t-red-700 focus:ring-red-600/10 !border-red-500  placeholder:text-red-500"
            )}
            labelProps={{ className: "hidden" }}
            crossOrigin={undefined}
            disabled={loading}
            {...register("password", { 
              onChange: (e) => setPassword(e.target.value) 
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-xs ml-1">
              {errors.password.message}
            </span>
          )}
        </div>
        {error && (
          <span className="flex items-center tracking-wide text-xs text-red-500 mt-1 ml-1">
            {error}
          </span>
        )}
        <div className="flex justify-end">
          <Link
            className="text-xs text-black hover:underline"
            to={"/auth/reset-password"}
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="mt-6 text-sm normal-case"
          fullWidth
          disabled={(loading || (username && password))? false : true}
        >
          Sign in
        </Button>
      </form>
      <div className="mt-4 text-xs text-gray-600 text-center">
        <p>
          You don't have an account?{" "}
          <Link to="/auth/register" className="text-black hover:underline">
            Register
          </Link>
        </p>
      </div>
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-b border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-xs text-gray-600">
            Or continue with
          </span>
        </div>
      </div>
      <div className={cn("w-full flex justify-center font-inter")}>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log("Login Failed");
          }}
          width={"120"}
        />
      </div>
    </>
  );
};
export default SignIn;
