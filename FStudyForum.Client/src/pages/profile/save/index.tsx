import ContentLayout from "@/components/layout/ContentLayout";
import PostItem from "@/components/post/PostItem";
import { cn } from "@/helpers/utils";
import { useAuth } from "@/hooks/useAuth";
import SavedPostService from "@/services/SavedPostService";
import { Spinner, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";

const SavePost: React.FC = () => {
  const { user } = useAuth();
  const { data: posts, isPending } = useQuery({
    queryKey: ["savePost"],
    queryFn: () => SavedPostService.listSavedPosts(user!.username),
    enabled: !!user
  });
  if (isPending) return <Spinner className="mx-auto" />;
  return (
    <ContentLayout>
      <div
        className={cn(
          "flex justify-center",
          (posts?.length ?? 0) > 0 && "hidden"
        )}
      >
        <Typography className="text-sm capitalize font-semibold">
          Hasn't posts yet
        </Typography>
      </div>
      {posts?.map((post, index) => (
        <div key={index}>
          <PostItem key={index} data={post} />
          <hr className="my-1 border-blue-gray-50" />
        </div>
      ))}
    </ContentLayout>
  );
};
export default SavePost;
