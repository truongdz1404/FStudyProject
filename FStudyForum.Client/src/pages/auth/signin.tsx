import { signIn } from "@/contexts/auth/reduce";
import { useAuth } from "@/hooks/useAuth";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { FC ,useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { checkEmail, cn } from "@/helpers/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";
import { Button, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
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
    setError
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });
  const [loadingAPI, setLoadingAPI] = useState(false); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (form: LoginFormsInputs) => {
    let message;
    try {
      setLoadingAPI(true);
      message = await AuthService.login(form.username, form.password);
      const user = await UserService.getProfile();
      dispatch(signIn({ user }));
      toast.success(String(message)); // Convert message to a string
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError("password", { message: error.message});
      } else {
        console.log("Login failed");
        setError("password", { message: "Login failed"});
      }
    } finally {
      setLoadingAPI(false);
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

  const clearErrors = () => {
    setError("password", { message: "" });
    setError("username", { message: "" });
  };

  return (
    <div className="flex h-screen ">
      <div
        className={cn("w-full lg:w-1/2", "flex items-center justify-center")}
      >
        <div className="max-w-md p-6">
          <h1
            className={cn("text-3xl font-bold mb-6", " text-black text-center")}
          >
            Sign In
          </h1>
          <h1 className={cn("text-sm mb-6", " text-gray-500 text-center")}>
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
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-b border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs text-gray-600">
                Or with mail
              </span>
            </div>
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
                {...register("username", {
                  onChange: (e) => {
                    setUsername(e.target.value);
                    if (errors.password || errors.username)
                      clearErrors();
                  }
                })}
              />
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
                {...register("password", {
                  onChange: (e) => {
                    setPassword(e.target.value);
                    if (errors.password || errors.username)
                      clearErrors();
                  }
                })}
              />
              {(errors.password || errors.username) && (
                <p className="text-red-500 text-xs m-2">
                  {errors.password?.message || errors.username?.message}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <Link
                className="text-xs text-black hover:underline"
                to={"/reset-password"}
              >
                Forgot password?
              </Link>
            </div>
            <Button 
              type="submit" 
              className="mt-6" 
              fullWidth
              disabled={((username && password) || loadingAPI) ? false : true}
            >
              {loadingAPI && <FontAwesomeIcon icon={faSpinner} spin />} 
              {" "}sign in
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
        </div>
      </div>
    </div>
  );
};
export default SignIn;
