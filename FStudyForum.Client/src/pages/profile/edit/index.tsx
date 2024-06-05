import ProfileService from "@/services/ProfileService";
import { useRef, useEffect, useState } from "react";
import useFireBase from "@/hooks/useFireBase";
import * as Yup from "yup";
import { FormikProps, useFormik } from "formik";
import type { Profile } from "@/types/profile";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import Form from "@/components/profile/Form";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import Image from "@/components/profile/Image";
import { Response } from "@/types/response";
const EditProfile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<Profile>({} as Profile);
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const fetchProfile = async () => {
            const response = await ProfileService.getProfileByUserName();
            setProfile(response);
        };
        fetchProfile();
    }, []);
    const handleImageClick = () => {
        if (fileInputRef.current != null) {
            fileInputRef.current.click();
        }
    };

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required("First name is required")
            .min(3, "First name must be at least 3 characters")
            .max(25, "First name must not exceed 25 characters"),
        lastName: Yup.string()
            .required("Last name is required")
            .min(3, "Last name must be at least 3 characters")
            .max(25, "Last name must not exceed 25 characters"),
        gender: Yup.number()
            .oneOf([0, 1, 2], "Invalid gender")
            .required("Gender is required"),
        birthDate: Yup.date().required("Birth date is required").nullable(),
        avatarUrl: Yup.mixed().required("A file is required"),
    });

    const formik: FormikProps<Profile> = useFormik<Profile>({
        initialValues: {
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            gender: profile.gender || 0,
            birthDate: profile.birthDate || null,
            avatarUrl: profile.avatarUrl || "https://via.placeholder.com/150",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let reponse;
            try {
                if (values.avatarUrl instanceof File) {
                    values.avatarUrl = await useFireBase(values.avatarUrl);
                }
                reponse = await ProfileService.editProfile(
                    String(user?.userName),
                    values as Profile
                );
                if (Number(reponse?.status) === 200) {
                    toast.success("Update profile successfully");
                    navigate("/home");
                } else {
                    toast.error("Update profile failed");
                }
            } catch (error: unknown) {
                if (error && (error as AxiosError).isAxiosError) {
                    const axiosError = error as AxiosError;
                    if (axiosError.response && axiosError.response?.data) {
                        const serverError = axiosError.response
                            .data as Response;
                        throw new AxiosError(String(serverError.message));
                    }
                } else {
                    throw error;
                }
            }
        },
        enableReinitialize: true,
    });
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        let profileImage = document.getElementById(
            "profileImage"
        ) as HTMLImageElement;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    profileImage.src = e.target.result as string;
                    formik.setFieldValue("avatarUrl", file);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div>
            <div className="bg-gray-100">
                <div className="container mx-auto py-8">
                    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">                
                        <Image
                            fileInputRef={fileInputRef}
                            profile={profile}
                            handleImageClick={handleImageClick}
                            handleFileChange={handleFileChange}
                        />               
                        <Form
                            formik={formik}
                            fileInputRef={fileInputRef}
                            handleFileChange={handleFileChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EditProfile;
