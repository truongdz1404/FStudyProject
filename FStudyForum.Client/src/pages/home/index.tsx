import { useEffect, useRef, useState } from "react";
import { MessageSquare, Share, ArrowUp, ArrowDown, Award } from "lucide-react";
import { Post } from "@/types/post";
import PostService from "@/services/PostService";
import { Profile } from "@/types/profile";
import ProfileService from "@/services/ProfileService";
import MenuItemPost from "@/components/post/MenuItem";
import { AxiosError } from "axios";
import ContentLayout from "@/components/layout/ContentLayout";
const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [profiles, setProfiles] = useState<{ [key: string]: Profile }>({});
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = (node: HTMLElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (!hasMore) return;
      try {
        const response = await PostService.getPosts(page);
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        if (response.data.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setHasMore(false);
        }
      }
    };
    fetchPosts();
  }, [page, hasMore]);

  useEffect(() => {
    const getProfile = async (userName: string) => {
      if (!profiles[userName]) {
        try {
          const response = await ProfileService.getByUsername(userName);
          setProfiles((prevProfiles) => ({
            ...prevProfiles,
            [userName]: response,
          }));
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };
    posts.forEach((post) => {
      post.comments.forEach((comment) => {
        if (!profiles[comment.creater.userName]) {
          getProfile(comment.creater.userName);
        }
      });
    });
  }, [posts, profiles]);
  return (
    <ContentLayout>
      {posts.map((post, index) => (
        <div
          key={index}
          ref={posts.length === index + 1 ? lastPostElementRef : null}
          className="rounded-lg shadow-md p-6 mb-[5%] w-full"
        >
          <div>
            <div className="flex justify-between">
              <p className="font-semibold mb-2">{post.title}</p>
              <MenuItemPost />
            </div>
            <p className="text-gray-700">{post.content}</p>
          </div>
          <div className="flex space-x-5 px-6 py-2">
            <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 ml-[-4%] cursor-pointer">
              <ArrowUp className="w-4 h-4 text-gray-700 hover:text-red-500" />
              <span className="text-gray-700">77</span>
              <ArrowDown className="w-4 h-4 text-gray-700 hover:text-red-500" />
            </div>
            <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
              <MessageSquare className="w-4 h-4 text-gray-700 hover:text-red-500" />
              <span className="text-gray-700">{post.comments.length}</span>
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
          <div className="rounded-lg">
            {post.comments.map((comment, index) => (
              <div key={index} className="p-2 rounded-lg mt-2">
                <div className="flex gap-[2%]">
                  {profiles[comment.creater.userName] ? (
                    <img
                      src={profiles[comment.creater.userName].avatar + ""}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full" />
                  )}
                  <p className="font-semibold text-xs my-auto">
                    {comment.creater.userName}
                  </p>
                </div>
                <p className="text-gray-700 ml-[8%]">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </ContentLayout>
  );
};
export default Home;
