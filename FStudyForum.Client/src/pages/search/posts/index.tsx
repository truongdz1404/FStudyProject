import React from "react";
import SearchService from "@/services/SearchService";
import ContentLayout from "@/components/layout/ContentLayout";
import PostItem from "@/components/post/PostItem";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
    LIMIT_SCROLLING_PAGNATION_RESULT,
    SessionStorageKey
} from "@/helpers/constants";
import PostFilter from "@/components/filter/PostFilter";
import NotFoundSearch from "@/components/layout/NotFoundSearch";
import { Spinner } from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';
import SearchButton from "@/components/search/SearchButton";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchPostPage: React.FC = () => {
    const [filter, setFilter] = React.useState<string>("New");
    const { ref, inView } = useInView();
    const [hasMore, setHasMore] = React.useState(true); // Thêm state này

    const query = useQuery();
    const keyword = query.get('keyword') || "";
    React.useEffect(() => {
        const savedFilter = sessionStorage.getItem(SessionStorageKey.SelectedFilter);
        if (savedFilter) setFilter(savedFilter);
        else setFilter("New");
    }, []);

    const { data, fetchNextPage, isPending, isFetchingNextPage, refetch } =
        useInfiniteQuery({
            queryKey: [`search-${filter}-query`, keyword],
            queryFn: async ({ pageParam = 1 }) => {
                try {
                    const result = await SearchService.searchPosts(
                        keyword || "",
                        pageParam,
                        LIMIT_SCROLLING_PAGNATION_RESULT,
                        filter
                    );
                    if (result.length < LIMIT_SCROLLING_PAGNATION_RESULT) {
                        setHasMore(false);
                    }
                    return result;
                } catch (error) {
                    if (error instanceof Error && error.message === 'Request failed with status code 404') {
                        setHasMore(false);
                        return [];
                    } else {
                        throw error;
                    }
                }
            },
            getNextPageParam: (_, pages) => pages.length + 1,
            initialPageParam: 1
        });

    const posts = data?.pages.flatMap(p => p) ?? [];

    React.useEffect(() => {
        if (posts.length && !isPending) {
            return;
        }

        if (inView && hasMore) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, posts.length, isPending, hasMore]);

    React.useEffect(() => {
        refetch();
    }, [keyword, refetch]);

    if (isPending) return <Spinner className="mx-auto" />;

    return (
        <ContentLayout>
            <div className="relative flex text-left z-20 mt-3">
                <SearchButton />
            </div>
            <div className="relative flex text-left z-20">
                <PostFilter setFilter={setFilter} filter={filter} />
            </div>
            {posts.length === 0 && !isPending && <NotFoundSearch keyword={keyword}/>}
            {posts.map((post, index) => (
                <div key={index} className="w-full">
                    <div className="hover:bg-gray-50 rounded-lg w-full">
                        <PostItem key={index} data={post} />
                    </div>
                    <hr className="my-1 border-blue-gray-50" />
                </div>
            ))}
            <div ref={ref} className="text-center">
                {isFetchingNextPage ? (
                    <Spinner className="mx-auto" />
                ) : (
                    <span className="text-xs font-light">
                        {posts.length !== 0 && !isPending && "Nothing more"}
                    </span>
                )}
            </div>
        </ContentLayout>
    );
};

export default SearchPostPage;
