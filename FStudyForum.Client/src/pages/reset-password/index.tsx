import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "@/services/UserService";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkEmail } from "@/helpers/utils";
import * as Yup from "yup";
import {Icons} from "@/components/Icons"
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
                    {/* <img alt="GitLab Logo" className="h-36" src="" /> */}
                    <Icons.logo className="mx-auto h-28"/>
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
