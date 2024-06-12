import ContentLayout from "@/components/layout/ContentLayout";
import ProfileDescription from "@/components/profile/ProfileDescription";
import { useAuth } from "@/hooks/useAuth";
import ProfileService from "@/services/ProfileService";
import { Profile as ProfileDTO } from "@/types/profile";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Camera, PencilLine, Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
const tabItems = [
  {
    label: "Overview",
  },
  {
    label: "Posts",
  },
];
const Profile = () => {
  const [profile, setProfile] = React.useState<ProfileDTO>();
  const { user } = useAuth();
  React.useEffect(() => {
    if (!user) return;
    (async () => {
      const profile = await ProfileService.getByUsername(user?.username);
      setProfile(profile);
    })();
  }, [user]);
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  if (!profile) return <></>;
  return (
    <ContentLayout pannel={<ProfileDescription profile={profile} />}>
      <div className="flex flex-col items-center w-full mb-24">
        <div className="relative w-full max-w-screen-lg">
          <img
            src="https://i.ibb.co/FWggPq1/banner.png"
            className="w-full object-center h-36 rounded-sm"
          />
          <div className="absolute -bottom-1/2 left-4">
            <Avatar
              variant="circular"
              size="xxl"
              alt="avatar"
              className="bg-white  p-0.5"
              src={profile?.avatar}
            />
            <Link
              to={"/profile/edit"}
              className="absolute bottom-0 right-0 bg-blue-gray-50 rounded-full"
            >
              <Camera className="h-4 w-4 m-1" strokeWidth={1.5} />
            </Link>
          </div>

          {/* <div className="absolute bottom-0 right-0 bg-blue-gray-50 rounded-full m-2 font-normal">
            <Camera className="h-4 w-4 m-1 " strokeWidth={1.5} />
          </div> */}

          <div className="absolute left-32 pl-2 font-semibold text-md">
            {profile && profile.lastName + " " + profile.firstName}
          </div>
          <Link className="mt-2 absolute right-0" to="/profile/edit">
            <Button
              size="sm"
              variant="outlined"
              className="rounded-full px-2 py-2"
            >
              <div className="flex items-center">
                <PencilLine size={"16"} />
                <div className="mx-1">
                  <Typography className="text-xs capitalize font-normal hidden xl:block">
                    Edit Profile
                  </Typography>
                  <Typography className="text-xs capitalize font-normal block  xl:hidden">
                    Edit
                  </Typography>
                </div>
              </div>
            </Button>
          </Link>
        </div>
      </div>

      <Accordion open={open === 1} className="xl:hidden mb-2">
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="py-0 pb-2 text-md text-blue-gray-800 font-semibold !justify-normal"
        >
          Introduction
        </AccordionHeader>
        <AccordionBody className="py-0 pt-2 ">
          <ProfileDescription profile={profile} />
          <hr className="mt-4 border-blue-gray-50" />
        </AccordionBody>
      </Accordion>

      <div className="flex w-max gap-4">
        {tabItems.map(({ label }) => (
          <Button
            key={label}
            variant="text"
            size="sm"
            className="rounded-full bg-blue-gray-50"
          >
            <Typography className="text-sm capitalize  text-black">
              {label}
            </Typography>
          </Button>
        ))}
      </div>
      <Button size="sm" variant="outlined" className="rounded-full mt-2">
        <div className="flex items-center">
          <Plus size={"16"} />
          <Typography className="text-xs capitalize ml-1">
            Create a Post
          </Typography>
        </div>
      </Button>
      <hr className="my-2 border-blue-gray-50" />
      <div className="flex justify-center h-screen">
        <Typography className="text-sm capitalize font-semibold">
          Hasn't posts yet
        </Typography>
      </div>
    </ContentLayout>
  );
};

export default Profile;
