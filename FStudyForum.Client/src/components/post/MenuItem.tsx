import { Ban, Bookmark, Ellipsis, Flag } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { Topic } from "@/types/topic";
import TopicService from "@/services/TopicService";
import "react-toastify/dist/ReactToastify.css";
import BanUser from "./BanUser";
import { handleSavedPost } from "./SavePost";
import { useNavigate } from "react-router-dom";

type MenuItemPostProps = {
  post: Post;
};

const MenuItemPost: React.FC<MenuItemPostProps> = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [topic, setTopic] = useState<Topic>(() => ({} as Topic));
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTopic = async () => {
      const response = await TopicService.topicByPost(post.id);
      setTopic(response);
    };
    fetchTopic();
  }, [post.id]);

  useEffect(() => {
    const checkPostByUserExist = async () => {
      if (user?.username) {
        const isPostExists = await SavedPostService.isPostSaved(
          user.username,
          post.id
        );
        if (isPostExists.data) {
          setIsSaved(true);
        }
      }
    };
    checkPostByUserExist();
  }, [post.id, user?.username]);

  const PostMenuItem = [
    {
      icon: Bookmark,
      label: isSaved ? "Remove from saved" : "Save",
      path: "save",
    },
    {
      icon: Flag,
      label: "Report",
      path: "/report",
    },
    {
      icon: Ban,
      label: "Ban",
      path: "ban",
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
          {PostMenuItem.map(({ label, icon, path }, key) => {
            const isLastItem = key === PostMenuItem.length - 1;
            const isFirstItem = key === 0;
            return (
              <MenuItem
                key={label}
                onClick={
                  path === "save"
                    ? () => handleSavedPost(post, isSaved, setIsSaved, user?.username)
                    : path === "ban"
                    ? () => setIsModalOpen(true)
                    : () => navigate(path)
                }
                className={`flex items-center gap-2 rounded ${
                  isLastItem &&
                  "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                  style: { fill: isFirstItem && isSaved ? "black" : "" }
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
      {isModalOpen && (
        <BanUser
          post={post}
          topic={topic}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
export default MenuItemPost;
