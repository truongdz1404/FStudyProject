import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "@material-tailwind/react";
import TopicService from "@/services/TopicService";
import { Topic } from "@/types/topic";
import { MessageSquare, Share, ArrowUp, ArrowDown, Award } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
const TopicDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    setLoading(true);
    if (!name) {
      setError("No topic found");
      setLoading(false);
      return;
    }
    const fetchTopic = async () => {
      try {
        const data = await TopicService.GetTopicByName(name);
        // const isLockedResponse = await TopicService.isLoked(user?.username ?? "", data.id);
        // if (isLockedResponse.data) {
        //   setError("You are not allowed to view this topic");
        //   return;
        // }
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
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
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
        <Alert color="red">No topic found.</Alert>
      </div>
    );
  }
  
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Chi Tiết Chủ Đề</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg font-semibold mb-2">Tên:</p>
          <p className="text-gray-700 mb-4">{topic.name}</p>
          <p className="text-lg font-semibold mb-2">Mô tả:</p>
          <p className="text-gray-700">{topic.description}</p>
        </div>
      </div>
      <div>
        {/* Hard coded content */}
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <div className="flex justify-center">
          <div className="rounded-lg shadow-md p-6">
            <div>
              <p className=" font-semibold mb-2">How to study prj301 well?</p>
              <p className="text-gray-700">
                Gain a solid understanding of the Java Servlet and JSP
                (JavaServer Pages) technologies. Understand the different Java
                Web Application components, such as Servlets, JSPs, and their
                respective lifecycles.
              </p>
            </div>
            <div className="flex space-x-5 px-6 py-2">
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 ml-[-4%] cursor-pointer">
                <ArrowUp className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">77</span>
                <ArrowDown className="w-4 h-4 text-gray-700 hover:text-red-500" />
              </div>
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                <MessageSquare className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">68</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                <Award className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">Award</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                <Share className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">Share</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="rounded-lg shadow-md p-6">
            <div>
              <p className=" font-semibold mb-2">What is Prj301?</p>
              <p className="text-gray-700">
                Gain a solid understanding of the Java Servlet and JSP
                (JavaServer Pages) technologies. Understand the different Java
                Web Application components, such as Servlets, JSPs, and their
                respective lifecycles.
              </p>
            </div>
            <div className="flex space-x-5 px-6 py-2">
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 ml-[-4%] cursor-pointer">
                <ArrowUp className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">77</span>
                <ArrowDown className="w-4 h-4 text-gray-700 hover:text-red-500" />
              </div>
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                <MessageSquare className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">68</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                <Award className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">Award</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                <Share className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">Share</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="rounded-lg shadow-md p-6">
            <div>
              <p className=" font-semibold mb-2">What make PRJ301 hard?</p>
              <p className="text-gray-700">
                Gain a solid understanding of the Java Servlet and JSP
                (JavaServer Pages) technologies. Understand the different Java
                Web Application components, such as Servlets, JSPs, and their
                respective lifecycles.
              </p>
            </div>
            <div className="flex space-x-5 px-6 py-2">
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 ml-[-4%] cursor-pointer">
                <ArrowUp className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">77</span>
                <ArrowDown className="w-4 h-4 text-gray-700 hover:text-red-500" />
              </div>
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                <MessageSquare className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">68</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                <Award className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">Award</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                <Share className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">Share</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="rounded-lg shadow-md p-6">
            <div>
              <p className=" font-semibold mb-2">
                Anyone tell me the best way to learn this subject?
              </p>
              <p className="text-gray-700">
                Gain a solid understanding of the Java Servlet and JSP
                (JavaServer Pages) technologies. Understand the different Java
                Web Application components, such as Servlets, JSPs, and their
                respective lifecycles.
              </p>
            </div>
            <div className="flex space-x-5 px-6 py-2">
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 ml-[-4%] cursor-pointer">
                <ArrowUp className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">77</span>
                <ArrowDown className="w-4 h-4 text-gray-700 hover:text-red-500" />
              </div>
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                <MessageSquare className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">68</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                <Award className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">Award</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                <Share className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">Share</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
