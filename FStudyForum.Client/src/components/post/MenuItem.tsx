import { Ellipsis, Flag, Save } from "lucide-react"
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
const MenuItemPost = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };
    const PostItem = [
        {
            icon:  Save,
            label: "Save",
            path: "/save",
           },
        {
         icon: Flag,
         label: "Report",
         path: "/report",
        }
       ];
    return(
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
}
export default MenuItemPost;