/* eslint-disable react-hooks/rules-of-hooks */
import ProfileService from "@/services/ProfileService";
import { useRef } from "react";
import * as Yup from "yup";
import { FormikProps, useFormik } from "formik";
import type { Profile } from "@/types/profile";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import Form from "@/components/profile/Form";
import React from "react";
import useFireBase from "@/hooks/useFireBase";
import Image from "@/components/profile/Image";

const CreateProfile = () => {
    // const { user } = useAuth();
    // const [profile, setProfile] = useState<Profile>({} as Profile);
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageClick = () => {
        if (fileInputRef.current != null) {
            fileInputRef.current.click();
        }
        console.log("click");
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        gender: Yup.number()
            .oneOf([0, 1, 2], "Invalid gender")
            .required("Gender is required"),
        birthDate: Yup.date().required("Birth date is required").nullable(),
        avatarUrl: Yup.mixed().required("A file is required"),
    });

    const formik: FormikProps<Profile> = useFormik<Profile>({
        initialValues: {
            firstName: "",
            lastName: "",
            gender: 0,
            birthDate: null,
            avatarUrl: "https://via.placeholder.com/150",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let response;
            try {
                if (values.avatarUrl instanceof File) {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    values.avatarUrl = await useFireBase(values.avatarUrl);
                }
                response = await ProfileService.createProfile(
                    values as Profile
                );
                console.log(response);
                if (Number(response?.status) === 200) {
                    console.log("status: " + response?.status);
                    toast.success("Update profile successfully");
                    navigate("/");
                } else {
                    console.log("status: " + response?.status);
                    toast.error("Update profile failed");
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.message);
                }
            }
        },
        enableReinitialize: true,
    });
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        console.log(file);
        const profileImage = document.getElementById(
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
                        {/* Header */}
                        <Image
                            fileInputRef={fileInputRef}
                            profile={formik.values}
                            handleImageClick={handleImageClick}
                            handleFileChange={handleFileChange}
                        />
                        {/* Body */}
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

export default CreateProfile;
