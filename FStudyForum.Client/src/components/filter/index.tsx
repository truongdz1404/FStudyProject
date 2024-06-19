import { usePosts } from "@/hooks/usePosts";
import { useTopics } from "@/hooks/useTopics";
import PostService from "@/services/PostService";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const FilterComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChevronDown, setIsChevronDown] = useState(false);
  const { setPosts } = usePosts();
  const { topics } = useTopics();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const node = useRef<HTMLDivElement>(null);
  const NEW = "New";
  const HOT = "Hot";

  const handleChoosePost = useCallback(
    async (param: string) => {
      const fetchPosts = async () => {
        let posts;
        switch (param) {
          case NEW:
            posts = await PostService.getNewPosts(topics);
            break;
          case HOT:
            posts = await PostService.getHotPosts(topics);
            break;
          default:
            break;
        }
        if (Array.isArray(posts)) {
          setPosts(posts);
        } else {
          setPosts([]);
        }
      };
      fetchPosts();
    },
    [setPosts, topics]
  );

  useEffect(() => {
    const selectedComponent = sessionStorage.getItem("selectedComponent");
    switch (selectedComponent) {
      case NEW:
        setSelectedFilter(NEW);
        handleChoosePost(NEW);
        break;
      case HOT:
        setSelectedFilter(HOT);
        handleChoosePost(HOT);
        break;
      default:
        setSelectedFilter(null);
        break;
    }
  }, [handleChoosePost]);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (node.current?.contains(e.target as Node)) {
        return;
      }
      setIsChevronDown(false);
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={node} className="relative inline-block text-left mb-2 z-50 mr-10">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsChevronDown(!isChevronDown);
        }}
        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-gray-100 focus:ring-blue-500"
      >
        <Filter className="w-4 h-4 mr-2 mt-1" />
        Sort by
        {isChevronDown ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 px-2 py-2 z-50">
          <div
            className={
              selectedFilter === NEW
                ? "bg-orange-400 block px-4 py-2 text-sm text-gray-700 rounded-md cursor-pointer"
                : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
            }
            onClick={() => {
              sessionStorage.setItem("selectedComponent", NEW);
              setSelectedFilter(NEW);
              handleChoosePost(NEW);
            }}
          >
            New
          </div>
          <div
            className={
              selectedFilter === HOT
                ? "bg-orange-400 block px-4 py-2 text-sm text-gray-700 rounded-md cursor-pointer"
                : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
            }
            onClick={() => {
              sessionStorage.setItem("selectedComponent", HOT);
              setSelectedFilter(HOT);
              handleChoosePost(HOT);
            }}
          >
            Hot
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
