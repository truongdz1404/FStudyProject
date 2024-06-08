import { Avatar } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

const MyAvatar = () => {
  const location = useLocation();

  return (
    <>
      <Avatar
        key={location.key}
        variant="circular"
        size="sm"
        alt="tania andrew"
        className="border border-gray-900 p-0.5"
        src={""}
      />
    </>
  );
};

export default MyAvatar;
