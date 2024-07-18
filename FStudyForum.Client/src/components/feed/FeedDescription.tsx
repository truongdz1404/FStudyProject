import { useRouterParam } from "@/hooks/useRouterParam";
import { Avatar, Input } from "@material-tailwind/react";
import DefaultUser from "@/assets/images/user.png";
import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { cn } from "@/helpers/utils";
import { Topic } from "@/types/topic";
import { debounce } from "lodash";
import TopicService from "@/services/TopicService";
import DefaultTopic from "@/assets/images/topic.png";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FeedService from "@/services/FeedService";
import { AxiosError } from "axios";
import { Response } from "@/types/response";

const FeedDescription = () => {
  const { feed, user } = useRouterParam();
  const [keyword, setKeyword] = useState("");
  const [foundTopics, setFoundTopics] = useState<Topic[]>([]);
  const queryClient = useQueryClient();
  const [selectIndex, setSelectIndex] = useState(-1);
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
    setKeyword("");
    setSelectIndex(-1);
  };

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    setSelectIndex(-1);
    setKeyword(event.target.value.trim());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        setSelectIndex(prevIndex =>
          prevIndex > 0 ? prevIndex - 1 : foundTopics.length - 1
        );
        break;
      case "ArrowDown":
        event.preventDefault();
        setSelectIndex(prevIndex =>
          prevIndex < foundTopics.length - 1 ? prevIndex + 1 : 0
        );
        break;
      case "Enter":
        if (selectIndex !== -1) {
          handleSelect(foundTopics[selectIndex]);
        }
        break;
    }
  };
  const handleSelect = (topic: Topic) => {
    addTopic(topic.name);
  };

  const { mutate: addTopic } = useMutation({
    mutationFn: async (topicName: string) => {
      if (!feed) return;
      await FeedService.addTopicToFeed(feed!.name, topicName);
    },
    onSuccess: () => {
      showSuccessToast("Add topic successfully");
      queryClient.invalidateQueries({ queryKey: ["FEED_DETAIL", feed?.name] });
    },
    onError: e => {
      const error = e as AxiosError<Response>;
      showErrorToast(
        (error?.response?.data as Response)?.message || error.message
      );
    },
    onSettled: () => {
      closeOpenSearch();
    }
  });

  const { mutate: removeTopic } = useMutation({
    mutationFn: async (topicName: string) => {
      if (!feed) return;
      await FeedService.removeTopicFromFeed(feed!.name, topicName);
    },
    onSuccess: () => {
      showSuccessToast("Remove topic successfully");
      queryClient.invalidateQueries({ queryKey: ["FEED_DETAIL", feed?.name] });
    },
    onError: e => {
      const error = e as AxiosError<Response>;
      showErrorToast(
        (error?.response?.data as Response)?.message || error.message
      );
    }
  });

  if (!feed || !user) return;
  return (
    <>
      <div className="p-4">
        <p className="text-sm">{feed.name}</p>
        <span className="text-sm font-light">{feed.description}</span>
      </div>
      <div className="p-4 border-t-2 w-full">
        <p className="text-xs uppercase">Topics</p>
        <div className="mt-4 font-normal">
          <Input
            onChange={handleSearch}
            labelProps={{ className: "hidden" }}
            icon={<Search className="h-4 w-4" strokeWidth={2.2} />}
            placeholder="Search topics"
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
        {keyword && (
          <div className="fixed mt-1 w-64 bg-white rounded-lg border shadow-lg shadow-gray-900/5 max-h-80 overflow-y-auto z-30">
            {foundTopics.map((topic, index) => (
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
          </div>
        )}

        <div className="mt-2">
          {feed.topics.map((topic, index) => (
            <div
              key={index}
              className={cn("flex justify-between items-center py-2")}
            >
              <div className="flex items-center gap-x-2">
                <Avatar
                  src={topic.avatar || DefaultTopic}
                  className="w-6 h-6"
                />
                <div className="flex-col flex">
                  <span className="text-xs font-normal hover:underline">{`t/${topic.name}`}</span>
                </div>
              </div>
              <button
                type="button"
                className="px-2 py-1 bg-blue-gray-100/60 text-[0.7rem] rounded-full"
                onClick={() => removeTopic(topic.name)}
              >
                Remove
              </button>
            </div>
          ))}
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
