import {
  Ban,
  Bookmark,
  Ellipsis,
  Flag,
  LockKeyhole,
} from "lucide-react";
import { Response } from "@/types/response";
import React, { useEffect } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  Radio
} from "@material-tailwind/react";
import { cn } from "@/helpers/utils";
import { Post } from "@/types/post";
import { useAuth } from "@/hooks/useAuth";
import SavedPostService from "@/services/SavedPostService";
import { AxiosError } from "axios";
import { Topic } from "@/types/topic";
import TopicService from "@/services/TopicService";
import BanUserService from "@/services/BanUserService";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast, showSuccessToast } from "../toast/Toast";
type MenuItemPostProps = {
  post: Post;
};
const MenuItemPost: React.FC<MenuItemPostProps> = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [topic, setTopic] = React.useState<Topic>(() => ({} as Topic));
  const [selectedTime, setSelectedTime] = React.useState("1 day");
  const { user } = useAuth();
  useEffect(() => {
    const checkPostByUserExist = async () => {
      const isPostExists = await SavedPostService.isPostSaved(
        `${user?.username}`,
        post.id
      );
      if (isPostExists.data) {
        setIsSaved(true);
      }
    };
    const fetchTopic = async () => {
      const response = await TopicService.topicByPost(post.id);
      setTopic(response);
    };
    fetchTopic();
    checkPostByUserExist();
  }, []);
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };
  const locked = () => {
    const topicBan = async () => {
      const [time, action] = selectedTime.split(" ");
      try {
       const response = await BanUserService.lockedUserByTopic({
          username: post.author,
          topicId: topic.id,
          action: action,
          bannerTime: Number(time)
        });
        showSuccessToast(response.message);
      } catch (e) {
        const error = e as AxiosError<Response>;
        showErrorToast((error?.response?.data as Response)?.message || error.message);
      }
    };
    topicBan();
  };
  const handleSavedPost = async (post: Post) => {
    try {
      let response;
      if (!isSaved) {
        response = await SavedPostService.savedPost({
          postId: post.id,
          username: `${user?.username}`
        });
        showSuccessToast(response.message);
      } else {
        response = await SavedPostService.deletePost(
          `${user?.username}`,
          post.id
        );
        showSuccessToast(response.message);
      }
      setIsSaved(prev => !prev);
    } catch (e) {
      const error = e as AxiosError<Response>;
      showErrorToast((error?.response?.data as Response)?.message || error.message);
    }
  };
  const LockedMenuItem = [
    {
      value: "1 hour",
      label: "1 hour"
    },
    {
      value: "1 day",
      label: "1 day"
    },
    {
      value: "1 month",
      label: "1 month"
    },
    {
      value: "1 year",
      label: "1 year"
    },
    {
      value: "1000 forever",
      label: "Forever"
    }
  ];
  const PostMenuItem = [
    {
      icon: isSaved ?  Bookmark : Bookmark,
      label: isSaved ? "Remove from saved" : "Save",
      path: "save"
    },
    {
      icon: Flag,
      label: "Report",
      path: "/report"
    },
    {
      icon: Ban,
      label: "Ban",
      path: "ban"
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
                    ? () => handleSavedPost(post)
                    : path === "ban"
                    ? () => setIsModalOpen(true)
                    : () => {}
                }
                className={`flex items-center gap-2 rounded ${
                  isLastItem &&
                  "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                  style: { fill: isFirstItem && isSaved ? 'black' : '' }
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
        <div
          data-dialog-backdrop="dialog"
          data-dialog-backdrop-close="true"
          className={cn(
            "fixed inset-0 z-[999] grid h-screen",
            "w-screen place-items-center",
            "bg-black bg-opacity-60 opacity-100 backdrop-blur-sm",
            "transition-opacity duration-300"
          )}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            data-dialog="dialog"
            className={cn(
              "relative m-4 w-2/5 min-w-[50%] max-w-[70%]",
              "rounded-lg bg-white font-sans text-base font-light",
              "leading-relaxed text-blue-gray-500",
              "antialiased shadow-2xl"
            )}
            onClick={e => e.stopPropagation()}
          >
            <div
              className={cn(
                "flex items-center p-4 font-sans text-2xl",
                "antialiased font-semibold leading-snug",
                "shrink-0 text-blue-gray-900"
              )}
            >
              Ban user
            </div>
            <div
              className={cn(
                "relative p-4 font-sans text-base antialiased",
                "font-light leading-relaxed border-t border-b",
                "border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500"
              )}
            >
              <div>
                <div className={cn("flex gap-[2%]")}>
                  <div className={cn("font-bold text-black")}>Username:</div>
                  <div className={cn("font-bold text-black")}>
                    {post.author}
                  </div>
                </div>
                <div className={cn("flex gap-[2%] mt-[2%]")}>
                  <div className={cn("font-bold text-black")}>Topic:</div>
                  <div className={cn("font-bold text-black")}>{topic.name}</div>
                </div>
                <div>
                  <div>
                    <div className="flex mt-[2%]">
                      <div className={cn("font-bold text-black")}>Locked:</div>
                      <div className={cn("mt-[-1.4%]")}>
                        {LockedMenuItem.map(({ value, label }, key) => (
                          <Radio
                            key={key}
                            name="type"
                            value={value}
                            label={label}
                            crossOrigin={undefined}
                            className="time font-bold text-black"
                            onChange={handleTimeChange}
                            checked={selectedTime === value}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={cn(
                "flex flex-wrap items-center",
                "justify-end p-4 shrink-0 text-blue-gray-500"
              )}
            >
              <button
                data-ripple-dark="true"
                data-dialog-close="true"
                className={cn(
                  "px-6 py-3 mr-1 font-sans text-xs font-bold",
                  "text-red-500 uppercase transition-all rounded-lg middle none",
                  "center hover:bg-red-500/10 active:bg-red-500/30",
                  "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                )}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                data-ripple-light="true"
                data-dialog-close="true"
                className={cn(
                  "middle none center rounded-lg bg-gradient-to-tr",
                  "from-orange-600 to-orange-400 py-3 px-6 font-sans",
                  "text-xs font-bold uppercase text-white shadow-md",
                  "shadow-orange-500/20 transition-all hover:shadow-lg",
                  "hover:shadow-orange-500/40 active:opacity-[0.85]",
                  "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                )}
                onClick={() => {
                  setIsModalOpen(false), locked();
                }}
              >
                <LockKeyhole />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default MenuItemPost;
