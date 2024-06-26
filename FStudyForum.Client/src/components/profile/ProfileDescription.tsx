import { Profile } from "@/types/profile";
import { Typography } from "@material-tailwind/react";
import { FC } from "react";
type ProfileDescriptionProps = {
  profile: Profile;
};
const convertGenderToString = (gender: number) => {
  switch (gender) {
    case 0:
      return "Male";
    case 1:
      return "Female";
    default:
      return "Other";
  }
};
const ProfileDescription: FC<ProfileDescriptionProps> = ({ profile }) => {
  return (
    <div className="text-blue-gray-800">
      <Typography className="text-xs font-semibold">Achievements:</Typography>
      <div className="flex justify-around">
        <div className="flex flex-col items-center text-xs">
          <Typography className="text-sm font-medium">0</Typography>
          <Typography className="text-xs font-light">Posts</Typography>
        </div>
        <div className="flex flex-col items-center text-xs">
          <Typography className="text-sm font-medium">0</Typography>
          <Typography className="text-xs font-light">Comments</Typography>
        </div>
      </div>
      <Typography className="text-xs font-semibold mt-2">
        Major: <span className="font-light">{profile.major}</span>
      </Typography>

      <Typography className="text-xs font-semibold mt-2">
        Gender:{" "}
        <span className=" font-light">
          {convertGenderToString(profile.gender)}
        </span>
      </Typography>
      <Typography className="text-xs font-semibold mt-2">About me: </Typography>
      <Typography className="text-xs ">{profile.bio}</Typography>
    </div>
  );
};

export default ProfileDescription;
