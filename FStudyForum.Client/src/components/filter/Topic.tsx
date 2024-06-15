import { usePosts } from "@/hooks/usePosts";
import TopicService from "@/services/TopicService";
import { Topic } from "@/types/topic";
import { useEffect, useState, useRef } from "react";

const ITEM_WIDTH = 150;
const SCROLL_WIDTH = 400;
const CONTAINER_WIDTH = 500;

type FilterComponentProps = {
    onAllTopicClick: () => void;
    onTopicClick: (isViewingTopic: boolean) => void;
};
const FilterComponent: React.FC<FilterComponentProps> = (props) => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const { setPosts} = usePosts();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
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

    const handleChooseTopic = (topicId: number | null) => {
        if (topicId !== null) {
            setSelectedTopic(topicId);
            const fetchPosts = async () => {
                try {
                    const posts = await TopicService.getPostsByTopic(topicId);
                    if (Array.isArray(posts)) {
                        setPosts(posts);
                    } else {
                        console.log("Error fetching posts");
                        setPosts([]);
                    }
                } catch (error) {
                    setPosts([]);
                }
            };
            fetchPosts();
            props.onTopicClick(true);
        } else {
            setSelectedTopic(null);
            props.onAllTopicClick();
        }
    };

    useEffect(() => {
        const fetchTopics = async () => {
            const allTopics = await TopicService.getActiveTopics();
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
                <div className={`w-[${CONTAINER_WIDTH}px] flex items-center gap-2 p-2`}>
                    <button
                        className={
                            selectedTopic === null
                                ? "flex items-center bg-orange-500 text-white px-6 py-4 text-xs rounded-md hover:bg-orange-600 transition duration-200 cursor-pointer font-semibold mb-4"
                                : "flex items-center bg-gray-200 px-6 py-4 text-xs rounded-md hover:bg-gray-300 transition duration-200 cursor-pointer font-semibold mb-4"
                        }
                        onClick={() => {
                            handleChooseTopic(null);
                            props.onAllTopicClick();
                        }}
                    >
                        <svg className="h-5 w-5 text-slate-400"  
                            viewBox="0 0 24 24"  
                            fill="none"  
                            stroke="currentColor"  
                            strokeWidth="2"  
                            strokeLinecap="round"  
                            strokeLinejoin="round">  
                            <polyline points="21 8 21 21 3 21 3 8" />  
                            <rect x="1" y="3" width="22" height="5" />  
                            <line x1="10" y1="12" x2="14" y2="12" />
                        </svg>
                        <h4 className="whitespace-nowrap">All Topic</h4>
                    </button>
                    {topics.map((topic) => {
                        return (
                            <button
                                key={topic.id}
                                className={
                                    selectedTopic === topic.id
                                        ? "bg-orange-500 text-white px-4 py-4 text-xs rounded-md hover:bg-orange-600 transition duration-200 cursor-pointer font-semibold mb-4"
                                        : "bg-gray-200 px-4 py-4 text-xs rounded-md hover:bg-gray-300 transition duration-200 cursor-pointer font-semibold mb-4"
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
