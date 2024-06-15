import { Profile } from "@/types/profile"
import { Typography } from "@material-tailwind/react"
import { FC } from "react"
type ProfileDescriptionProps = {
  profile: Profile
}
const convertGenderToString = (gender: number) => {
  switch (gender) {
    case 0:
      return "Male"
    case 1:
      return "Female"
    default:
      return "Other"
  }
}
const ProfileDescription: FC<ProfileDescriptionProps> = ({ profile }) => {
  return (
    <div className="text-blue-gray-600">
      <Typography className="text-sm font-semibold ">About me: </Typography>
      <Typography className="text-xs">{profile.bio}</Typography>
      <Typography className="text-sm font-semibold mt-2">
        Achievements:
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
      <Typography className="text-sm font-semibold mt-2">
        Major: <span className="text-xs font-medium">{profile.major}</span>
      </Typography>

      <Typography className="text-sm font-semibold mt-2">
        Gender:{" "}
        <span className="text-xs font-medium">
          {convertGenderToString(profile.gender)}
        </span>
      </Typography>

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
  )
}

export default ProfileDescription
