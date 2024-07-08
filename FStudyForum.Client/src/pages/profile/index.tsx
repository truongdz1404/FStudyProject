import ContentLayout from "@/components/layout/ContentLayout";
import ProfileDescription from "@/components/profile/ProfileDescription";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  Button,
  Spinner,
  Typography
} from "@material-tailwind/react";
import { Camera, PencilLine, Plus } from "lucide-react";
import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { cn } from "@/helpers/utils";
import { useAuth } from "@/hooks/useAuth";
import BannerDefault from "@/assets/images/banner.png";
import AvatarDefault from "@/assets/images/user.png";
import ImageWithLoading from "@/components/ui/ImageWithLoading";
import { useRouterParam } from "@/hooks/useRouterParam";

const tabItems = [
  {
    label: "Overview",
    path: ""
  },
  {
    label: "Saved",
    path: "save"
  }
];
const Profile = () => {
  const { user } = useAuth();
  const { username } = useParams<{ username: string }>();
  const { user: profile } = useRouterParam();

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  if (!profile) return <Spinner className="mx-auto" />;
  return (
    <ContentLayout pannel={<ProfileDescription profile={profile} />}>
      <div className="flex flex-col items-center w-full mb-16">
        <div className="relative w-full max-w-screen-lg">
          <div className="w-full rounded-none md:rounded-lg h-28 overflow-hidden">
            <ImageWithLoading
              src={profile?.banner || BannerDefault}
              className="object-cover w-full h-full "
            />
          </div>
          <div className="absolute -bottom-1/3 left-4">
            <Avatar
              variant="circular"
              size="xl"
              alt="avatar"
              className="bg-white  p-0.5"
              src={profile?.avatar || AvatarDefault}
            />
            <Link
              to="/settings/profile"
              className={cn(
                "absolute bottom-0 right-0 bg-blue-gray-50 rounded-full p-1",
                user?.username !== username && "hidden"
              )}
            >
              <Camera className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>

          <Link
            to="/settings/profile"
            className={cn(
              "absolute bottom-0 right-0 bg-blue-gray-50 rounded-full m-1 p-1",
              user?.username !== username && "hidden"
            )}
          >
            <Camera className="h-4 w-4" strokeWidth={1.5} />
          </Link>

          <div className="absolute left-24">
            <p className="font-semibold text-sm">
              {profile.lastName + " " + profile.firstName}
            </p>
            <p className="text-xs font-light">
              {"u/" + username?.toLowerCase()}
            </p>
          </div>
          <Link
            className={cn(
              "mt-2 absolute right-0",
              user?.username !== username && "hidden"
            )}
            to="/settings/profile"
          >
            <Button
              size="sm"
              variant="outlined"
              className="rounded-full px-2 py-2"
            >
              <div className="flex items-center gap-x-1">
                <PencilLine className="w-4 h-4" />
                <Typography className="text-xs capitalize font-normal hidden xl:block">
                  Edit Profile
                </Typography>
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Accordion open={open === 1} className="xl:hidden mb-2">
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="py-0 pb-2 text-sm text-blue-gray-800 font-semibold !justify-normal"
          >
            <span className="ml-4">About</span>
          </AccordionHeader>
          <AccordionBody className="py-0 pt-2 ">
            <ProfileDescription profile={profile} />
            <hr className="mt-4 border-blue-gray-50" />
          </AccordionBody>
        </Accordion>
        <div className="flex w-max gap-4">
          {tabItems.map(({ label, path }) => (
            <Link to={path} key={label}>
              <Button
                variant="text"
                size="sm"
                className="rounded-full bg-blue-gray-50"
              >
                <Typography className="text-sm capitalize font-normal text-black">
                  {label}
                </Typography>
              </Button>
            </Link>
          ))}
        </div>
        <Button
          size="sm"
          variant="outlined"
          className={cn(
            "rounded-full mt-2",
            user?.username !== username && "hidden"
          )}
        >
          <div className="flex items-center">
            <Plus size={"16"} />
            <Typography className="text-xs capitalize ml-1 font-normal">
              Create a Post
            </Typography>
          </div>
        </Button>
        <hr className="my-2 border-blue-gray-50" />
      </div>
      <Outlet />
    </ContentLayout>
  );
};

export default Profile;
