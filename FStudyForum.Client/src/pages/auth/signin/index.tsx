import { signIn } from "@/contexts/auth/reduce";
import { useAuth } from "@/hooks/useAuth";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const SignIn: FC = () => {
    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async () => {
        await AuthService.login("vodichsieucap@gmail.com", "12345678");
        const user = await UserService.getProfile();
        dispatch(signIn({ user }));
        navigate("/");
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
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                    console.log("Login Failed");
                }}
            />
            <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={handleLogin}
            >
                Login with account
            </button>
        </div>
    );
};
export default SignIn;
