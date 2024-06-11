import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Progress, Alert } from "@material-tailwind/react";

const TopicDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [topic, setTopic] = useState<{ name: string; description: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchTopicById = async (id: string) => {
      try {
        const response = await fetch(`/api/Topic/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch topic");
        }
        const data = await response.json();
        setTopic(data);
      } catch (error) {
        console.error("Error fetching topic:", error);
        setError("Error fetching topic. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    

    fetchTopicById(id);
  }, [id]);

  if (!id) {
    return (
      <div className="p-4">
        <Alert color="red">Topic ID is missing.</Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Progress value={50} color="blue" className="w-1/2" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert color="red">{error}</Alert>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="p-4">
        <Alert color="red">No topic found for ID: {id}.</Alert>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chi Tiết Chủ Đề</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg font-semibold mb-2">Tên:</p>
        <p className="text-gray-700 mb-4">{topic.name}</p>
        <p className="text-lg font-semibold mb-2">Mô tả:</p>
        <p className="text-gray-700">{topic.description}</p>
      </div>
    </div>
  );
};

export default TopicDetail;
