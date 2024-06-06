import { List, ListItem, ListItemPrefix, Card } from "@material-tailwind/react";
import { Home, Rocket, Tags } from "lucide-react";
import React, { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const sidebarListItems = [
  {
    label: "Home",
    icon: Home,
    path: "/home",
  },
  {
    label: "Posts",
    icon: Rocket,
    path: "/posts",
  },
  {
    label: "Topics",
    icon: Tags,
    path: "/topics",
  },
];

type SidebarProps = {
  handleClose?: () => void;
};

const Sidebar: FC<SidebarProps> = ({ handleClose }) => {
  const navigate = useNavigate();
  const handleOpen = (path: string) => {
    handleClose?.();
    navigate(path);
  };
  const location = useLocation();
  return (
    <Card
      color="transparent"
      shadow={false}
      className="min-h-screen w-full rounded-none shadow-xl shadow-blue-gray-900/5"
    >
      <List>
        {sidebarListItems.map(({ label, icon, path }) => (
          <ListItem
            onClick={() => handleOpen(path)}
            selected={location.pathname === path}
            key={label}
            className="text-sm"
          >
            <ListItemPrefix>
              {React.createElement(icon, { className: "h-5 w-5" })}
            </ListItemPrefix>
            {label}
          </ListItem>
        ))}
        <hr className="my-2 border-blue-gray-50" />
      </List>
    </Card>
  );
};

export default Sidebar;
