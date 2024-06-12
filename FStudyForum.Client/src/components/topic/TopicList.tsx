// src/components/TopicList.tsx
import React, { useEffect, useState } from "react";
import TopicCard from "@/components/topic/topic";
import TopicService from "@/services/TopicService";
import type { Topic as TopicType } from "@/types/topic";
import { Spinner, Typography } from "@material-tailwind/react";

const TopicList: React.FC = () => {
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await TopicService.getAllActiveTopics();
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

  if (loading) return <div className="flex justify-center items-center"><Spinner /></div>;
  if (error) return <Typography color="red">{error}</Typography>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} onTopicDeleted={handleTopicDeleted} />
      ))}
    </div>
  );
};

export default TopicList;
