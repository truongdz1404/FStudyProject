import ProfileService from "@/services/ProfileService";
import { useRef, useEffect, useState } from "react";
import useFireBase from "@/hooks/useFireBase";
import * as Yup from "yup";
import { FormikProps, useFormik } from "formik";
import { Profile } from "@/types/profile";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import Header from "@/components/profile/header";
import Body from "@/components/profile/body";

const UserProfile = () => {
    const [profile, setProfile] = useState<Profile>({} as Profile);
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const fetchProfile = async () => {
            const response = await ProfileService.getProfileByUserName();
            setProfile(response);
            console.log(response);
        };
        fetchProfile();
    }, []);

    const handleImageClick = () => {
        if (fileInputRef.current != null) {
            fileInputRef.current.click();
        }
        console.log("click");
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

    const formik: FormikProps<Profile> = useFormik<Profile>({
        initialValues: {
            id: profile.id,
            userName: profile.userName || "",
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            gender: profile.gender || 0,
            birthDate: profile.birthDate || "",
            avatarUrl: profile.avatarUrl || "https://via.placeholder.com/150",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let reponse ;
            try {
                if (values.avatarUrl instanceof File) {
                    values.avatarUrl = await useFireBase(values.avatarUrl);
                }
                console.log(values.avatarUrl);
                reponse = await ProfileService.editProfile(
                    profile.id,
                    values as Profile
                ) 
                console.log(reponse);
                if (!reponse) {
                    toast.error("Update profile failed");
                } else {
                    toast.success("Update profile successfully");
                    navigate("/home");
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
                        {/* Header */}
                        <Header
                            fileInputRef={fileInputRef}
                            profile={profile}
                            formik={formik}
                            handleImageClick={handleImageClick}
                            handleFileChange={handleFileChange}
                        />
                        {/* Body */}
                        <Body
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
export default UserProfile;
