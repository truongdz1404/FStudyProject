import { Bookmark, Ellipsis, Flag, Trash2 } from "lucide-react";
import { Response } from "@/types/response";
import React from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
type Props = {
  post: Post;
  onSave?: () => void;
  onRemoveSaved?: () => void;
  onMoveTrash?: () => void;
};

const MenuItemPost: React.FC<Props> = ({
  post,
  onSave,
  onRemoveSaved,
  onMoveTrash
}) => {
  const [openBan, setOpenBan] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const switchOpenReport = React.useCallback(
    () => setOpenReport(!openReport),
    [openReport]
  );
  const switchOpenBan = () => setOpenBan(!openBan);

  React.useEffect(() => {
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

  const handleSave = React.useCallback(
    async (post: Post) => {
      try {
        let response;
        if (!isSaved) {
          response = await PostService.save(post.id);
          onSave && onSave();
          showSuccessToast(response.message);
        } else {
          response = await PostService.removeFromSaved(post.id);
          onRemoveSaved && onRemoveSaved();
          showSuccessToast(response.message);
        }
        setIsSaved(prev => !prev);
      } catch (e) {
        const error = e as AxiosError<Response>;
        showErrorToast(
          (error?.response?.data as Response)?.message || error.message
        );
      }
    },
    [isSaved, onRemoveSaved, onSave]
  );

  const { mutate: handleMoveToTrash } = useMutation({
    mutationFn: PostService.moveToTrash,
    onSuccess: message => {
      showSuccessToast(message);
      onMoveTrash && onMoveTrash();
      queryClient.invalidateQueries({ queryKey: ["POST_LIST"] });
    },
    onError: e => {
      const error = e as AxiosError<Response>;
      showErrorToast(
        (error?.response?.data as Response)?.message || error.message
      );
    }
  });

  const defaultMenuItem = React.useMemo(
    () => [
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
      }
    ],
    [handleSave, isSaved, post, switchOpenReport]
  );

  // const advanceMenuItem = React.useMemo(
  //   () => [
  //     {
  //       icon: Bookmark,
  //       label: isSaved ? "Remove from saved" : "Save",
  //       handle: () => handleSave(post)
  //     },
  //     {
  //       icon: Flag,
  //       label: "Report",
  //       handle: () => {
  //         switchOpenReport();
  //       }
  //     },
  //     {
  //       icon: Ban,
  //       label: "Ban user from topic",
  //       handle: () => setOpenBan(true)
  //     }
  //   ],
  //   [handleSave, isSaved, post, switchOpenReport]
  // );

  const authorMenuItem = React.useMemo(
    () => [
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
        icon: Trash2,
        label: "Move to trash",
        handle: () => handleMoveToTrash(post.id)
      }
    ],
    [handleMoveToTrash, handleSave, isSaved, post, switchOpenReport]
  );

  const getMenuItem = () => {
    return user?.username === post.author ? authorMenuItem : defaultMenuItem;
  };

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
          {getMenuItem().map(({ label, icon, handle }) => {
            const isSaveItem = label == "Remove from saved" || label == "Save";
            return (
              <MenuItem
                key={label}
                onClick={handle}
                className={`flex items-center gap-2 rounded`}
              >
                {React.createElement(icon, {
                  className: cn(
                    `h-4 w-4 text-blue-gray-700`,
                    isSaveItem && isSaved && "fill-blue-gray-700"
                  ),
                  strokeWidth: 2
                })}
                <Typography as={"span"} className={cn("font-normal text-sm")}>
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
