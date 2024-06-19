import { cn } from "@/helpers/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Button,
  Input,
  Radio,
  Textarea
} from "@material-tailwind/react";
import { ArrowLeft, Camera, CircleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useAuth } from "@/hooks/useAuth";
import { PhoneRegExp } from "@/helpers/constants";
import { AxiosError } from "axios";
import { Response } from "@/types/response";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileService from "@/services/ProfileService";
import UserService from "@/services/UserService";
import { signIn } from "@/contexts/auth/reduce";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/helpers/storage";
import { useQuery } from "@tanstack/react-query";
const validation = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.number()
    .oneOf([0, 1, 2], "Invalid gender")
    .required("Gender is required"),
  avatar: Yup.string(),
  phone: Yup.string().matches(PhoneRegExp, "Phone number is not valid")
});

interface EditProfileInputs {
  firstName: string;
  lastName: string;
  gender: number;
  avatar?: string;
  phone?: string;
  marjor?: string;
  bio?: string;
}
const metadata = {
  contentType: "image/jpeg"
};
const ProfileSettings = () => {
  const { user, dispatch } = useAuth();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [avatar, setAvatar] = React.useState(user!.avatar);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File>();
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: [`profile-${user?.username}`],
    queryFn: () => ProfileService.getByUsername(user!.username),
    enabled: !!user
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditProfileInputs>({
    mode: "onTouched",
    defaultValues: React.useMemo(() => {
      return {
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        gender: profile?.gender,
        avatar: profile?.avatar,
        phone: profile?.phone,
        bio: profile?.bio
      };
    }, [profile]),
    resolver: yupResolver(validation)
  });

  React.useEffect(() => {
    return () => {
      URL.revokeObjectURL(avatar);
    };
  }, [avatar]);

  const handlePreviewAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;
    setFile(file);
    setAvatar(URL.createObjectURL(file));
  };

  const handleEditProfile = async (form: EditProfileInputs) => {
    if (user == null) {
      setError("User is not authenticated");
      return;
    }
    setLoading(true);

    const save = async () => {
      try {
        await ProfileService.update(user.username, {
          firstName: form.firstName,
          lastName: form.lastName,
          gender: form.gender,
          avatar: url,
          major: form.marjor,
          phone: form.phone,
          bio: form.bio
        });
        const newUser = await UserService.getProfile();
        dispatch(signIn({ user: newUser }));
        navigate("/profile/" + user.username);
      } catch (e) {
        const error = e as AxiosError;
        setError((error?.response?.data as Response)?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    let url = avatar;
    if (file) {
      const storageRef = ref(storage, `images/avatar${user.username}`);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on(
        "state_changed",
        () => {},
        error => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            setFile(undefined);
            url = downloadURL;
            save();
          });
        }
      );
    } else {
      save();
    }
  };
  return (
    <>
      <div className="mb-6">
        <p className="text-md font-semibold flex gap-x-2 items-center">
          <Link
            to={`/profile/${user?.username}`}
            className="rounded-full bg-blue-gray-50 hover:bg-blue-gray-100 p-2 lg:-ml-10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          Edit Profile
        </p>
        <p className="text-xs text-gray-600 text-left">
          Tell us a bit about yourself to get started on our forum
        </p>
      </div>
      <div className="relative">
        <Avatar
          variant="circular"
          size="xxl"
          alt="avatar"
          className="bg-white  p-0.5"
          src={avatar}
        />
        <input
          onChange={handlePreviewAvatar}
          multiple={false}
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg"
          hidden
        />
        <div
          className="absolute bottom-0 left-20 bg-blue-gray-50 rounded-full hover:cursor-pointer "
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="h-4 w-4 m-1" strokeWidth={1.5} />
        </div>
      </div>
      <form onSubmit={handleSubmit(handleEditProfile)} className="mt-2">
        <div className="flex xl:justify-between xl:flex-row flex-col gap-y-4 xl:gap-x-4">
          <div className="w-full xl:w-1/2">
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm m-1"
            >
              First name
            </label>
            <Input
              id="firstName"
              type="text"
              placeholder="ex: Bac"
              className={cn(
                "!border !border-gray-300 bg-white text-gray-900 shadow-xl shadow-gray-900/5 ring-4 ring-transparent placeholder:opacity-100",
                " focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10  placeholder:text-gray-500 !min-w-[100px]",
                Boolean(errors.firstName?.message) &&
                  "focus:!border-red-600 focus:!border-t-red-600 focus:ring-red-600/10 !border-red-500  placeholder:text-red-500"
              )}
              containerProps={{ className: "min-w-full" }}
              labelProps={{ className: "hidden" }}
              crossOrigin={undefined}
              disabled={loading}
              {...register("firstName")}
            />
            {errors.firstName && (
              <span
                className={cn(
                  "text-red-500 text-xs mt-1 ml-1 flex gap-x-1 items-center"
                )}
              >
                <CircleAlert className="w-3 h-3" /> {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="w-full xl:w-1/2">
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-sm m-1"
            >
              Last name
            </label>
            <Input
              id="lastName"
              type="text"
              placeholder="ex: Ngo Xuan"
              className={cn(
                "!border !border-gray-300 bg-white text-gray-900 shadow-xl shadow-gray-900/5 ring-4 ring-transparent placeholder:opacity-100",
                " focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10  placeholder:text-gray-500",
                Boolean(errors.lastName?.message) &&
                  "focus:!border-red-600 focus:!border-t-red-600 focus:ring-red-600/10 !border-red-500  placeholder:text-red-500"
              )}
              containerProps={{ className: "min-w-full" }}
              labelProps={{ className: "hidden" }}
              crossOrigin={undefined}
              {...register("lastName")}
              disabled={loading}
            />
            {errors.lastName && (
              <span
                className={cn(
                  "text-red-500 text-xs mt-1 ml-1 flex gap-x-1 items-center"
                )}
              >
                <CircleAlert className="w-3 h-3" /> {errors.lastName.message}
              </span>
            )}
          </div>
        </div>
        <div className="w-full mt-6">
          <label htmlFor="phone" className="block text-gray-700 text-sm m-1">
            Phone (optional)
          </label>
          <Input
            id="phone"
            type="text"
            placeholder="ex: 0123456789"
            className={cn(
              "!border !border-gray-300 bg-white text-gray-900 shadow-xl shadow-gray-900/5 ring-4 ring-transparent placeholder:opacity-100",
              " focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10  placeholder:text-gray-500",
              Boolean(errors.phone?.message) &&
                "focus:!border-red-600 focus:!border-t-red-600 focus:ring-red-600/10 !border-red-500  placeholder:text-red-500"
            )}
            labelProps={{ className: "hidden" }}
            crossOrigin={undefined}
            {...register("phone")}
            disabled={loading}
          />
          {errors.phone && (
            <span
              className={cn(
                "text-red-500 text-xs mt-1 ml-1 flex gap-x-1 items-center"
              )}
            >
              <CircleAlert className="w-3 h-3" /> {errors.phone.message}
            </span>
          )}
        </div>
        <div className="w-full mt-6 gap-x-2">
          <label className="block text-gray-700 text-sm m-1">Gender</label>
          <div className="flex gap-x-4">
            <Radio
              color="orange"
              label={<p className="text-sm">Male</p>}
              defaultChecked={profile?.gender == 0}
              crossOrigin={undefined}
              className="w-4 h-4"
              value={0}
              {...register("gender")}
              disabled={loading}
            />
            <Radio
              color="orange"
              defaultChecked={profile?.gender == 1}
              label={<p className="text-sm">Female</p>}
              crossOrigin={undefined}
              className="w-4 h-4"
              value={1}
              {...register("gender")}
              disabled={loading}
            />
            <Radio
              color="orange"
              defaultChecked={profile?.gender == 2}
              label={<p className="text-sm">Other</p>}
              crossOrigin={undefined}
              className="w-4 h-4"
              value={2}
              {...register("gender")}
              disabled={loading}
            />
          </div>
          <div className="w-full mt-6 gap-x-2">
            <label className="block text-gray-700 text-sm m-1">
              About (optional)
            </label>
            <Textarea
              color="blue-gray"
              className={cn(
                "!border !border-gray-300 bg-white text-gray-900 shadow-xl shadow-gray-900/5 ring-4 ring-transparent placeholder:opacity-100",
                " focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10  placeholder:text-gray-500"
              )}
              labelProps={{ className: "hidden" }}
              disabled={loading}
              {...register("bio")}
            />
          </div>
        </div>
        {error && (
          <span className="flex items-center tracking-wide text-xs text-red-500 mt-1 ml-1 gap-x-1 ">
            <CircleAlert className="w-3 h-3" /> {error}
          </span>
        )}
        <div className="flex items-center justify-end">
          <Button
            variant="gradient"
            color="deep-orange"
            type="submit"
            className="mt-4 w-full lg:w-fit normal-case text-sm"
            disabled={loading}
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default ProfileSettings;
