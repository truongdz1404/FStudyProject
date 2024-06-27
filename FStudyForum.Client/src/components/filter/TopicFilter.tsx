import TopicService from "@/services/TopicService";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Topic } from "@/types/topic";
import { SessionStorageKey } from "@/helpers/constants";
import { cn } from "@/helpers/utils";

interface TopicFilterProps {
  selectedTopic: number;
  setSelectedTopic: (topic: number) => void;
  setSelectedFeature: (feature: null) => void;
}

const TopicFilter: React.FC<TopicFilterProps> = ({
  setSelectedTopic,
  selectedTopic,
  setSelectedFeature
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [topicArray, setTopicArray] = useState<Topic[]>([]);
  const node = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fetchTopics = async () => {
      const topic = await TopicService.getActiveTopics();
      setTopicArray(topic);
    };
    fetchTopics();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (node.current?.contains(e.target as Node)) {
        return;
      }
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={node}>
      <button
        className="relative inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Filter className="w-4 h-4 mr-2 mt-1" />
        Topic
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div
          className={cn(
            "origin-top-left absolute mt-2 w-28 rounded-md shadow-lg",
            " bg-white ring-1 ring-black ring-opacity-5 px-2 py-2 z-50"
          )}
        >
          {topicArray.map((topic, index) => (
            <button
              key={index}
              formTarget="_blank"
              rel="noopener"
              onClick={async () => {
                const feature = sessionStorage.getItem(
                  SessionStorageKey.SelectedFeature
                );
                if (feature)
                  sessionStorage.removeItem(SessionStorageKey.SelectedFeature);
                setSelectedFeature(null);
                sessionStorage.setItem(
                  SessionStorageKey.SelectedTopic,
                  topic.id.toString()
                );
                setSelectedTopic(topic.id);
              }}
              className={
                selectedTopic === topic.id
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
