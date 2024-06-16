import { Bookmark, Ellipsis, Flag, XCircle } from "lucide-react"
import { Response } from "@/types/response";
import React from "react"
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography
} from "@material-tailwind/react"
import { cn } from "@/helpers/utils"
import { Post } from "@/types/post";
import { useAuth } from "@/hooks/useAuth";
import SavedPostService from "@/services/SavedPostService";
import { AxiosError } from "axios";
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
  const PostMenuItem = [
    {
      icon: isSaved ? XCircle : Bookmark,
      label:  isSaved ? "Remove" : "Save",
      path: "/save"

    },
    {
      icon: Flag,
      label: "Report",

      path: "/report"
    }
  ]
  return (
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
        {PostMenuItem.map(({ label, icon }, key) => {
          const isLastItem = key === PostMenuItem.length - 1
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
          )
        })}
      </MenuList>
    </Menu>

  )
}
export default MenuItemPost

