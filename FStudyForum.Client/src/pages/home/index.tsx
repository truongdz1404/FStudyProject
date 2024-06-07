import {useEffect, useRef, useState } from "react";
import { MessageSquare, Share, ArrowUp, ArrowDown, Award } from "lucide-react";
import { Post } from "@/types/post";
import PostService from "@/services/PostService";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = (node: HTMLElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await PostService.getPosts(page);
      setPosts(prevPosts => [...prevPosts, ...response.data]); 
      if (response.data.length === 0) {
        setHasMore(false);
      }    
    }
    fetchPosts();
  }, [page])
  return (
    <div>
      {posts.map((post,index) => (
        <div key={index} ref={posts.length === index + 1 ? lastPostElementRef : null} className="rounded-lg shadow-md p-6 mb-[5%]">
        <div>
          <p className=" font-semibold mb-2">{post.title}</p>
          <p className="text-gray-700">
            {post.content}
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
      ))}
    </div>
  );
};
export default Home;
