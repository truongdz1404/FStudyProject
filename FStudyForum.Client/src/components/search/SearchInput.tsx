import { useRouterParam } from "@/hooks/useRouterParam";
import { CircleX, Clock, Search, X } from "lucide-react";
import React, { FC } from "react";
import Default from "@/assets/images/topic.png";
import { Avatar } from "@material-tailwind/react";
import { cn } from "@/helpers/utils";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useNavigate } from "react-router-dom";
import DefaultTopic from "@/assets/images/topic.png";
import { Topic } from "@/types/topic";
import TopicService from "@/services/TopicService";
import { debounce } from "lodash";
import useQueryParams from "@/hooks/useQueryParams";

const SearchInput: FC = () => {
  const [keyword, setKeyword] = React.useState("");
  const { topic } = useRouterParam();
  const [isAll, setIsAll] = React.useState(false);
  const [openBox, setOpenBox] = React.useState(false);
  const [history, setHistory] = React.useState<string[]>([]);
  const inputRef = useOutsideClick(() => setOpenBox(false));
  const [foundTopics, setFoundTopics] = React.useState<Topic[]>([]);
  const keywordParam = useQueryParams().get("keyword");

  const navigate = useNavigate();

  React.useEffect(() => {
    setIsAll(false);
  }, [topic]);

  React.useEffect(() => {
    setKeyword(keywordParam ?? "");
  }, [keywordParam]);

  React.useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );
    setHistory(savedHistory);
  }, []);
  const debouncedSearch = React.useMemo(
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

  React.useEffect(() => {
    const trimmedKeyword = keyword.trim().replace(/^t\//, "");
    debouncedSearch(trimmedKeyword);
    return () => {
      debouncedSearch.cancel();
    };
  }, [keyword, debouncedSearch]);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keyword.trim()) {
      handleSearch(keyword.trim());
    }
  };

  const handleSearch = (value: string) => {
    addHistory(value);
    navigate(`/search/posts?keyword=${value}`);
    setOpenBox(false);
  };

  const handleSelect = (topic: Topic) => {
    navigate(`/topic/${topic.name}`);
    setKeyword("");
    setOpenBox(false);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
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
          "flex gap-x-2 bg-blue-gray-50 h-10 rounded-[1.25rem] z-20 items-center text-blue-gray-700",
          openBox && "hover:bg-blue-gray-50 bg-transparent"
        )}
      >
        <span className="ps-3">
          <Search className="h-[1.18rem]" />
        </span>
        {!isAll && topic && (
          <span
            className={cn(
              "rounded-full bg-blue-gray-700/15 text-xs flex gap-x-2 items-center"
            )}
          >
            <div className="h-full aspect-square rounded-full flex items-center justify-center m-1.5">
              <Avatar src={topic.avatar || Default} className="w-5 h-5" />
            </div>

            <span className="truncate">t/{topic.name}</span>
            <div
              className="h-full aspect-square hover:bg-blue-gray-200/50 rounded-full p-1.5 flex items-center justify-center cursor-pointer"
              onClick={() => setIsAll(true)}
            >
              <div className=" bg-blue-gray-900/80 rounded-full p-1">
                <X className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            </div>
          </span>
        )}
        <div className="flex-1 text-sm">
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
        <button
          type="button"
          onClick={() => setKeyword("")}
          className={cn(
            "rounded-full hover:bg-blue-gray-100/50 m-0 p-2 mr-2",
            !!keyword == false && "hidden"
          )}
        >
          <CircleX className="w-4 h-4" />
        </button>
      </div>
      {openBox && (
        <div className="absolute top-0 w-full -z-10 rounded-[1.25rem] overflow-hidden bg-white shadow-md">
          <div
            className={cn(
              "min-h-10 text-blue-gray-700 text-sm",
              history.length != 0 && "mt-[calc(3rem-0.1rem)]"
            )}
          >
            {!!keyword == false &&
              history.map((value, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between hover:bg-blue-gray-50/40 py-2 px-4 cursor-pointer"
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
                    onClick={e => {
                      e.stopPropagation();
                      removeHistory(value);
                    }}
                    className="rounded-full hover:bg-blue-gray-100/50 p-2"
                  >
                    <CircleX className="w-4 h-4" />
                  </button>
                </div>
              ))}
            {!!keyword && (
              <>
                {foundTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex gap-x-2 items-center py-2 px-4 hover:bg-blue-gray-50/40 cursor-pointer"
                    onClick={() => handleSelect(topic)}
                  >
                    <Avatar
                      src={topic.avatar || DefaultTopic}
                      className="w-6 h-6"
                    />
                    <div className="flex-col flex">
                      <span className="text-xs font-normal">{`t/${topic.name}`}</span>
                      <span className="text-[0.7rem] font-light">
                        {`${topic.postCount} `}
                        {topic.postCount ? "posts" : "post"}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="box-border flex items-center gap-x-2 px-3 py-4 overflow-hidden border-t">
                  <div>
                    <Search className="h-[1.18rem]" />
                  </div>
                  <span className="truncate">Search for "{keyword}"</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
