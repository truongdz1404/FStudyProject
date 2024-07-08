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

type History = {
  topic: { name?: string; avatar?: string };
  keyword?: string;
};

const SearchInput: FC = () => {
  const [keyword, setKeyword] = React.useState("");
  const { topic } = useRouterParam();
  const [isAll, setIsAll] = React.useState(false);
  const [openBox, setOpenBox] = React.useState(false);
  const [history, setHistory] = React.useState<History[]>([]);
  const containerInputRef = useOutsideClick(() => closeBox());
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectIndex, setSelectIndex] = React.useState(-1);
  const [foundTopics, setFoundTopics] = React.useState<Topic[]>([]);
  const keywordParam = useQueryParams().get("keyword");

  const navigate = useNavigate();

  const closeBox = () => {
    inputRef.current?.blur();
    setSelectIndex(-1);
    setOpenBox(false);
  };

  React.useEffect(() => {
    setIsAll(false);
  }, [topic]);

  React.useEffect(() => {
    setKeyword(keywordParam ?? "");
  }, [keywordParam]);

  React.useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("search_history") || "[]"
    ) as History[];
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

  const canViewHistory = React.useCallback(
    () => !!keyword == false && !topic,
    [keyword, topic]
  );
  const canSearch = React.useCallback(() => !topic, [topic]);

  React.useEffect(() => {
    if (!canSearch()) return;
    const trimmedKeyword = keyword.trim().replace(/^t\//, "");
    debouncedSearch(trimmedKeyword);
    return () => {
      debouncedSearch.cancel();
    };
  }, [keyword, debouncedSearch, canSearch]);

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        setSelectIndex(prevIndex =>
          prevIndex > 0 ? prevIndex - 1 : boxSize - 1
        );
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectIndex(prevIndex =>
          prevIndex < boxSize - 1 ? prevIndex + 1 : 0
        );
        break;
    }
    if (e.key === "Enter" && selectIndex != -1) {
      if (canViewHistory()) handleSearch(history[selectIndex]);
      else if (canSearch()) handleSelect(foundTopics[selectIndex]);
    } else if (e.key === "Enter" && keyword.trim()) {
      handleSearch({
        keyword: keyword.trim(),
        topic: {
          name: topic?.name,
          avatar: topic?.avatar
        }
      });
    }
  };

  const handleSearch = (value: History) => {
    addHistory(value);
    closeBox();

    if (value.topic.name) {
      navigate(
        `/topic/${value.topic.name}` +
          (value.keyword ? `/search/posts?keyword=${value.keyword}` : "")
      );
    } else navigate(`/search/posts?keyword=${value.keyword}`);
  };

  const handleSelect = (topic: Topic) => {
    addHistory({ topic: { name: topic.name, avatar: topic.avatar } });
    closeBox();
    navigate(`/topic/${topic.name}`);
    setKeyword("");
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectIndex(-1);
    setKeyword(e.target.value);
  };

  const addHistory = (value: History) => {
    const max_history_size = 6;
    const newHistory = [
      value,
      ...history.filter(
        item =>
          item.keyword !== value.keyword || item.topic.name !== value.topic.name
      )
    ].slice(0, max_history_size);
    setHistory(newHistory);
    localStorage.setItem("search_history", JSON.stringify(newHistory));
  };
  const removeHistory = (value: History) => {
    const updatedHistory = history.filter(
      item =>
        item.keyword !== value.keyword || item.topic.name !== value.topic.name
    );
    localStorage.setItem("search_history", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  const boxSize = React.useMemo(
    () =>
      canViewHistory() ? history.length : canSearch() ? foundTopics.length : 0,
    [canSearch, canViewHistory, foundTopics.length, history.length]
  );

  return (
    <div className="relative" ref={containerInputRef}>
      <div
        className={cn(
          "flex gap-x-2 bg-blue-gray-50 h-10 rounded-[1.25rem] z-20 items-center text-blue-gray-700",
          openBox && "hover:bg-blue-gray-50 bg-transparent"
        )}
        onClick={() => inputRef.current?.focus()}
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
            onKeyDown={handleKeydown}
            onFocus={() => setOpenBox(true)}
            ref={inputRef}
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
              ((canViewHistory() && history.length != 0) || !!keyword) &&
                "mt-[calc(3rem-0.1rem)]"
            )}
          >
            {canViewHistory() &&
              history.map((value, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-between hover:bg-blue-gray-50/40 py-2 px-4 cursor-pointer",
                    selectIndex == index && "bg-blue-gray-50/40"
                  )}
                  onClick={() => handleSearch(value)}
                >
                  <div className="flex items-center gap-x-2 overflow-hidden">
                    {value.topic.avatar ? (
                      <>
                        <Avatar
                          src={value.topic.avatar || DefaultTopic}
                          className="w-4 h-4"
                        />
                        <span className="truncate">t/{value.topic.name}</span>
                      </>
                    ) : (
                      <div>
                        <Clock className="w-4 h-4" />
                      </div>
                    )}

                    {value.keyword && (
                      <span className="truncate">{value.keyword}</span>
                    )}
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
                {canSearch() &&
                  foundTopics.map((topic, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex gap-x-2 items-center py-2 px-4 hover:bg-blue-gray-50/40 cursor-pointer",
                        selectIndex == index && "bg-blue-gray-50/40"
                      )}
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
