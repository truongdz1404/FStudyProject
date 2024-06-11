import TopicService from "@/services/TopicService";
import { Post } from "@/types/post";
import { Topic } from "@/types/topic";
import { useEffect, useState, useRef } from "react";

const ITEM_WIDTH = 100;
const SCROLL_WIDTH = 400;

type FilterComponentProps = {
     onPostsUpdate: (posts: Post[]) => void;
};

const FilterComponent: React.FC<FilterComponentProps> = (props) => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const handleScroll = () => {
        const newScrollPosition = scrollPosition + ITEM_WIDTH;
        setScrollPosition(newScrollPosition);
        if (containerRef.current) {
            containerRef.current.scrollLeft = newScrollPosition;
            if (
                newScrollPosition >=
                containerRef.current.scrollWidth -
                    containerRef.current.clientWidth
            ) {
                setIsScrolling(true);
            }
        }
    };

    const handleClick = () => {
        if (
            containerRef.current &&
            scrollPosition >=
                containerRef.current.scrollWidth -
                    containerRef.current.clientWidth
        ) {
            setIsScrolling(false);
            setScrollPosition(0);
            containerRef.current.scrollLeft = 0;
        } else {
            handleScroll();
        }
    };

     const handleChooseTopic = (topicId: number) => {
          if (topicId) {
               const fetchPosts = async () => {
                    const posts = await TopicService.getPostsByTopic(topicId);
                    if (Array.isArray(posts)) {
                        props.onPostsUpdate(posts);
                    } else {
                        console.log("Error fetching posts");
                    }
               };
               fetchPosts();
          }
     };

    useEffect(() => {
        const fetchTopics = async () => {
            const allTopics = await TopicService.getAllActiveTopics();
            if (Array.isArray(allTopics)) {
                setTopics(allTopics);
            } else {
               console.log("Error fetching topics");
                setTopics([]);
            }
        };
        fetchTopics();
    }, []);

    return (
        <div className="flex items-center mt-3">
            <div
                ref={containerRef}
                style={{
                    width: `${SCROLL_WIDTH}px`,
                    overflowX: "scroll",
                    overflow: "hidden",
                    scrollBehavior: "smooth",
                }}
            >
                <div className="w-[400px] flex items-center gap-2 p-2">
                    {topics.map((topic) => {
                        return (
                            <button
                                key={topic.id}
                                className={
                                    "bg-gray-200 px-2 py-1 text-xs rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer font-semibold mb-4"
                                }
                                onClick={() => handleChooseTopic(topic.id)}
                            >
                                <h4>{topic.name}</h4>
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="pb-4">
                <button
                    onClick={handleClick}
                    className="text-sm font-medium text-[#002d36] bg-gray-700 bg-opacity-5 rounded-none p-4 px-4 border-none cursor-pointer transition-all duration-500 ease-in-out"
                >
                    {isScrolling ? "<<" : ">>"}
                </button>
            </div>
        </div>
    );
};

export default FilterComponent;
