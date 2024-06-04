import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "@/services/UserService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {Icons} from "@/components/Icons";

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
                    <Icons.logo className="mx-auto h-28"/>
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
