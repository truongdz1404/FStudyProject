import { useRouterParam } from "@/hooks/useRouterParam";
import { CircleX, Clock, Search, X } from "lucide-react";
import React, { FC } from "react";
import Default from "@/assets/images/topic.png";
import { Avatar } from "@material-tailwind/react";
import { cn } from "@/helpers/utils";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useNavigate } from "react-router-dom";

const SearchInput: FC = () => {
  const [keyword, setKeyword] = React.useState("");
  const { topic } = useRouterParam();
  const [isAll, setIsAll] = React.useState(false);
  const [openBox, setOpenBox] = React.useState(false);
  const [history, setHistory] = React.useState<string[]>([]);
  const inputRef = useOutsideClick(() => setOpenBox(false));
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsAll(false);
  }, [topic]);

  React.useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );
    setHistory(savedHistory);
  }, []);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keyword.trim()) {
      handleSearch(keyword.trim());
    }
  };

  const handleSearch = (value: string) => {
    setKeyword(value);
    addHistory(value);
    navigate(`/search/posts?keyword=${value}`);
    setOpenBox(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setKeyword(keyword);
  };

  const addHistory = (value: string) => {
    const max_history_size = 6;
    const newHistory = [value, ...history.filter(term => term !== value)].slice(
      0,
      max_history_size
    );
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };
  const removeHistory = (value: string) => {
    const updatedHistory = history.filter(item => item !== value);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  return (
    <div className="relative" ref={inputRef}>
      <div
        className={cn(
          "flex gap-x-2 bg-blue-gray-50 h-10 rounded-[1.25rem] z-20 items-center",
          openBox && "hover:bg-blue-gray-50 bg-transparent"
        )}
      >
        <span className="ps-3">
          <Search className="h-[1.18rem] text-blue-gray-700" />
        </span>
        {!isAll && topic && (
          <span
            className={cn(
              "rounded-full bg-blue-gray-700/15 p-1.5 text-xs flex gap-x-2 items-center"
            )}
          >
            <div className="h-full aspect-square  rounded-full flex items-center justify-center">
              <Avatar src={topic.avatar || Default} className="w-5 h-5" />
            </div>

            <span className="truncate">t/{topic.name}</span>
            <div
              className="h-full aspect-square hover:bg-blue-gray-200/50 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => setIsAll(true)}
            >
              <div className=" bg-blue-gray-900/80 rounded-full p-1">
                <X className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            </div>
          </span>
        )}
        <div className="flex-1 pr-4 text-sm">
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="focus:outline-none bg-transparent w-full placeholder:font-light"
            value={keyword}
            onChange={handleChange}
            onKeyDown={handleSubmit}
            onFocus={() => setOpenBox(true)}
            autoComplete="off"
          />
        </div>
      </div>
      {openBox && (
        <div className="absolute top-0 w-full -z-10 rounded-[1.25rem] overflow-hidden bg-white shadow-md">
          <div className="min-h-10 mt-12 text-blue-gray-700 text-sm">
            {history.map((value, index) => (
              <div
                key={index}
                className="flex items-center justify-between hover:bg-blue-gray-50/40 py-1 px-4 z-0"
                onClick={() => handleSearch(value)}
              >
                <div className="flex items-center gap-x-2 overflow-hidden">
                  <div>
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="truncate">{value}</span>
                </div>

                <button
                  type="button"
                  onClick={() => removeHistory(value)}
                  className="rounded-full hover:bg-blue-gray-100/50 p-2 z-10"
                >
                  <CircleX className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
