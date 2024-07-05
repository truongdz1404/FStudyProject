import React from "react";
import SearchService from "@/services/SearchService";
import ContentLayout from "@/components/layout/ContentLayout";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
    LIMIT_SCROLLING_PAGNATION_RESULT,
} from "@/helpers/constants";
import NotFoundSearch from "@/components/layout/NotFoundSearch";
import { Spinner } from "@material-tailwind/react";
import { Link, useLocation } from 'react-router-dom';
import SearchButton from "@/components/search/SearchButton";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchUserPage: React.FC = () => {
    const { ref, inView } = useInView();
    const [hasMore, setHasMore] = React.useState(true);
    const query = useQuery();
    const keyword = query.get('keyword') ?? '';

    const { data, fetchNextPage, isPending, isFetchingNextPage, refetch } =
        useInfiniteQuery({
            queryKey: [`search-query`, keyword],
            queryFn: async ({ pageParam = 1 }) => {
                try {
                    const result = await SearchService.searchUsers(
                        keyword || "",
                        pageParam,
                        LIMIT_SCROLLING_PAGNATION_RESULT,
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
    const users = data?.pages.flatMap(page => page) ?? [];

    React.useEffect(() => {
        if (inView && hasMore) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasMore]);

    React.useEffect(() => {
        setHasMore(true);
        refetch();

    }, [keyword, refetch]);

    const uniqueTopics = Array.from(new Set(users.map(t => t.username))).map(
        name => users.find(t => t.username === name)
    );

    if (isPending) return <Spinner className="mx-auto" />;

    return (
        <ContentLayout>
            <div className="relative flex text-left z-20 mt-3">
                <SearchButton />
            </div>
            {uniqueTopics.length === 0 && <NotFoundSearch keyword={keyword} />}
            {uniqueTopics.map((user, index) => {
                return (
                    <Link
                        to={`/profile/${user?.username}`}
                        key={user?.username}
                    >
                        <div key={index} className="w-full flex flex-col item-center">
                            <div className="hover:bg-gray-100 rounded-lg w-full py-6 flex items-center">
                                <img src={user?.avatar || "/src/assets/images/user.png"} alt={user?.username} className="ml-3 w-12 h-12 rounded-full mr-4" />
                                <div>
                                    <h3 className="font-bold mb-1">{user?.username}</h3>
                                </div>
                            </div>
                            <hr className="my-1 border-blue-gray-50 w-full" />
                        </div>
                    </Link>
                );
            })}
            <div ref={ref} className="text-center">
                {isFetchingNextPage ? (
                    <Spinner className="mx-auto" />
                ) : (
                    <span className="text-xs font-light">
                        {uniqueTopics.length !== 0 && !isPending && "Nothing more"}
                    </span>
                )}
            </div>
        </ContentLayout>
    );
};

export default SearchUserPage;
