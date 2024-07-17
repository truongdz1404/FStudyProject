import { Ellipsis, Trash2 } from "lucide-react";
import { Response } from "@/types/response";
import React from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography
} from "@material-tailwind/react";
import { cn } from "@/helpers/utils";
import { AxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FeedService from "@/services/FeedService";
import { Feed } from "@/types/feed";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  feed: Feed;
};

const MenuItemFeed: React.FC<Props> = ({ feed }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: handleDelete } = useMutation({
    mutationFn: FeedService.deleteFeed,
    onSuccess: message => {
      showSuccessToast(message);
      queryClient.invalidateQueries({ queryKey: ["FEED_LIST"] });
      navigate("/home");
    },
    onError: e => {
      const error = e as AxiosError<Response>;
      showErrorToast(
        (error?.response?.data as Response)?.message || error.message
      );
    }
  });

  const authorMenuItem = [
    {
      icon: Trash2,
      label: "Delete Feed",
      handle: () => handleDelete(feed.name)
    }
  ];

  if (user?.username != feed.author) return;
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
          {authorMenuItem?.map(({ label, icon, handle }) => {
            return (
              <MenuItem
                key={label}
                onClick={handle}
                className={`flex items-center gap-2 rounded`}
              >
                {React.createElement(icon, {
                  className: cn(`h-4 w-4 text-blue-gray-700`),
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
    </>
  );
};
export default MenuItemFeed;
