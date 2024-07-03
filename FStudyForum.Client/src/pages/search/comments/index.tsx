import React from "react";
import SearchService from "@/services/SearchService";
import PostService from "@/services/PostService";
import ContentLayout from "@/components/layout/ContentLayout";
import PostItem from "@/components/search/PostItemSearch";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery} from "@tanstack/react-query";
import { LIMIT_SCROLLING_PAGNATION_RESULT, SessionStorageKey } from "@/helpers/constants";
import CommentFilter from "@/components/filter/CommentFilter";
import NullLayout from "@/components/layout/NullLayout";
import { Spinner } from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';
import SearchButton from "@/components/search/SearchButton";

const useQueryParams = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchCommentPage: React.FC = () => {
    const [filter, setFilter] = React.useState<string>("New");
    const { ref, inView } = useInView();

    const queryParams = useQueryParams();
    const keyword = queryParams.get('keyword');

    React.useEffect(() => {
        const savedFilter = sessionStorage.getItem(SessionStorageKey.SelectedFilter);
        if (savedFilter) setFilter(savedFilter);
        else setFilter("New");
    }, []);

    const { data: comments, fetchNextPage, isPending, isFetching, refetch } = useInfiniteQuery({
        queryKey: [`search-${filter}-comments`, keyword],
        queryFn: async ({ pageParam = 1 }) => {
            if (!keyword) return { data: [], nextPage: undefined, hasMore: false };
            const comments = await SearchService.searchComments(
                keyword,
                pageParam,
                LIMIT_SCROLLING_PAGNATION_RESULT,
                filter
            );
            const posts = await Promise.all(comments.map(comment => PostService.getById(comment.postId.toString())));
            return {
                data: comments.map((comment, index) => ({
                    comment: comment,
                    post: posts[index],
                })),
                nextPage: comments.length === LIMIT_SCROLLING_PAGNATION_RESULT ? pageParam + 1 : undefined,
                hasMore: comments.length === LIMIT_SCROLLING_PAGNATION_RESULT,
            };
        },
        getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
        enabled: !!keyword,
        initialPageParam: 1,
    });
    const results = comments?.pages.flatMap(page => page.data) || [];


    React.useEffect(() => {
        if (inView && !isFetching) {
            fetchNextPage();
        }
    }, [inView, isFetching, fetchNextPage]);

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
                <CommentFilter setFilter={setFilter} filter={filter} />
            </div>
            {results.length === 0 && !isPending && <NullLayout />}
            {results.map(({ post, comment }, index) => (
                <div key={index} className="w-full ">
                    <div className="hover:bg-gray-100 rounded-lg w-full py-3">
                        <PostItem key={index} data={post} comment={comment} />
                    </div>
                    <hr className="my-1 border-blue-gray-50" />
                </div>
            ))}
            <div ref={ref} className="text-center">
                {isFetching ? (
                    <Spinner className="mx-auto" />
                ) : (
                    <span className="text-xs font-light">
                        {results.length === 0 && !isPending ? "Nothing found" : "Nothing more"}
                    </span>
                )}
            </div>
        </ContentLayout>
    );
};

export default SearchCommentPage;
