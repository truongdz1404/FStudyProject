import { ROLE } from "@/helpers/constants";
import { useAuth } from "@/hooks/useAuth";
import {
  List,
  ListItem,
  ListItemPrefix,
  Card,
  AccordionBody,
  AccordionHeader,
  Typography,
  Accordion
} from "@material-tailwind/react";
import {
  Album,
  AreaChart,
  BookUser,
  ChevronDown,
  Home,
  Rocket,
  SquareGanttChart,
  Tags
} from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const sidebarListItems = [
  {
    group: "user",
    access: [ROLE.User, ROLE.Admin],
    items: [
      {
        label: "Home",
        icon: Home,
        path: "/home",
        items: []
      },
      {
        label: "Popular",
        icon: Rocket,
        path: "/popular",
        items: []
      },
      {
        label: "Topics",
        icon: Tags,
        path: "/topics",
        items: []
      }
    ]
  },
  {
    group: "admin",
    access: [ROLE.Admin],
    items: [
      {
        label: "Manager",
        icon: SquareGanttChart,
        path: "",
        items: [
          {
            label: "Analytics",
            icon: AreaChart,
            path: "/manager/analytics"
          },
          {
            label: "Members",
            icon: BookUser,
            path: "/manager/members"
          },
          {
            label: "Topics",
            icon: Album,
            path: "/manager/topics"
          }
        ]
      }
    ]
  }
];

type SidebarProps = {
  handleClose?: () => void;
};

const Sidebar = React.memo(({ handleClose }: SidebarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();
  const segments = pathname.split("/").filter(s => s !== "");

  const [collapse, setCollapse] = React.useState(
    segments.length != 0 ? segments[0] : ""
  );

  const switchCollapse = (label: string) => {
    setCollapse(isCollapse(label) ? "" : label);
  };

  const isCollapse = (label: string) =>
    collapse.toLowerCase() === label.toLowerCase();

  const handleView = (path: string) => {
    handleClose?.();
    navigate(path);
  };
  return (
    <Card
      color="transparent"
      shadow={false}
      className="min-h-screen w-full rounded-none shadow-md shadow-blue-gray-900/5 border-r"
    >
      {sidebarListItems.map(
        ({ group, items, access }, index) =>
          (user?.roles.some(r => access.includes(r)) ?? false) && (
            <div key={group}>
              <List>
                {items.map(({ label, icon, path, items }) =>
                  items.length == 0 ? (
                    <ListItem
                      onClick={() => handleView(path)}
                      selected={pathname === path}
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
                      open={isCollapse(label)}
                      icon={
                        <ChevronDown
                          className={`mx-auto h-4 w-4 transition-transform ${
                            isCollapse(label) ? "rotate-180" : ""
                          }`}
                        />
                      }
                    >
                      <AccordionHeader
                        onClick={() => switchCollapse(label)}
                        className="border-b-0 p-3 hover:bg-gray-50 rounded-md"
                      >
                        <ListItemPrefix>
                          <SquareGanttChart className="h-5 w-5" />
                        </ListItemPrefix>
                        <Typography className="mr-auto text-sm font-medium">
                          {label}
                        </Typography>
                      </AccordionHeader>
                      <AccordionBody className="py-1">
                        <List className="p-0 pl-2 text-sm">
                          {items.map(({ label, icon, path }) => (
                            <ListItem
                              onClick={() => handleView(path)}
                              selected={pathname === path}
                              key={label}
                              className="text-sm"
                            >
                              <ListItemPrefix>
                                {React.createElement(icon, {
                                  className: "h-5 w-5"
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
              </List>
              {index != sidebarListItems.length - 1 && (
                <hr className=" border-blue-gray-50" />
              )}
            </div>
          )
      )}
    </Card>
  );
});

export default Sidebar;
