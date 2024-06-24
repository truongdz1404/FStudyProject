
import React, { useEffect, useState } from "react";
import TopicCard from "@/components/topic/Topic";
import TopicService from "@/services/TopicService";
import { Topic as TopicType } from "@/types/topic";
import { Spinner } from "@material-tailwind/react";

const TopicList: React.FC = () => {
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const data = await TopicService.getActiveTopics();
        setTopics(data);
      } catch (error) {
        setError("Failed to fetch topics");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const handleTopicDeleted = (id: number) => {
    setTopics(prevTopics => prevTopics.filter(topic => topic.id !== id));
  };

  const handleTopicUpdated = async () => {
    try {
      const data = await TopicService.getActiveTopics();
      setTopics(data);
    } catch (error) {
      setError("Failed to update topics");
    }
  };

  if (loading) return <Spinner className="mx-auto" />;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {topics.map(topic => (
        <TopicCard
          key={topic.id}
          topic={topic}
          onTopicDeleted={handleTopicDeleted}
          onTopicUpdated={handleTopicUpdated}
        />
      ))}
    </div>
  );
};

export default TopicList;
