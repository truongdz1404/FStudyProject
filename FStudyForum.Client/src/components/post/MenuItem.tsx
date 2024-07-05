import { Ban, Bookmark, Ellipsis, Flag } from "lucide-react";
import { Response } from "@/types/response";
import React, { useEffect } from "react";
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
import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import PostService from "@/services/PostService";
import ReportForm from "../report/ReportForm";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import BanForm from "./BanForm";
type MenuItemPostProps = {
  post: Post;
};

const MenuItemPost: React.FC<MenuItemPostProps> = ({ post }) => {
  const [openBan, setOpenBan] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useAuth();

  const switchOpenReport = () => setOpenReport(!openReport);
  const switchOpenBan = () => setOpenBan(!openBan);

  useEffect(() => {
    const checkSavedByUser = async () => {
      const isPostExists = await PostService.isSaved(
        `${user?.username}`,
        post.id
      );
      if (isPostExists.data) {
        setIsSaved(true);
      }
    };
    checkSavedByUser();
  }, [post.id, user?.username]);

  const handleSave = async (post: Post) => {
    try {
      let response;
      if (!isSaved) {
        response = await PostService.save(post.id);
        showSuccessToast(response.message);
      } else {
        response = await PostService.removeFromSaved(post.id);
        showSuccessToast(response.message);
      }
      setIsSaved(prev => !prev);
    } catch (e) {
      const error = e as AxiosError<Response>;
      showErrorToast(
        (error?.response?.data as Response)?.message || error.message
      );
    }
  };

  const PostMenuItem = [
    {
      icon: Bookmark,
      label: isSaved ? "Remove from saved" : "Save",
      handle: () => handleSave(post)
    },
    {
      icon: Flag,
      label: "Report",
      handle: () => {
        switchOpenReport();
      }
    },
    {
      icon: Ban,
      label: "Ban user from topic",
      handle: () => setOpenBan(true)
    }
  ];

  return (
    <>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center rounded-full p-2 text-black"
          >
            <Ellipsis className="w-4 h-4" />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {PostMenuItem.map(({ label, icon, handle }, key) => {
            const isLastItem = key === PostMenuItem.length - 1;
            const isSaveItem = label == "Remove from saved" || label == "Save";
            return (
              <MenuItem
                key={label}
                onClick={handle}
                className={`flex items-center gap-2 rounded  ${
                  isLastItem &&
                  "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                }`}
              >
                {React.createElement(icon, {
                  className: cn(
                    `h-4 w-4 ${
                      isLastItem ? "text-red-500" : "text-blue-gray-700"
                    }`,
                    isSaveItem && isSaved && "fill-blue-gray-700"
                  ),
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
        open={openReport}
        handler={switchOpenReport}
      >
        <ReportForm
          postId={post.id}
          topicName={post.topicName}
          handler={switchOpenReport}
        />
      </Dialog>
      <Dialog
        className="max-w-[34rem] mb-6 p-5 max-h-full"
        open={openBan}
        handler={switchOpenBan}
      >
        <BanForm post={post} handler={switchOpenBan} />
      </Dialog>
    </>
  );
};
export default MenuItemPost;
