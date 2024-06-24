import { Bookmark, Ellipsis, Flag } from "lucide-react";
import React from "react";
import ReportForm from "@/pages/report/form";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  Dialog
} from "@material-tailwind/react";
import { cn } from "@/helpers/utils";
import { Post } from "@/types/post";
import { usePosts } from "@/hooks/usePosts";
interface MenuItemProps {
  postData: Post;
}
const MenuItemPost: React.FC<MenuItemProps> = ({ postData }) => {
  const { setPostData } = usePosts();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const handleOpen = () => setShowModal(!showModal);
  const PostMenuItem = [
    {
      icon: Bookmark,
      label: "Save",
      path: "/save"
    },
    {
      icon: Flag,
      label: "Report",
      path: "/report",
      action: () => {
        setPostData(postData);
        handleOpen();
      }
    }
  ];
  return (
  <>
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0 px-1 text-black"
        >
          <Ellipsis className="w-4 h-4 " />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {PostMenuItem.map(({ label, icon, action }, key) => {
          const isLastItem = key === PostMenuItem.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                if (action) action();
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem &&
                "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2
              })}
              <Typography
                as={"span"}
                className={cn(
                  "font-normal text-sm",
                  isLastItem ? "text-red-500" : "inherit"
                )}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
    <Dialog
    className="max-w-[34rem] mb-6 p-5 max-h-full"
    open={showModal}
    handler={handleOpen}
    >
      <ReportForm />
    </Dialog>
  </>
  );
};
export default MenuItemPost;
