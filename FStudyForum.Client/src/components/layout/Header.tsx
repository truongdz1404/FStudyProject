import React from "react";
import {
  Navbar,
  Collapse,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Typography
} from "@material-tailwind/react";
import Default from "@/assets/images/defaultTopic.png";

import {
  PowerIcon,
  Search,
  UserCircleIcon,
  AlignJustify,
  Plus,
  Bell,
  ChevronUp,
  X
} from "lucide-react";
import { cn } from "@/helpers/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icons } from "../Icons";
import { useAuth } from "@/hooks/useAuth";
import { useRouterParam } from "@/hooks/useRouterParam";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      path: `/profile/${user?.username.toLowerCase()}`
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      path: "/auth/signout",
      action: () => {
        sessionStorage.clear();
      }
    }
  ];
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="avatar"
            className=" bg-white"
            src={user?.avatar ?? "/src/assets/images/user.png"}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, path, action }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                if (action) action();
                handleNavigate(path);
              }}
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
  );
}

const getCreatePath = (pathname: string) => {
  const segments = pathname.split("/").filter(s => s !== "");
  switch (segments[0]) {
    case "topic":
      return `${segments[0]}/${segments[1]}/submit`;
    default:
      return "/submit";
  }
};

const navListItems = [
  {
    label: "Create",
    icon: Plus,
    showLabel: true,
    path: "/submit"
  },
  {
    label: "Notification",
    icon: Bell,
    showLabel: false,
    path: "/notification"
  }
];

function NavList() {
  const { pathname } = useLocation();

  return (
    <div className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, showLabel, path }) => (
        <Link
          key={label}
          to={path === "/submit" ? getCreatePath(pathname) : path}
          className="w-full"
        >
          <Button
            color="blue-gray"
            variant="text"
            className={cn(
              "flex p-2 items-center gap-2 lg:rounded-full w-full",
              "font-medium text-sm normal-case text-blue-gray-700"
            )}
          >
            {React.createElement(icon, { className: "h-5 w-5" })}
            <span className={cn(!showLabel && "lg:hidden")}>{label}</span>
          </Button>
        </Link>
      ))}
    </div>
  );
}
type HeaderProps = {
  openSidebar: () => void;
};

const Header = React.memo(({ openSidebar }: HeaderProps) => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen(cur => !cur);
  const { topic } = useRouterParam();
  const [isAll, setIsAll] = React.useState(false);
  React.useEffect(() => {
    setIsAll(false);
  }, [topic]);
  React.useEffect(() => {
    const checkResponsive = () =>
      window.innerWidth >= 960 && setIsNavOpen(false);
    window.addEventListener("resize", checkResponsive);
    return () => {
      window.removeEventListener("resize", checkResponsive);
    };
  }, []);

  return (
    <Navbar className="max-w-screen-3xl rounded-none p-1 shadow-sm z-50">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center w-1/4 lg:w-1/3">
          <IconButton
            size="sm"
            variant="text"
            className="xl:hidden"
            onClick={openSidebar}
          >
            <AlignJustify className="h-5 w-5 text-blue-gray-600" />
          </IconButton>

          <Link
            to="/"
            className="mx-2 xl:mx-4 cursor-pointer py-1.5 font-medium flex items-center select-none"
            onClick={() => {
              sessionStorage.clear();
            }}
          >
            <Icons.logo className="h-8 w-8" />
            <span className="hidden text-zinc-700 text-md font-bold md:block">
              Study
            </span>
          </Link>
        </div>
        <div
          className={cn(
            "w-1/2 md:w-2/5 max-w-screen-md bg-blue-gray-50 h-10 rounded-full text-sm",
            "flex gap-x-2"
          )}
        >
          <span className="my-auto ps-3">
            <Search className="h-[1.18rem] text-blue-gray-700" />
          </span>
          {!isAll && topic && (
            <span
              className={cn(
                "rounded-full bg-blue-gray-700/15 my-1 text-xs flex gap-x-2 items-center"
              )}
            >
              <div className="h-full aspect-square  rounded-full flex items-center justify-center">
                <Avatar src={topic.avatar || Default} className="w-5 h-5" />
              </div>

              <span className="truncate">t/{topic.name}</span>
              <div
                className="h-full aspect-square hover:bg-blue-gray-200/50 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => setIsAll(false)}
              >
                <div className=" bg-blue-gray-900/80 rounded-full p-1">
                  <X className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
              </div>
            </span>
          )}
          <span className="my-auto flex-1">
            <input
              type="text"
              name="serch"
              placeholder="Search"
              className="focus:outline-none bg-transparent w-full pr-4"
            />
          </span>
        </div>

        <div className="flex items-center justify-end w-1/4 lg:w-1/3">
          <div className="hidden lg:block mr-2">
            <NavList />
          </div>
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="mr-2 lg:hidden "
          >
            <ChevronUp
              className={`mx-auto w-5 h-5 transition-transform ${
                isNavOpen ? "rotate-180" : ""
              }`}
            />
          </IconButton>
          <ProfileMenu />
        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-hidden">
        <NavList />
      </Collapse>
    </Navbar>
  );
});

export default Header;
