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
    <div className="text-black">
      <Typography className="text-sm font-semibold ">About me</Typography>
      <Typography className="text-xs">Major: {profile.major}</Typography>
      <Typography className="text-xs">
        Gender: {convertGenderToString(profile.gender)}
      </Typography>
      <Typography className="text-sm font-semibold mt-2">
        Achievements
      </Typography>
      <div className="flex justify-around">
        <div className="flex flex-col items-center">
          <Typography className="font-semibold">0</Typography>
          <Typography className="text-xs">Posts</Typography>
        </div>
        <div className="flex flex-col items-center">
          <Typography className="font-semibold">0</Typography>
          <Typography className="text-xs">Comments</Typography>
        </div>
      </div>
      {/* <Typography className="text-sm font-semibold">Links</Typography>
      <Button size="sm" variant="outlined" className="rounded-full mt-2">
        <div className="flex items-center">
          <Plus size={"16"} />
          <Typography className="text-xs capitalize ml-1">
            Add social link
          </Typography>
        </div>
      </Button> */}
    </div>
  );
};

export default ProfileDescription;
