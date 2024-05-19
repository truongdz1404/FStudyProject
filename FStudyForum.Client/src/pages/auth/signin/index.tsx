import { signIn } from "@/contexts/auth/reduce";
import { useAuth } from "@/hooks/useAuth";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";
import { FC } from "react";

const SignIn: FC = () => {
    const { dispatch } = useAuth();

    const handleLogin = async () => {
        await AuthService.login("vodichsieucap@gmail.com", "12345678");
        const user = await UserService.getProfile();
        dispatch(signIn({ user }));
    };

    return (
        <>
            <button className="bg-black text-white" onClick={handleLogin}>
                Login
            </button>
        </>
    );
};
export default SignIn;
