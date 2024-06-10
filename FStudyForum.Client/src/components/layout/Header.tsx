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
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  PowerIcon,
  Search,
  UserCircleIcon,
  AlignJustify,
  Plus,
  Bell,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/helpers/utils";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../Icons";
import { useAuth } from "@/hooks/useAuth";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    path: "/profile",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    path: "/auth/signout",
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
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
            className="border border-gray-500 p-0.5 bg-white"
            src={user?.avatar ?? "/src/assets/images/user.png"}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, path }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => handleNavigate(path)}
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

const navListItems = [
  {
    label: "Create",
    icon: Plus,
    showLabel: true,
    path: "/create",
  },
  {
    label: "Notification",
    icon: Bell,
    showLabel: false,
    path: "/notification",
  },
];

function NavList() {
  return (
    <div className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, showLabel, path }) => (
        <Link key={label} to={path}>
          <Button
            variant="text"
            className={cn(
              "flex p-2 items-center gap-2 lg:rounded-full",
              "font-medium   text-sm normal-case"
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
export function Header({ openSidebar }: HeaderProps) {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="max-w-screen-3xl rounded-none p-1 shadow-sm">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center w-1/4 lg:w-1/3">
          <IconButton
            size="sm"
            variant="text"
            className="xl:hidden"
            onClick={openSidebar}
          >
            <AlignJustify className="h-5 w-5" />
          </IconButton>

          <Link
            to="/"
            className="mx-2 xl:mx-4 cursor-pointer py-1.5 font-medium flex items-center select-none"
          >
            <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
            <span className="hidden text-zinc-700 text-md font-bold md:block">
              Study
            </span>
          </Link>
        </div>
        <div className="w-1/2 lg:w-1/3 max-w-screen-md">
          <Input
            icon={<Search className="h-5 w-5" />}
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-full" }}
            crossOrigin={undefined}
            className={cn(
              "placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900",
              "rounded-full !border-2 !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent"
            )}
          />
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
            className="mr-2 lg:hidden"
          >
            {isNavOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </IconButton>
          <ProfileMenu />
        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-hidden">
        <NavList />
      </Collapse>
    </Navbar>
  );
}
