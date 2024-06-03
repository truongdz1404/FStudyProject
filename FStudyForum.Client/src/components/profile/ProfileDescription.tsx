import { Button, Typography } from "@material-tailwind/react";
import { Plus } from "lucide-react";

const ProfileDescription = () => {
  return (
    <>
      <Typography className="text-sm font-semibold ">About me</Typography>
      <Typography className="text-xs">
        Một ngày nọ, khi bạn thức giấc, sẽ chợt nhận ra bạn không được tạo ra
        cho bất cứ ai đánh giá. Bạn được tạo ra cho chính bạn. Bạn là của riêng
        bạn, được ngắm, được yêu thương và được nhìn nhận.
      </Typography>
      <Typography className="text-sm font-semibold mt-2">
        Achievements
      </Typography>
      <div className="flex justify-around">
        <div className="flex flex-col items-center">
          <Typography className="font-semibold">1</Typography>
          <Typography className="text-xs">Posts</Typography>
        </div>
        <div className="flex flex-col items-center">
          <Typography className="font-semibold">1</Typography>
          <Typography className="text-xs">Comments</Typography>
        </div>
      </div>
      <Typography className="text-sm font-semibold">Links</Typography>
      <Button size="sm" variant="outlined" className="rounded-full mt-2">
        <div className="flex items-center">
          <Plus size={"16"} />
          <Typography className="text-xs capitalize ml-1">
            Add social link
          </Typography>
        </div>
      </Button>
    </>
  );
};

export default ProfileDescription;
