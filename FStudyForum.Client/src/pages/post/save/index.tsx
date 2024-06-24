import ContentLayout from "@/components/layout/ContentLayout";
import PostItem from "@/components/post/PostItem";
import { useAuth } from "@/hooks/useAuth"
import SavedPostService from "@/services/SavedPostService";
import { Alert, Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";

const SavePost: React.FC = () => {
    const {user} = useAuth();
    const {
        data: posts,
        error,
        isLoading
      } = useQuery({
        queryKey: ["savePost"],
        queryFn: () => SavedPostService.listSavedPosts(user?.username ?? "")
      });
      if (error)
        return (
          <Alert color="red" className="p-4">
            Can't fetch posts
          </Alert>
        );
      if (isLoading) return <Spinner className="mx-auto" />;
      return (
        <ContentLayout>
          {posts?.map((post, index) => (
            <div key={index}>
              <PostItem key={index} data={post} />
              <hr className="my-1 border-blue-gray-50" />
            </div>
          ))}
        </ContentLayout>
      );
}
export default SavePost