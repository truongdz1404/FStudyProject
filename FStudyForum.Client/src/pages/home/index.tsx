import PostService from "@/services/PostService";
import ContentLayout from "@/components/layout/ContentLayout";
import PostItem from "@/components/post/PostItem";
import { useQuery } from "@tanstack/react-query";
import { Alert, Spinner } from "@material-tailwind/react";
import NullLayout from "@/components/layout/NullLayout";
import { useEffect } from "react";
import { usePosts } from "@/hooks/usePosts";
import { filterComponents } from "@/components/filter/FilterComponentArray";

const Home: React.FC = () => {
  const { posts, setPosts } = usePosts();
  const { data: initPosts, error, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: () => PostService.getPosts(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (initPosts) {
      setPosts(initPosts);
    }
  }, [initPosts, setPosts])

  if (error)
    return (
      <Alert color="red" className="p-4">
        Can't fetch posts
      </Alert>
    );
  if (isLoading) return <Spinner className="mx-auto" />;
  return (
    <>    
      <div className="relative flex text-left mb-2 z-30 space-x-5">
        {
          filterComponents
            .sort((a, b) => a.id - b.id)
            .map((filter) => {
              const Component = filter.component;
              return <Component key={filter.id} />
            })
        }
      </div>
      {(posts?.length ?? 0) === 0 && <NullLayout />}
      {(posts?.length ?? 0 > 0) && (
        <ContentLayout>
          {posts?.map((post, index) => (
            <div key={index}>
              <PostItem key={index} data={post} />
              <hr className="my-1 border-blue-gray-50" />
            </div>
          ))}
        </ContentLayout>
      )}
    </>
  );
};
export default Home;
