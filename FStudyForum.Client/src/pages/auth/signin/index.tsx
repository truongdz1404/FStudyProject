import { signIn } from "@/contexts/auth/reduce";
import { useAuth } from "@/hooks/useAuth";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { checkEmail, cn } from "@/helpers/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";
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

const SignIn = () => {
    const { dispatch } = useAuth();
    const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });
    
    const handleLogin = async (form: LoginFormsInputs) => {
        let message ;
        try {
            message = await AuthService.login(form.username, form.password);
            const user = await UserService.getProfile();
            dispatch(signIn({ user }));
            toast.success(String(message));
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
        const idToken = response.credential;
        if (!idToken) return;
        await AuthService.loginGoogle(idToken);
        const user = await UserService.getProfile();
        dispatch(signIn({ user }));
        navigate("/");
    };

    return (

        <section className={cn("bg-gray-50", "dark:bg-gray-900")}>
            <div
                className={cn(
                    "flex flex-col",
                    "items-center",
                    "justify-center",
                    "px-6 py-8 mx-auto",
                    "md:h-screen lg:py-0"
                )}
            >
                <div
                    className={cn(
                        "w-full bg-white rounded-lg",
                        "shadow dark:border md:mb-20",
                        "sm:max-w-md xl:p-0",
                        " dark:bg-gray-800 dark:border-gray-700"
                    )}
                >
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1
                            className={cn(
                                "text-xl font-bold leading-tight",
                                "tracking-tight text-gray-900 md:text-2xl dark:text-white"
                            )}
                        >
                            Sign in to your account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(handleLogin)}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className={cn(
                                        "block mb-2 text-sm font-medium",
                                        " text-gray-900 dark:text-white"
                                    )}
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className={cn(
                                        "bg-gray-50 border border-gray-300 text-gray-900",
                                        "sm:text-sm rounded-lg focus:ring-primary-600",
                                        "focus:border-primary-600 block w-full p-2.5",
                                        "dark:bg-gray-700 dark:border-gray-600",
                                        "dark:placeholder-gray-400 dark:text-white",
                                        " dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    )}
                                    placeholder="Username"
                                    {...register("username")}
                                />
                                {errors.username ? (
                                    <p className="text-red-500 text-xs italic">
                                        {errors.username.message}
                                    </p>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    className={cn(
                                        "bg-gray-50 border border-gray-300",
                                        " text-gray-900 sm:text-sm rounded-lg",
                                        " focus:ring-primary-600 focus:border-primary-600",
                                        " block w-full p-2.5 dark:bg-gray-700",
                                        " dark:border-gray-600 dark:placeholder-gray-400",
                                        " dark:text-white dark:focus:ring-blue-500",
                                        " dark:focus:border-blue-500"
                                    )}
                                    {...register("password")}
                                />
                                {errors.password ? (
                                    <p className="text-red-500 text-xs italic">
                                        {errors.password.message}
                                    </p>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <a
                                    href="#"
                                    className={cn(
                                        "text-sm font-medium text-primary-600",
                                        "hover:underline dark:text-primary-500"
                                    )}
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className={cn(
                                    "w-full text-white bg-green-400",
                                    "hover:bg-primary-700 focus:ring-4 focus:outline-none",
                                    "focus:ring-primary-300 font-medium rounded-md text-sm",
                                    " px-5 py-2.5 text-center dark:bg-green-400",
                                    "dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                )}
                            >
                                Sign in
                            </button>
                            <div className="flex items-center justify-center my-4">
                                <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                                <span className="px-2 text-sm text-gray-500 dark:text-gray-400">
                                    OR
                                </span>
                                <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                            </div>
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => {
                                    console.log("Login Failed");
                                }}
                            />
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{" "}
                                <a
                                    href="#"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full h-screen">
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                    console.log("Login Failed");
                }}
            />
        </div>
        </section>
    )
        
    
    
};

export default SignIn;
