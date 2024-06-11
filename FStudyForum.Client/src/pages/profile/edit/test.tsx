// import ProfileService from "@/services/ProfileService";
// import { useRef, useEffect, useState } from "react";
// import * as Yup from "yup";
// import type { Profile } from "@/types/profile";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { AxiosError } from "axios";
// import Form from "@/components/profile/Form";
// import { useAuth } from "@/hooks/useAuth";
// import React from "react";
// import Image from "@/components/profile/Image";
// import useFireBase from "@/hooks/useFireBase";

// const EditProfile = () => {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState<Profile>({} as Profile);
//   const navigate = useNavigate();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   useEffect(() => {
//     if (user == null) return;
//     const fetchProfile = async () => {
//       const response = await ProfileService.getByUsername(user.username);
//       setProfile(response);
//     };
//     fetchProfile();
//   }, [user]);
//   const handleImageClick = () => {
//     if (fileInputRef.current != null) {
//       fileInputRef.current.click();
//     }
//   };

//   const validationSchema = Yup.object({
//     firstName: Yup.string().required("First name is required"),
//     lastName: Yup.string().required("Last name is required"),
//     gender: Yup.number()
//       .oneOf([0, 1, 2], "Invalid gender")
//       .required("Gender is required"),
//     birthDate: Yup.date().required("Birth date is required").nullable(),
//     avatarUrl: Yup.mixed().required("A file is required"),
//   });

//   const formik: FormikProps<Profile> = useFormik<Profile>({
//     initialValues: {
//       firstName: profile.firstName || "",
//       lastName: profile.lastName || "",
//       gender: profile.gender || 0,
//       avatarUrl: profile.avatarUrl || "https://via.placeholder.com/150",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       let message;
//       try {
//         if (values.avatarUrl instanceof File) {
//           // eslint-disable-next-line react-hooks/rules-of-hooks
//           values.avatarUrl = await useFireBase(values.avatarUrl);
//         }
//         console.log(values.avatarUrl);
//         message = await ProfileService.update(
//           String(user?.username),
//           values as Profile
//         );
//         console.log(message);
//         if (!message) {
//           toast.error("Update profile failed");
//         } else {
//           toast.success("Update profile successfully");
//           navigate("/home");
//         }
//       } catch (error) {
//         if (error instanceof AxiosError) {
//           console.log(error.message);
//         }
//       }
//     },
//     enableReinitialize: true,
//   });
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files ? event.target.files[0] : null;
//     const profileImage = document.getElementById(
//       "profileImage"
//     ) as HTMLImageElement;
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         if (e.target && e.target.result) {
//           profileImage.src = e.target.result as string;
//           formik.setFieldValue("avatarUrl", file);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   return (
//     <div>
//       <div className="container mx-auto py-8">
//         <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
//           <Image
//             fileInputRef={fileInputRef}
//             profile={profile}
//             handleImageClick={handleImageClick}
//             handleFileChange={handleFileChange}
//           />
//           <Form
//             formik={formik}
//             fileInputRef={fileInputRef}
//             handleFileChange={handleFileChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default EditProfile;
