import TopicService from "@/services/TopicService";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import PostService from "@/services/PostService";
import { usePosts } from "@/hooks/usePosts";
import { useTopics } from "@/hooks/useTopics";
import { Topic } from "@/types/topic";
import { SessionStorageKey } from "@/helpers/constants";
const TopicFilter: React.FC = () => {
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
  }, []);

  const chooseTopic = useCallback(
    async (topicId: number | null, isChooseByClick: boolean) => {
      if (topicId !== null && topicId !== topics) {
        setTopics(topicId);
        const filtered = sessionStorage.getItem(SessionStorageKey.SelectedComponent);
        if ((filtered !== "" || filtered !== null) && isChooseByClick) {
          sessionStorage.setItem(SessionStorageKey.SelectedComponent, "");
        }
        sessionStorage.setItem(SessionStorageKey.SelectedTopic, topicId.toString()); // Save selected topic to session storage
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
    },
    [setPosts, setTopics, topics]
  );

  useEffect(() => {
    const selectedTopic = sessionStorage.getItem(SessionStorageKey.SelectedTopic) as string;
    const selectTopicNumber = parseInt(selectedTopic);
    if (!isNaN(selectTopicNumber) && selectTopicNumber !== topics) {
      setTopics(selectTopicNumber);
      chooseTopic(selectTopicNumber, false);
    }
  }, [chooseTopic, setTopics, topics]);

  return (
    <div>
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
              onClick={() => chooseTopic(topic.id, true)}
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
