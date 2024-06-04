import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "@/services/UserService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type ChangePasswordFormInputs = {
    password: string;
    confirmPassword: string;
};

const validation = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), undefined], "Passwords must match").defined(),
});

const ChangePassword: FC = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    // Extract token and email from query string
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePasswordFormInputs>({
        resolver: yupResolver(validation),
    });

    const onSubmit = async (form: ChangePasswordFormInputs) => {
        setLoading(true);
        if (!token) {
            toast.error("Failed to retrieve token.");
            setLoading(false);
            return;
        }
        if (!email) {
            toast.error("Failed to retrieve email.");
            setLoading(false);
            return;
        }
        if (!form.password) {
            toast.error("Password is required.");
            setLoading(false);
            return;
        }
        try {
            await UserService.changePassword(token, email, form.password);
            toast.success("Password reset successfully.");
        } catch (error) {
            toast.error("Failed to reset password.");
        }
        setLoading(false);
    };

    const handleRequestNewOne = async () => {
        if(!email){
            navigate('/reset-password/send-mail', { replace: true });
            setTimeout(() => {
                window.location.reload();
            }, 0);
            return null;
        }
        try {
            await UserService.forgotPassword(email);
            toast.success("Password reset email sent. Please check your email.");
        }
        catch (error) {
            toast.error("Failed to resend password reset email.");
        }
        
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-8">
                    <img  alt="GitLab Logo" className="mx-auto h-36" src="data:image/png;base64,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"/>
                    <h2 className="block text-black-700 font-bold mb-3 text-3xl text-center">FStudy.com</h2>
                    <h3 className="text-2xl text-gray-700 font-bold">Change your password</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-800 font-bold mb-3 text-lg">
                            New password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="New password"
                            {...register("password")}
                            className="shadow appearance-none border rounded w-full py-4 px-5 text-gray-700 leading-tight focus:outline-gray focus:shadow-outline text-lg"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm italic">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-800 font-bold mb-3 text-lg">
                            Confirm new password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            {...register("confirmPassword")}
                            className="shadow appearance-none border rounded w-full py-4 px-5 text-gray-700 leading-tight focus:outline-gray focus:shadow-outline text-lg"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm italic">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded focus:outline-none focus:shadow-outline w-full text-lg"
                        disabled={loading}
                    >
                        {loading ? "Changing Password..." : "Change your password"}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <p className="text-gray-700 text-lg">
                        Didn't receive a confirmation email? <a href="#" className="text-blue-500 hover:text-blue-700" onClick={handleRequestNewOne}>Request a new one</a>
                    </p>
                    <p className="text-gray-700 mt-3 text-lg">
                        Already have an account? <a href="http://localhost:3000/auth/signin" className="text-blue-500 hover:text-blue-700">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
