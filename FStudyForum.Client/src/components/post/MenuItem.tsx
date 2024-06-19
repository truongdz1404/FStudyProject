import { Ban, Bookmark, Ellipsis, Flag, LockKeyhole, XCircle } from "lucide-react";
import { Response } from "@/types/response";
import React, { useEffect } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography
} from "@material-tailwind/react";
import { cn } from "@/helpers/utils";
import { Post } from "@/types/post";
import { useAuth } from "@/hooks/useAuth";
import SavedPostService from "@/services/SavedPostService";
import { AxiosError } from "axios";
import { Topic } from "@/types/topic";
import TopicService from "@/services/TopicService";
type MenuItemPostProps = {
  post: Post;
};
const MenuItemPost: React.FC<MenuItemPostProps> = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isSaved, setIsSaved] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [topic, setTopic] = React.useState<Topic>(() => ({} as Topic));
  const [days, setDays] = React.useState('');
  const [months, setMonths] = React.useState('');
  const [years, setYears] = React.useState('');

  const dayOptions = Array.from({ length: 30 }, (_, i) => i + 1);
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const yearOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const { user } = useAuth();
  useEffect(() => {
    const checkPostByUserExist = async () => {
      const isPostExists = await SavedPostService.isPostSaved(
        user?.username ?? "",
        post.id
      );
      if (isPostExists.data) {
        setIsSaved(true);
      }
    };
    const fetchTopic = async () => {
      const response = await TopicService.topicByPost(post.id);
      setTopic(response.data);
    }
    fetchTopic();
    checkPostByUserExist();
  }, []);
  const handleNavigate = async (post: Post) => {
    try {
      let response;
      if (!isSaved) {
        response = await SavedPostService.savedPost({
          postId: post.id,
          username: user?.username ?? ""
        });
        console.log(response);
      } else {
        response = await SavedPostService.deletePost(
          user?.username ?? "",
          post.id
        );
        console.log(response);
      }
      setIsSaved(prev => !prev);
    } catch (e) {
      const error = e as AxiosError<Response>;
      setError((error?.response?.data as Response)?.message || error.message);
    }
  };
  const locked = async () => {

  }
  const PostMenuItem = [
    {
      icon: isSaved ? XCircle : Bookmark,
      label: isSaved ? "Remove" : "Save",
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
          return (
            <MenuItem
              key={label}
              onClick={path === "save" ? () => handleNavigate(post) : (path === "ban" ? () => setIsModalOpen(true) : () => {})}
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
    {isModalOpen && (
        <div
          data-dialog-backdrop="dialog"
          data-dialog-backdrop-close="true"
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            data-dialog="dialog"
            className="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
              Ban user
            </div>
            <div className="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
             <div className="flex gap-[5%]">           
             <div>
             {post.author} 
              </div> 
             <div>
              {topic.name}
             </div>
             <div>
             <div>
            <label>Days: </label>
            <select value={days} onChange={(e) => setDays(e.target.value)}>
              <option value="">Select Days</option>
              {dayOptions.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Months: </label>
            <select value={months} onChange={(e) => setMonths(e.target.value)}>
              <option value="">Select Months</option>
              {monthOptions.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Years: </label>
            <select value={years} onChange={(e) => setYears(e.target.value)}>
              <option value="">Select Years</option>
              {yearOptions.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
             </div>
             </div>
            </div>
            <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
              <button
                data-ripple-dark="true"
                data-dialog-close="true"
                className="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                data-ripple-light="true"
                data-dialog-close="true"
                className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => setIsModalOpen(false)}
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
