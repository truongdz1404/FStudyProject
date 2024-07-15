import { useRouterParam } from "@/hooks/useRouterParam";
import { Avatar, Input } from "@material-tailwind/react";
import DefaultUser from "@/assets/images/user.png";
import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { cn } from "@/helpers/utils";
import { Topic } from "@/types/topic";
import { debounce } from "lodash";
import TopicService from "@/services/TopicService";
const FeedDescription = () => {
  const { feed, user } = useRouterParam();
  const [keyword, setKeyword] = useState("");
  const [foundTopics, setFoundTopics] = useState<Topic[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debouncedSearch = useMemo(
    () =>
      debounce(async (searchTerm: string) => {
        if (!searchTerm) {
          setFoundTopics([]);
          return;
        }
        try {
          const founds = await TopicService.search(searchTerm);
          setFoundTopics(founds);
        } catch (e) {
          setFoundTopics([]);
        }
      }, 200),
    []
  );
  useEffect(() => {
    debouncedSearch(keyword.trim().replace(/^t\//, ""));
    return () => {
      debouncedSearch.cancel();
    };
  }, [keyword, debouncedSearch]);
  
  const closeOpenSearch = () => {
    setFoundTopics([]);
    setSelectedIndex(-1);
  };
  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedIndex(-1);
    setKeyword(event.target.value.trim());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex(prevIndex =>
          prevIndex > 0 ? prevIndex - 1 : foundTopics.length - 1
        );
        break;
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex(prevIndex =>
          prevIndex < foundTopics.length - 1 ? prevIndex + 1 : 0
        );
        break;
      case "Enter":
        if (selectedIndex !== -1) {
          console.log(foundTopics[selectedIndex].name);
        }
        break;
    }
  };

  if (!feed || !user) return;
  return (
    <>
      <div className="p-4">
        <p className="text-sm">{feed.name}</p>
        <span className="text-sm font-light">{feed.description}</span>
      </div>
      <div className="p-4 border-t-2">
        <p className="text-xs uppercase">Communities</p>
        <div className="mt-4 font-normal">
          <Input
            onChange={handleSearch}
            labelProps={{ className: "hidden" }}
            icon={<Search className="h-4 w-4" strokeWidth={2.2} />}
            placeholder="Select a topic"
            containerProps={{ className: "min-w-full" }}
            crossOrigin={undefined}
            className={cn(
              "placeholder:text-gray-500 placeholder:opacity-100 pl-6 ",
              "rounded-full !border-0 !bg-gray-200 text-gray-900"
            )}
            value={keyword}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="p-4 border-t-2">
        <p className="text-xs uppercase">Creator</p>
        <div className="flex items-center gap-x-2 mt-4">
          <Avatar src={user.avatar || DefaultUser} className="w-8 h-8" />
          <span className="truncate text-xs">{user.username}</span>
        </div>
      </div>
    </>
  );
};

export default FeedDescription;
