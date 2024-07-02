import { Ban, Bookmark, Ellipsis, Flag, LockKeyhole } from "lucide-react";
import { Response } from "@/types/response";
import React, { useEffect } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  Dialog,
  Radio
} from "@material-tailwind/react";
import { cn } from "@/helpers/utils";
import { Post } from "@/types/post";
import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import TopicService from "@/services/TopicService";
import PostService from "@/services/PostService";
import ReportForm from "../report/ReportForm";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
type MenuItemPostProps = {
  post: Post;
};
const MenuItemPost: React.FC<MenuItemPostProps> = ({ post }) => {
  const [openBan, setOpenBan] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState("1 day");
  const { user } = useAuth();

  const switchOpenReport = () => setOpenReport(!openReport);

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
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };
  const handleBan = () => {
    const topicBan = async () => {
      const [time, action] = selectedTime.split(" ");
      try {
        const response = await TopicService.banUser({
          username: post.author,
          topicName: post.topicName,
          action: action,
          time: Number(time)
        });
        showSuccessToast(response.message);
      } catch (e) {
        const error = e as AxiosError<Response>;
        showErrorToast(
          (error?.response?.data as Response)?.message || error.message
        );
      }
    };
    topicBan();
  };
  const handleSave = async (post: Post) => {
    try {
      let response;
      if (!isSaved) {
        response = await PostService.save(post.id);
        showSuccessToast(response.message);
      } else {
        response = await PostService.removeFromSave(post.id);
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

  const TimeBanMenu = [
    { value: "1 hour", label: "1 hour" },
    { value: "1 day", label: "1 day" },
    { value: "1 month", label: "1 month" },
    { value: "1 year", label: "1 year" },
    { value: "1000 forever", label: "Forever" }
  ];
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

      {openBan && (
        <div
          data-dialog-backdrop="dialog"
          data-dialog-backdrop-close="true"
          className={cn(
            "fixed inset-0 z-[999] grid h-screen",
            "w-screen place-items-center",
            "bg-black bg-opacity-60 opacity-100 backdrop-blur-sm",
            "transition-opacity duration-300"
          )}
          onClick={() => setOpenBan(false)}
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
                  <div className={cn("font-bold text-black")}>
                    {post.topicName}
                  </div>
                </div>
                <div>
                  <div>
                    <div className="flex mt-[2%]">
                      <div className={cn("font-bold text-black")}>Time:</div>
                      <div className={cn("mt-[-1.4%]")}>
                        {TimeBanMenu.map(({ value, label }, key) => (
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
                onClick={() => setOpenBan(false)}
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
                  setOpenBan(false), handleBan();
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
