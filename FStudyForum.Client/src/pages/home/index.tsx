import { FC } from "react";
import { MessageSquare, Share, ArrowUp, ArrowDown, Award } from "lucide-react";
const Home: FC = () => {
  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-md p-6">
        <div>
          <p className=" font-semibold mb-2">How to study prj301 well?</p>
          <p className="text-gray-700">
            Gain a solid understanding of the Java Servlet and JSP (JavaServer
            Pages) technologies. Understand the different Java Web Application
            components, such as Servlets, JSPs, and their respective lifecycles.
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
  );
};
export default Home;
