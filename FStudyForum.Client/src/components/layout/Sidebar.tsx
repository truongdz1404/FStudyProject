import { List, ListItem, ListItemPrefix, Card } from "@material-tailwind/react";
import { Home, Rocket, SquareGanttChart, Tags } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const sidebarListItems = [
  {
    group: "basic",
    items: [
      {
        label: "Home",
        icon: Home,
        path: "/home",
      },
      {
        label: "Popular",
        icon: Rocket,
        path: "/popular",
      },
      {
        label: "Topics",
        icon: Tags,
        path: "/topics",
      },
    ],
  },
  {
    group: "advanced",
    items: [
      {
        label: "Manager",
        icon: SquareGanttChart,
        path: "/dashboard",
      },
    ],
  },
];

type SidebarProps = {
  handleClose?: () => void;
};

const Sidebar = React.memo(({ handleClose }: SidebarProps) => {
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
      className="min-h-screen w-full rounded-none shadow-md shadow-blue-gray-900/5 border-r"
    >
      <List>
        {sidebarListItems.map(({ group, items }, index) => (
          <div key={group}>
            {items.map(({ label, icon, path }) => (
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
            {index != sidebarListItems.length - 1 && (
              <hr className="my-2 border-blue-gray-50" />
            )}
          </div>
        ))}
      </List>
    </Card>
  );
});

export default Sidebar;
