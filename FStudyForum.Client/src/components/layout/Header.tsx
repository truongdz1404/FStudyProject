import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    IconButton,
    Input,
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
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
        path: "/profile",

    },
    {
        label: "Sign Out",
        icon: PowerIcon,
        path: "/auth/signin"
    },
];

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);
    const navigate = useNavigate();
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
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon, path }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={() => {
                                closeMenu();
                                navigate(path);
                            }}
                            className={`flex items-center gap-2 rounded ${
                                isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                            }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${
                                    isLastItem ? "text-red-500" : ""
                                }`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
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
        show: true,
    },
    {
        label: "Notification",
        icon: Bell,
        show: false,
    },
];

function NavList({ isCollapse }: { isCollapse: boolean }) {
    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            {navListItems.map(({ label, icon, show }) => (
                <Typography
                    key={label}
                    as="a"
                    href="#"
                    variant="small"
                    color="gray"
                    className="font-medium text-blue-gray-500"
                >
                    <MenuItem className="flex items-center gap-2 lg:rounded-full">
                        {React.createElement(icon, {
                            className: "h-[18px] w-[18px]",
                        })}{" "}
                        {(isCollapse || show) && (
                            <span className="text-gray-900"> {label}</span>
                        )}
                    </MenuItem>
                </Typography>
            ))}
        </ul>
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
        <Navbar className=" sticky top-0 mx-auto max-w-screen-3xl rounded-none p-1 lg:pl-6 shadow-sm">
            <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    className="lg:hidden"
                    onClick={openSidebar}
                >
                    <AlignJustify className="h-6 w-6" />
                </IconButton>
                <Link
                    to="/"
                    className="mr-4 ml-2 cursor-pointer py-1.5 font-medium flex gap-2 items-center"
                >
                    <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
                    <p className="hidden text-zinc-700 text-md font-semibold md:block">
                        FStudy
                    </p>
                </Link>
                <div className="w-1/2 lg:w-1/3 ml-auto">
                    <Input
                        icon={<Search className="h-5 w-5" />}
                        labelProps={{
                            className: "hidden",
                        }}
                        crossOrigin={undefined}
                        className={cn(
                            "placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900",
                            "rounded-full !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent "
                        )}
                    />
                </div>
                <div className="hidden lg:block ml-auto mr-2">
                    <NavList isCollapse={isNavOpen} />
                </div>
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden"
                >
                    {isNavOpen ? (
                        <ChevronUp className="h-6 w-6" />
                    ) : (
                        <ChevronDown className="h-6 w-6" />
                    )}
                </IconButton>
                <ProfileMenu />
            </div>
            <Collapse open={isNavOpen} className="overflow-hidden">
                <NavList isCollapse={isNavOpen} />
            </Collapse>
        </Navbar>
    );
}
