import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Spinner } from "@material-tailwind/react";
import TopicService from "@/services/TopicService";
import { Topic } from "@/types/topic";

const TopicDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    if (!name) {
      setError("Topic not found");
      setLoading(false);
      return;
    }

    const fetchTopic = async () => {
      try {
        const data = await TopicService.getTopicByName(name);
        setTopic(data);
      } catch (error) {
        setError("Failed to fetch topic");
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [name]);

  if (loading) {
    return <Spinner className="mx-auto" />;
  }

  if (!topic || error) {
    return (
      <div className="p-4">
        <Alert color="red">Topic not found</Alert>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <span className="text-center">{topic?.name}</span>
    </div>
  );
};

export default TopicDetail;
