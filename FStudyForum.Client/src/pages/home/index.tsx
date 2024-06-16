import PostService from "@/services/PostService";
import ContentLayout from "@/components/layout/ContentLayout";
import PostItem from "@/components/post/PostItem";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
import { Post } from "@/types/post";

const Home: React.FC = () => {
  const { data: posts } = useQuery({
    queryKey: ["home"],
    queryFn: () => PostService.getPosts()
  });
  if (!posts) return <Spinner className="mx-auto" />;
  return (
    <ContentLayout>
      {posts.map((post : Post, index: number) => (
        <div key={index}>
          <PostItem key={index} data={post} />
          <hr className="my-1 border-blue-gray-50" />
        </div>
      ))}
    </ContentLayout>
  );
};
export default Home;
