import { Ellipsis, Flag, Save, XCircle } from "lucide-react";
import React from "react";
import {  
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Typography,
} from "@material-tailwind/react";
import { cn } from "@/helpers/utils";
import { Post } from "@/types/post";
import { useAuth } from "@/hooks/useAuth";
import SavedPostService from "@/services/SavedPostService";
import { AxiosError } from "axios";
import { Response } from "@/types/response";
type MenuItemPostProps = {
  post: Post;
};

const MenuItemPost: React.FC<MenuItemPostProps> = ({ post }) => {
  const [error, setError] = React.useState("");
  const [isSaved, setIsSaved] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const  {user} = useAuth();
  const handleNavigate = async (post: Post) => {
    try {
      let response;
      if(!isSaved) {
        response = await SavedPostService.savedPost({postId: post.id, username: user?.username ?? ""});
        console.log(response);
      } else {
        response = await SavedPostService.deletePost(user?.username ?? "", post.id);
        console.log(response); 
      }
      setIsSaved((prev) => !prev);
    } catch (e) {
      const error = e as AxiosError<Response>;
      setError(
        (error?.response?.data as Response)?.message ||
        error.message
      );
    }
  };
  const PostItem = [
    {
      icon: isSaved ? XCircle : Save,
      label: isSaved ? "Remove" : "Save",
      path: "/save",
    },
    {
      icon: Flag,
      label: "Report",
      path: "/report",
    }
  ];

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          <Ellipsis />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {PostItem.map(({ label, icon, path }, key) => {
          const isLastItem = key === PostItem.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => handleNavigate(post)}
              className={`flex items-center gap-2 rounded ${
                isLastItem &&
                "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
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
  );
};

export default MenuItemPost;


