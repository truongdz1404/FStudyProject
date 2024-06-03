import ContentLayout from "@/components/layout/ContentLayout";
import ProfileDescription from "@/components/profile/ProfileDescription";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import React from "react";
const tabItems = [
  {
    label: "Overview",
  },
  {
    label: "Posts",
  },
];
const Profile = () => {
  const { user } = useAuth();
  const [data] = React.useState([]);
  return (
    <ContentLayout pannel={<ProfileDescription />}>
      <div className="flex flex-col items-center w-full mb-24">
        <div className="relative w-full max-w-screen-lg">
          <img
            src="https://i.ibb.co/FWggPq1/banner.png"
            className="w-full object-center h-36 rounded-sm"
          />
          <Avatar
            variant="circular"
            size="xxl"
            alt="tania andrew"
            className="absolute -bottom-1/2 left-4"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <div className="absolute left-36 font-semibold text-md">
            {user?.userName}
          </div>
        </div>
      </div>
      <div className="xl:hidden">
        <ProfileDescription />
        <hr className="my-2 border-blue-gray-50" />
      </div>
      <div className="flex w-max gap-4">
        {tabItems.map(({ label }) => (
          <Button
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
        {data && (
          <Typography className="text-sm capitalize font-semibold">
            {user?.userName} hasn't posts yet
          </Typography>
        )}
      </div>
    </ContentLayout>
  );
};

export default Profile;
