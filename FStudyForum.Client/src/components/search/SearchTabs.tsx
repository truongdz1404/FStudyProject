import { cn } from "@/helpers/utils";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchTabs = () => {
  const query = useQuery();
  const pathSegments = location.pathname.split("/");
  const type = pathSegments[pathSegments.length - 1];
  const keyword = query.get("keyword");
  const navigate = useNavigate();

  const handleClick = (type: string) => {
    navigate(`/search/${type}?keyword=${keyword}`);
  };
  const SearchMenu = [
    {
      type: "posts",
      title: "Posts"
    },
    {
      type: "topics",
      title: "Topics"
    },
    {
      type: "comments",
      title: "Comments"
    },
    {
      type: "people",
      title: "People"
    }
  ];

  return (
    <>
      {SearchMenu.map(search => (
        <button
          key={search.type}
          onClick={() => {
            if (type != search.type) return handleClick(search.type);
          }}
          className={cn(
            "mb-2 relative flex gap-x-1 justify-center items-center py-2 px-4  text-sm text-black-800 rounded-full",
            type == search.type && "bg-blue-gray-50"
          )}
        >
          {search.title}
        </button>
      ))}
    </>
  );
};

export default SearchTabs;
