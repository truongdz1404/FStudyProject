import { Button, Card, Typography } from "@material-tailwind/react";
import ProfileService from "@/services/ProfileService";
import React, { useRef, useEffect, useState } from "react";
import useFireBase from "@/hooks/useFireBase";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Profile } from "@/types/profile";

const UserProfile: React.FC = () => {
    const [profile, setProfile] = useState<Profile>({} as Profile);
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
        userName: Yup.string().required("Username is required"),
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        gender: Yup.number()
            .oneOf([1, 2, 3], "Invalid gender")
            .required("Gender is required"),
        birthDate: Yup.date().required("Birth date is required").nullable(),
        avatarUrl: Yup.mixed().required("A file is required"),
    });

    const formik = useFormik({
        initialValues: {
            userName: profile.userName || "",
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            gender: profile.gender || 0,
            birthDate: profile.birthDate || "",
            avatarUrl:
                profile.avatarUrl ||
                "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            values.avatarUrl = await useFireBase(values.avatarUrl);
            const userProfile = await ProfileService.editProfile(values.userName, values as Profile);
            console.log("User profile: ", userProfile);
            console.log("Form data: ", values);
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
        <>
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <form
                    className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                    onSubmit={formik.handleSubmit}
                >
                    <div>
                        <img
                            className="h-96 w-96 rounded-full object-cover object-center cursor-pointer"
                            src={
                                "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                            }
                            alt="nature image"
                            onClick={handleImageClick}
                            id="profileImage"
                        />

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            name="avatarUrl"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            Username
                        </Typography>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Username"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        />
                        {formik.touched.userName && formik.errors.userName ? (
                            <div className="text-red-500">
                                {formik.errors.userName}
                            </div>
                        ) : null}
                    </div>

                    <div className="mb-1 flex flex-col gap-6">
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            First Name
                        </Typography>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div className="text-red-500">
                                {formik.errors.firstName}
                            </div>
                        ) : null}
                    </div>

                    <div className="mb-1 flex flex-col gap-6">
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            Last Name
                        </Typography>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div className="text-red-500">
                                {formik.errors.lastName}
                            </div>
                        ) : null}
                    </div>

                    <div className="mb-1 flex flex-col gap-6">
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            Gender
                        </Typography>
                        <select
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        >
                            <option value="">Select gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                            <option value="3">Other</option>
                        </select>
                        {formik.touched.gender && formik.errors.gender ? (
                            <div className="text-red-500">
                                {formik.errors.gender}
                            </div>
                        ) : null}
                    </div>

                    <div className="mb-1 flex flex-col gap-6">
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            Birth Date
                        </Typography>
                        <input
                            type="datetime-local"
                            name="birthDate"
                            value={formik.values.birthDate.toString()}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        />
                        {formik.touched.birthDate && formik.errors.birthDate ? (
                            <div className="text-red-500">
                                {formik.errors.birthDate}
                            </div>
                        ) : null}
                    </div>
                    <Button type="submit" className="mt-6" fullWidth>
                        Save
                    </Button>
                </form>
            </Card>
        </>
    );
};

export default UserProfile;
