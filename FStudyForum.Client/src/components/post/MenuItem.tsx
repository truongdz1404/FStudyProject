import { Ellipsis, Flag, Save } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
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
type MenuItemPostProps = {
  post: Post;
};

const MenuItemPost: React.FC<MenuItemPostProps> = ({ post }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const  {user} = useAuth();
  const navigate = useNavigate();
  const handleNavigate = async (post: Post) => {
    // const reponse = await SavedPostService.savedPost({username: username, postId: post.id});
    console.log(user)
  };
  const PostItem = [
    {
      icon: Save,
      label: "Save",
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
