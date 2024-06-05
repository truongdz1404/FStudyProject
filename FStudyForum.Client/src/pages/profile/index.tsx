import ContentLayout from "@/components/layout/ContentLayout";
import ProfileDescription from "@/components/profile/ProfileDescription";
import { useAuth } from "@/hooks/useAuth";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Camera, ChevronDown, ChevronUp, PencilLine, Plus } from "lucide-react";
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
  const { user } = useAuth();
  const [data] = React.useState([]);
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  return (
    <ContentLayout pannel={<ProfileDescription />}>
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
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <div className="absolute bottom-0 right-0 bg-blue-gray-50 rounded-full">
              <Camera className="h-4 w-4 m-1" strokeWidth={1.5} />
            </div>
          </div>

          <div className="absolute bottom-0 right-0 bg-blue-gray-50 rounded-full m-2 font-normal">
            <Camera className="h-4 w-4 m-1 " strokeWidth={1.5} />
          </div>

          <div className="absolute left-32 pl-2 font-semibold text-md">
            No name
          </div>
          <div className="mt-2 absolute right-0">
            <Button
              size="sm"
              variant="outlined"
              className="rounded-full px-2 py-2"
            >
              <div className="flex items-center">
                <PencilLine size={"16"} />
                <Link className="mx-1" to="/profile/edit">
                  <Typography className="text-xs capitalize font-normal hidden xl:block">
                    Edit Profile
                  </Typography>
                  <Typography className="text-xs capitalize font-normal block  xl:hidden">
                    Edit
                  </Typography>
                </Link>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <Accordion open={open === 1} className="xl:hidden mb-2 ">
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="py-0 pb-2 text-md text-black font-semibold !justify-normal"
        >
          Introduction{" "}
          {open === 1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </AccordionHeader>
        <AccordionBody className="py-0 pt-2 ">
          <ProfileDescription />
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
