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
        </div>
    );
};
export default SignIn;
