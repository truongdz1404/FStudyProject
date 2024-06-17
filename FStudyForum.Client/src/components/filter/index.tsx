import { usePosts } from "@/hooks/usePosts"
import PostService from "@/services/PostService"
import TopicService from "@/services/TopicService"
import { Topic } from "@/types/topic"
import { ChevronDown, ChevronRight, ChevronUp, Filter } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const FilterComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const [isChevronDown, setIsChevronDown] = useState(false)
  const { setPosts } = usePosts()
  const [topics, setTopics] = useState<Topic[]>([])
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null)
  const node = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchTopics = async () => {
      const topics = await TopicService.getActiveTopics();
      setTopics(topics)
    }
    fetchTopics()
  })

  const chooseTopic = (topicId: number | null) => {
    return async () => {
      if (topicId !== null){
        setSelectedTopic(topicId)
        const fetchPosts = async () => {
          try {
            const posts = await PostService.getPostsByTopicId(topicId)
            if (Array.isArray(posts)) {
              setPosts(posts)
            } else {
              setPosts([])
            }
          } catch (error) {
            setPosts([])
          }
        }
        fetchPosts();
      }
    }
  }


  const handleChooseNewest = () => {
    const fetchPosts = async () => {
      try {
        const posts = await PostService.getPosts();
        if (Array.isArray(posts)) {
          setPosts(posts)
        } else {
          console.log("Error fetching posts")
          setPosts([])
        }
      } catch (error) {
        setPosts([])
      }
    }
    fetchPosts()
  }


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (node.current?.contains(e.target as Node)) {
        return
      }
      setIsChevronDown(false)
      setIsOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={node} className="flex items-center justify-center bg-gray-100">
      <div className="relative inline-block text-left">
        <button
          onClick={() => {
            setIsOpen(!isOpen)
            setSubMenuOpen(false)
            setIsChevronDown(!isChevronDown)
          }}
          className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        >
          <Filter className="w-4 h-4 mr-2 mt-1" />
          Filter
          {isChevronDown ? <ChevronUp /> : <ChevronDown />}
        </button>
        {isOpen && (
          <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 px-2 py-2">
            <a
              onMouseEnter={() => setSubMenuOpen(false)}
              onClick={handleChooseNewest}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              Newest
            </a>
            <div className="relative">
              <button
                onMouseEnter={() => setSubMenuOpen(true)}
                className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 relative rounded-md"
              >
                {" "}
                Topic <ChevronRight />
              </button>
              {subMenuOpen && (
                <div className="absolute top-0 left-full ml-4 w-full rounded-md shadow-lg ring-1 ring-black ring-opacity-5 px-2 py-2">
                  {topics.map((topic, index) => (
                    <a
                      key={index}
                      target="_blank"
                      rel="noopener"
                      onClick={chooseTopic(topic.id)}
                      className={
                        selectedTopic === topic.id
                          ? "bg-orange-400 flex px-4 py-2 text-sm text-gray-700 cursor-pointer rounded-md"
                          : "bg-white flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md"
                      }
                    >
                      {topic.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterComponent
