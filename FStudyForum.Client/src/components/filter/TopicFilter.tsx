import TopicService from "@/services/TopicService";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { Topic } from "@/types/topic";
import { SessionStorageKey } from "@/helpers/constants";

interface TopicFilterProps {
  selectedTopic: number;
  setSelectedTopic: (topic: number) => void
  setSelectedFeature: (feature: null) => void;
}

const TopicFilter: React.FC<TopicFilterProps> = ({ setSelectedTopic, selectedTopic, setSelectedFeature }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [topicArray, setTopicArray] = useState<Topic[]>([]);
  const [isChevronDown, setIsChevronDown] = useState(false);
  useEffect(() => {
    const fetchTopics = async () => {
      const topic = await TopicService.getActiveTopics();
      setTopicArray(topic);
    };
    fetchTopics();
  }, []);


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
              onClick={async () => {
                const feature = sessionStorage.getItem(SessionStorageKey.SelectedFeature);
                if (feature)
                  sessionStorage.removeItem(SessionStorageKey.SelectedFeature)
                setSelectedFeature(null);
                sessionStorage.setItem(SessionStorageKey.SelectedTopic, topic.id.toString());
                setSelectedTopic(topic.id)
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
