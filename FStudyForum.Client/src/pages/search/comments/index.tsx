import React from "react";
import SearchService from "@/services/SearchService";
import PostService from "@/services/PostService";
import ContentLayout from "@/components/layout/ContentLayout";
import PostItem from "@/components/post/PostItem";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@tanstack/react-query";
import { SessionStorageKey } from "@/helpers/constants";
import PostFilter from "@/components/filter/PostFilter";
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

    const { data: comments, isPending, isFetching, refetch } = useQuery({
        queryKey: ['search-comments', keyword],
        queryFn: async () => {
            if (!keyword) return [];
            const comments = await SearchService.searchComments(keyword);
            const posts = await Promise.all(comments.map(comment => PostService.getById(comment.postId.toString())));
            return comments.map((comment, index) => ({
                comment,
                post: posts[index],
            }));
        },
        enabled: !!keyword,
    });
    const results = comments ?? [];


    React.useEffect(() => {
        if (inView && !isFetching) {
            refetch();
        }
    }, [inView, isFetching, refetch]);

    if (isPending) return <Spinner className="mx-auto" />;

    return (
        <ContentLayout>
            <div className="relative flex text-left z-20 mt-3">
                <SearchButton/>
            </div>
            <div className="relative flex text-left z-20">
                <PostFilter setFilter={setFilter} filter={filter} />
            </div>
            {results.length === 0 && !isPending && <NullLayout />}
            {results.map(({ post, comment }, index) => (
                <div key={index} className="w-full">
                    <div className="hover:bg-gray-50 rounded-lg w-full">
                        <PostItem key={index} data={post} />
                        <div className="pl-4">
                            <p>{comment.content}</p>
                        </div>
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
