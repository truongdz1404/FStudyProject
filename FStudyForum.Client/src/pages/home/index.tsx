import PostService from "@/services/PostService";
import ContentLayout from "@/components/layout/ContentLayout";
import PostItem from "@/components/post/PostItem";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  LIMIT_SCROLLING_PAGNATION_RESULT,
  SessionStorageKey
} from "@/helpers/constants";
import React from "react";
import FilterComponent from "@/components/filter";
import TopicFilter from "@/components/filter/TopicFilter";
import NullLayout from "@/components/layout/NullLayout";
import { Spinner } from "@material-tailwind/react";

const HomePage: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = React.useState<string | null>();
  const [selectedTopic, setSelectedTopic] = React.useState<number | null>();
  const lastPostRef = React.useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1
  });

  React.useEffect(() => {
    const topic = sessionStorage.getItem(SessionStorageKey.SelectedTopic);
    const feature = sessionStorage.getItem(SessionStorageKey.SelectedFeature);
    if (topic) setSelectedTopic(Number.parseInt(topic));
    if (feature) setSelectedFeature(feature);
    else setSelectedFeature(null);
  }, []);

  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["home-infinite-query", selectedFeature, selectedTopic],
    queryFn: async ({ pageParam = 1 }) => {
      const posts = await PostService.get(
        (!selectedFeature && !selectedTopic) ? "all" : "filter",
        pageParam,
        LIMIT_SCROLLING_PAGNATION_RESULT,
        selectedFeature ?? "",
        selectedTopic ?? -1
      );

      return posts;
    },
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1
  });
  React.useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap(p => p) ?? [];

  if (isLoading) return <Spinner className="mx-auto"  color="deep-orange" fontSize="xl" />;
  return (
    <ContentLayout>
      <div className="relative flex text-left mb-2 z-30 space-x-5">
        <TopicFilter
          setSelectedTopic={setSelectedTopic}
          selectedTopic={selectedTopic ?? -1}
          setSelectedFeature={setSelectedFeature}
        />
        <FilterComponent
          setSelectedFilter={setSelectedFeature}
          selectedFilter={selectedFeature ?? ""}
          postCollection={posts}
        />
      </div>
      {posts.length === 0 && (<NullLayout />)}
      {posts.map((post, index) => {
        return (
          <div key={index} ref={index === posts.length - 1 ? ref : undefined}>
            <div className="hover:bg-gray-50 rounded-lg z-10">
              <PostItem key={index} data={post} />
            </div>
            <hr className="my-1 border-blue-gray-50" />
          </div>
        );
      })}
    </ContentLayout>
  );
};
export default HomePage;
