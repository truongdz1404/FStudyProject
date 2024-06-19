import TopicService from "@/services/TopicService";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import PostService from "@/services/PostService";
import { usePosts } from "@/hooks/usePosts";
import { useTopics } from "@/hooks/useTopics";
import { Topic } from "@/types/topic";
const TopicFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setPosts } = usePosts();
  const [topicArray, setTopicArray] = useState<Topic[]>([]);
  const [isChevronDown, setIsChevronDown] = useState(false);
  const { topics, setTopics } = useTopics();
  useEffect(() => {
    const fetchTopics = async () => {
      const topic = await TopicService.getActiveTopics();
      setTopicArray(topic);
    };
    fetchTopics();
  }, [setTopics]);
  const chooseTopic = (topicId: number | null) => {
    return async () => {
      if (topicId !== null) {
        setTopics(topicId);
        const filtered = sessionStorage.getItem("selectedComponent");
        if (filtered !== "" || filtered !== null) {
          sessionStorage.setItem("selectedComponent", "");
        }
        const fetchPosts = async () => {
          const posts = await PostService.getPostsByTopicId(topicId);
          if (Array.isArray(posts)) {
            setPosts(posts);
          } else {
            setPosts([]);
          }
        };
        fetchPosts();
      }
    };
  };
  return (
    <div className="relative inline-block text-left mb-2 z-50">
      <button
        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        onClick={() => {
          setIsOpen(!isOpen);
          setIsChevronDown(!isChevronDown);
        }}
      >
        <Filter className="w-4 h-4 mr-2 mt-1" />
        Topic
        {isChevronDown ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 px-2 py-2 z-50">
          {topicArray.map((topic, index) => (
            <button
              key={index}
              formTarget="_blank"
              rel="noopener"
              onClick={chooseTopic(topic.id)}
              className={
                topics === topic.id
                  ? "bg-orange-400 flex px-4 py-2 text-sm text-gray-700 cursor-pointer rounded-md"
                  : "bg-white flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md"
              }
            >
              {topic.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicFilter;
