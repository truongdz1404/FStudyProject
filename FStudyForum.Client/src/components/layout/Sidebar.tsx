import {
  List,
  ListItem,
  ListItemPrefix,
  Card,
  AccordionBody,
  AccordionHeader,
  Typography,
  Accordion,
} from "@material-tailwind/react";
import {
  AreaChart,
  BookUser,
  ChevronDown,
  Home,
  Rocket,
  SquareGanttChart,
  Tags,
} from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const sidebarListItems = [
  {
    group: "user",
    items: [
      {
        label: "Home",
        icon: Home,
        path: "/home",
        items: [],
      },
      {
        label: "Popular",
        icon: Rocket,
        path: "/popular",
        items: [],
      },
      {
        label: "Topics",
        icon: Tags,
        path: "/topics",
        items: [],
      },
    ],
  },
  {
    group: "admin",
    items: [
      {
        label: "Manager",
        icon: SquareGanttChart,
        path: "",
        items: [
          {
            label: "Analytics",
            icon: AreaChart,
            path: "/manager/analytics",
          },
          {
            label: "Members",
            icon: BookUser,
            path: "/manager/members",
          },
        ],
      },
    ],
  },
];

type SidebarProps = {
  handleClose?: () => void;
};

const Sidebar = React.memo(({ handleClose }: SidebarProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState("");
  const handleOpen = (value: string) => {
    setOpen(open === value ? "" : value);
  };

  const handleView = (path: string) => {
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
            {items.map(({ label, icon, path, items }) =>
              items.length == 0 ? (
                <ListItem
                  onClick={() => handleView(path)}
                  selected={location.pathname === path}
                  key={label}
                  className="text-sm"
                >
                  <ListItemPrefix>
                    {React.createElement(icon, { className: "h-5 w-5" })}
                  </ListItemPrefix>
                  {label}
                </ListItem>
              ) : (
                <Accordion
                  key={label}
                  open={open === label}
                  icon={
                    <ChevronDown
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === label ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <AccordionHeader
                    onClick={() => handleOpen(label)}
                    className="border-b-0 p-3 hover:bg-gray-50 rounded-md"
                  >
                    <ListItemPrefix>
                      <SquareGanttChart className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography className="mr-auto text-sm">{label}</Typography>
                  </AccordionHeader>
                  <AccordionBody className="py-1">
                    <List className="p-0 pl-2 text-sm">
                      {items.map(({ label, icon, path }) => (
                        <ListItem
                          onClick={() => handleView(path)}
                          selected={location.pathname === path}
                          key={label}
                          className="text-sm"
                        >
                          <ListItemPrefix>
                            {React.createElement(icon, {
                              className: "h-5 w-5",
                            })}
                          </ListItemPrefix>
                          {label}
                        </ListItem>
                      ))}
                    </List>
                  </AccordionBody>
                </Accordion>
              )
            )}
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
