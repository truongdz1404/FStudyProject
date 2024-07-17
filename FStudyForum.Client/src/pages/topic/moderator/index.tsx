import ContentLayout from "@/components/layout/ContentLayout";
import DefaultTopic from "@/assets/images/topic.png";
import { useRouterParam } from "@/hooks/useRouterParam";
import { Spinner } from "@material-tailwind/react";
import { Link, Outlet } from "react-router-dom";
import { cn } from "@/helpers/utils";
const tabItems = [
  {
    label: "Needs Review",
    path: "needs-review"
  },
  {
    label: "User manager",
    path: "user-manager"
  },
  {
    label: "Settings",
    path: "settings"
  }
];
const ModeratorPage = () => {
  const { topic } = useRouterParam();
  const getTab = () => {
    const segments = location.pathname
      .split("/")
      .filter(segment => segment !== "");
    return segments.length >= 3 ? segments[segments.length - 1] : "";
  };
  if (!topic) return <Spinner className="mx-auto" />;
  return (
    <ContentLayout>
      <div className="flex items-end text-blue-gray-800 relative">
        <img src={DefaultTopic} className="w-16 h-16" />
        <div className="p-1">
          <h1>{topic.name}</h1>
          <span className="text-xs font-light">Moderator tool</span>
        </div>
        <div className="absolute right-0 bottom-0"></div>
      </div>
      <div className="flex pb-2 mt-2 border-b ">
        {tabItems.map(({ label, path }) => (
          <Link to={path} key={label}>
            <div
              className={cn(
                "rounded-full py-2 px-4",
                getTab() === path && "bg-blue-gray-50"
              )}
            >
              <span className="text-sm capitalize font-normal text-black">
                {label}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="p-2">
        <Outlet />
      </div>
    </ContentLayout>
  );
};

export default ModeratorPage;
