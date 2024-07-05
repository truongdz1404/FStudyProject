import { useQuery, useQueryClient } from "@tanstack/react-query";
import MiniPost from "./MiniPost";
import PostService from "@/services/PostService";
import { Post } from "@/types/post";

const RecentPost: React.FC = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery<Post[] | undefined>({
    queryKey: ["recent-post"],
    queryFn: async () => {
      try {
        const resp = await PostService.getRecentPost();
        return resp;
      } catch (e) {
        return [];
      }
    }
  });

  const clearRecentPosts = async () => {
    await PostService.clearRecentPost();
    queryClient.invalidateQueries({ queryKey: ["recent-post"] });
  };

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <div className="flex justify-between items-center p-4 pb-0">
            <h1 className="text-xs uppercase">Recent Post</h1>
            <button
              onClick={clearRecentPosts}
              className="text-blue-800 text-sm"
            >
              Clear
            </button>
          </div>
          {[...data]?.reverse().map(post => (
            <div key={post.id}>
              <MiniPost data={post} />
            </div>
          ))}
        </>
      ) : null}
    </>
  );
};

export default RecentPost;
