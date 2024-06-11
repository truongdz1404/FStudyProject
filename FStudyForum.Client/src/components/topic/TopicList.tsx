// src/components/TopicList.tsx
import React, { useEffect, useState } from "react";
import Topic from "@/components/topic/topic";
import TopicService from "@/services/TopicService";
import { Topic as TopicType } from "@/types/topic";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {topics.map((topic) => (
        <Topic key={topic.id} topic={topic} />
      ))}
    </div>
  );
};

export default TopicList;
