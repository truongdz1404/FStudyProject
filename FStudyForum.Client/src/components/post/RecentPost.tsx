import { useQuery, useQueryClient } from "@tanstack/react-query";
import MiniPost from "./MiniPost";
import PostService from "@/services/PostService";
import { Post } from "@/types/post";
import { cn } from "@/helpers/utils";

const RecentPost: React.FC = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery<Post[] | undefined>({
    queryKey: ["recent-post"],
    queryFn: async () => {
      try {
        const resp = await PostService.getRecentPosts();
        return resp;
      } catch (e) {
        return [];
      }
    }
  });

  const clearRecentPosts = async () => {
    await PostService.clearRecent();
    queryClient.invalidateQueries({ queryKey: ["recent-post"] });
  };

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <div className="flex justify-between items-center p-4 pb-2">
            <h1 className="text-xs uppercase">Recent Post</h1>
            <button
              onClick={clearRecentPosts}
              className="text-blue-800 text-sm"
            >
              Clear
            </button>
          </div>
          {[...data]?.reverse().map((post, index) => (
            <div
              key={post.id}
              className={cn(index + 1 != data.length && "border-b-2", "px-2")}
            >
              <MiniPost data={post} />
            </div>
          ))}
        </>
      ) : null}
    </>
  );
};

export default RecentPost;
