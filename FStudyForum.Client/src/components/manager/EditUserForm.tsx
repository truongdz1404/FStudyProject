import Select from "react-select";
import { Roles } from "@/helpers/constants";
import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { User } from "@/types/user";
import { Avatar, Input } from "@material-tailwind/react";
import { Search } from "lucide-react";
import { cn } from "@/helpers/utils";
import { debounce } from "lodash";
import { Topic } from "@/types/topic";
import TopicService from "@/services/TopicService";
import DefaultTopic from "@/assets/images/topic.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserService from "@/services/UserService";
import { AxiosError } from "axios";
import { Response } from "@/types/response";

const roleOptions = [
  { value: Roles.USER, label: "User" },
  { value: Roles.MODERATOR, label: "Moderator" },
  { value: Roles.ADMIN, label: "Admin" }
];
type Props = {
  user: User;
  handle: () => void;
};

const EditUserForm: FC<Props> = ({ user, handle }) => {
  const [roles, setRoles] = useState(user.roles);
  const [selectIndex, setSelectIndex] = useState(-1);
  const [foundTopics, setFoundTopics] = useState<Topic[]>([]);
  const [keyword, setKeyword] = useState("");
  const [modTopics, setModTopics] = useState<Topic[]>([]);
  const queryClient = useQueryClient();
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
          closeOpenSearch();
        }
        break;
    }
  };

  const handleSelect = (topic: Topic) => {
    setModTopics(pre => {
      if (pre.some(t => t.name == topic.name)) {
        return pre;
      }
      return [...pre, topic];
    });
    closeOpenSearch();
  };

  const { mutate: handleSubmit } = useMutation({
    mutationFn: async () => {
      return await UserService.edit({
        username: user.username,
        newRoles: roles,
        oldRoles: user.roles,
        moderatorTopics: modTopics.map<string>(t => t.name)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["USER_LIST"] });
    },
    onError: e => {
      const error = e as AxiosError<Response>;
      console.error(
        (error?.response?.data as Response)?.message || error.message
      );
    },
    onSettled: () => {
      handle();
    }
  });

  const noSubmit =
    roles.length === 0 ||
    (roles.includes(Roles.MODERATOR) && modTopics.length === 0);

  return (
    <>
      <div className="py-2 px-4 border-b-2">
        <h1 className="text-base font-semibold">Edit User</h1>
      </div>
      <div className="py-2 px-4 w-full">
        <p className="text-xs uppercase mb-2">Roles</p>
        <Select
          closeMenuOnSelect={true}
          isMulti={false}
          options={roleOptions}
          defaultValue={roleOptions.find(r => roles.includes(r.value))}
          onChange={e => e?.value && setRoles([e?.value])}
          className="text-sm font-normal"
        />
      </div>
      {roles.includes(Roles.MODERATOR) && (
        <div className="py-2 px-4 w-full">
          <p className="text-xs uppercase">Topics</p>
          <div className="mt-4 font-normal">
            <Input
              onChange={handleSearch}
              labelProps={{ className: "hidden" }}
              icon={<Search className="h-4 w-4" strokeWidth={2.2} />}
              placeholder="Select topic"
              containerProps={{ className: "min-w-full" }}
              crossOrigin={undefined}
              className={cn(
                "placeholder:text-gray-500 placeholder:opacity-100 pl-6 ",
                "rounded-md !border-0 !bg-gray-200 text-gray-900"
              )}
              value={keyword}
              onKeyDown={handleKeyDown}
            />
          </div>
          {keyword && (
            <div className="fixed mt-1 w-[21rem] bg-white rounded-lg border shadow-lg shadow-gray-900/5 max-h-80 overflow-y-auto z-30">
              {foundTopics.length ? (
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
                ))
              ) : (
                <div className="py-2 px-4 text-sm font-normal">Not found</div>
              )}
            </div>
          )}

          <div className="mt-2">
            {modTopics.map((topic, index) => (
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
                  onClick={() =>
                    setModTopics(pre => pre.filter(t => t !== topic))
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-2 flex justify-end gap-x-2 font-normal">
        <button
          className="p-2 bg-blue-gray-100 text-xs rounded-full"
          onClick={handle}
        >
          Cannel
        </button>
        <button
          className={cn(
            "p-2 bg-blue-800 text-white text-xs rounded-full",
            noSubmit && "opacity-50"
          )}
          disabled={noSubmit}
          onClick={() => handleSubmit()}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default EditUserForm;
