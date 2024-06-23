import PostService from "@/services/PostService";
import ContentLayout from "@/components/layout/ContentLayout";
import PostItem from "@/components/post/PostItem";
import { useQuery } from "@tanstack/react-query";
import { Alert } from "@material-tailwind/react";

const HomePage: React.FC = () => {
  const {
    data: posts,
    error,
    isLoading
  } = useQuery({
    queryKey: ["home"],
    queryFn: () => PostService.getPosts()
  });
  if (error)
    return (
      <Alert color="red" className="p-4">
        Can't fetch posts
      </Alert>
    );
  if (isLoading) return <></>;
  return (
    <ContentLayout>
      {posts?.map((post, index) => (
        <div key={index}>
          <div className="hover:bg-gray-50 rounded-lg z-10">
            <PostItem key={index} data={post} />
          </div>
          <hr className="my-1 border-blue-gray-50" />
        </div>
      ))}
    </ContentLayout>
  );
};
export default HomePage;
