import { Roles } from "@/helpers/constants";
import { cn } from "@/helpers/utils";
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
  Layers3,
  AreaChart,
  BookUser,
  ChevronDown,
  Home,
  Rocket,
  SquareGanttChart,
  Flag,
  HandCoins,
  Tags
} from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const sidebarListItems = [
  {
    group: "user",
    access: [Roles.USER, Roles.ADMIN],
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
      },
      {
        label: "Donate",
        icon: HandCoins,
        path: "/donate",
        items: []
      }
    ]
  },
  {
    group: "admin",
    access: [Roles.ADMIN],
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
          },
          {
            label: "Categories",
            icon: Layers3,
            path: "/manager/categories"
          },
          {
            label: "Report",
            icon: Flag,
            path: "/manager/report"
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

  const [collapse, setCollapse] = React.useState<string[]>([]);

  const toggleLabel = (label: string) => {
    setCollapse(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isCollapse = (label: string) => collapse.includes(label);

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
                  items?.length == 0 ? (
                    <ListItem
                      onClick={() => handleView(path)}
                      selected={pathname === path}
                      key={label}
                      className={cn("text-sm")}
                    >
                      <ListItemPrefix>
                        {React.createElement(icon, {
                          className: cn("h-5 w-5 text-blue-gray-700")
                        })}
                      </ListItemPrefix>
                      {label}
                    </ListItem>
                  ) : (
                    <Accordion
                      key={label}
                      open={!isCollapse(label)}
                      icon={
                        <ChevronDown
                          className={`mx-auto h-4 w-4 transition-transform ${
                            !isCollapse(label) ? "rotate-180" : ""
                          }`}
                        />
                      }
                    >
                      <AccordionHeader
                        onClick={() => toggleLabel(label)}
                        className="border-b-0 p-3 hover:bg-blue-gray-50 rounded-md"
                      >
                        <Typography className="mr-auto text-xs uppercase tracking-widest">
                          {label}
                        </Typography>
                      </AccordionHeader>
                      <AccordionBody className="py-1">
                        {items && items.length > 0 ? (
                          <List className="p-0 text-sm">
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
                        ) : (
                          ""
                        )}
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
