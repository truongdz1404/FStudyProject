import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "@/services/UserService";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkEmail } from "@/helpers/utils";
import * as Yup from "yup";

type ForgotPasswordFormInputs = {
    email: string;
};

const validation = Yup.object().shape({
    email: Yup.string().required("Email is required").test("is-mailFPT", "Email must have @fpt.edu.vn", (value) => {
        return checkEmail(value);
    }),
});

const ForgotPassword: FC = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormInputs>({
        resolver: yupResolver(validation),
    });

    const onSubmit = async (form: ForgotPasswordFormInputs) => {
        setLoading(true);
        try {
            await UserService.forgotPassword(form.email);
            toast.success("Password reset email sent. Please check your email.");
        } catch (error) {
            toast.error("Failed to send password reset email.");
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <div className="w-full max-w-3xl">
                <div className="flex justify-center mb-12">
                    <img alt="GitLab Logo" className="h-36" src="data:image/png;base64,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" />
                </div>
                <div className="block text-black-700 font-bold mb-3 text-3xl text-center">
                    FStudy.com
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className="mb-9">
                        <label htmlFor="email" className="block text-gray-800 font-bold mb-3 text-xl">
                            Email
                        </label>
                       
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                            className="shadow appearance-none border rounded w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xl"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm italic">{errors.email.message}</p>
                        )}
                         <div className="block text-gray-700 mb-3 text-xl">
                            
                        </div>
                    </div>
                    {/* <div className="mb-9">
                        <input type="checkbox" id="recaptcha" className="mr-3" />
                        <label htmlFor="recaptcha" className="text-gray-700 text-xl">I'm not a robot</label>
                    </div> */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded focus:outline-none focus:shadow-outline w-full text-xl"
                        disabled={loading}
                    >
                        {loading ? "Sending email..." : "Reset password"}
                    </button>
                </form>
                <div className="mt-9 text-center">
                    <p className="inline text-xl text-gray-700">Already have an account?</p>
                    <a href="/auth/signin" className="inline text-blue-500 hover:text-blue-700 text-xl"> Sign in</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
