import { useEffect, useRef, useState } from "react"
import { MessageSquare, Share, ArrowUp, ArrowDown, Award } from "lucide-react"
import PostService from "@/services/PostService"
import { Profile } from "@/types/profile"
import ProfileService from "@/services/ProfileService"
import MenuItemPost from "@/components/post/MenuItem"
import { AxiosError } from "axios"
import ContentLayout from "@/components/layout/ContentLayout"
import { usePosts } from "@/hooks/usePosts"
import FilterComponent from "@/components/filter/Topic"
import NullLayout from "@/components/layout/NullLayout"
const Home: React.FC = () => {
  const { posts, setPosts } = usePosts()
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isViewingTopic, setIsViewingTopic] = useState(false) // kiểm tra xem người dùng có đang xem topic nào cụ thể không
  const [profiles, setProfiles] = useState<{ [key: string]: Profile }>({})
  const observer = useRef<IntersectionObserver | null>(null)
  const lastPostElementRef = (node: HTMLElement | null) => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isViewingTopic) {
        setPage(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      if (!hasMore) return
      try {
        const posts = await PostService.getPosts(page)
        setPosts(prevPosts => [...prevPosts, ...posts])
        if (posts.length === 0) {
          setHasMore(false)
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setHasMore(false)
        }
      }
    }
    fetchPosts()
  }, [page, hasMore, setPosts, isViewingTopic])

  useEffect(() => {
    const getProfile = async (userName: string) => {
      if (!profiles[userName]) {
        try {
          const response = await ProfileService.getByUsername(userName)
          setProfiles(prevProfiles => ({
            ...prevProfiles,
            [userName]: response
          }))
        } catch (error) {
          console.error("Error fetching profile:", error)
        }
      }
    }
    posts.forEach(post => {
      post.comments.forEach(comment => {
        if (!profiles[comment.creater.userName]) {
          getProfile(comment.creater.userName)
        }
      })
    })
  }, [posts, profiles])

  // callback function to handle topic event
  const handleTopicEvent = (isViewingTopic: boolean) => {
    setIsViewingTopic(isViewingTopic)
    if (!isViewingTopic) {
      setPosts([])
      setPage(1)
      setHasMore(true)
    }
  }

  return (
    <div>
      <div className="flex justify-start m-4">
        <FilterComponent 
          onAllTopicClick={() => handleTopicEvent(false)}
          onTopicClick={handleTopicEvent}
        />
      </div>
      {(posts.length === 0) && 
        <NullLayout />
      }
    {(posts.length > 0) && 
    <div>
      <ContentLayout>
        {posts.map((post, index) => (
          <div
            key={index}
            ref={posts.length === index + 1 ? lastPostElementRef : null}
            className="rounded-lg shadow-sm p-6 mb-6 w-full border"
          >
            <div>
              <div className="flex justify-between">
                <p className="font-semibold mb-2">{post.title}</p>
                <MenuItemPost />
              </div>
              <p className="text-gray-700 text-sm">{post.content}</p>
            </div>
            <div className="flex space-x-5 px-6 py-2">
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 ml-[-4%] cursor-pointer">
                <ArrowUp className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">0</span>
                <ArrowDown className="w-4 h-4 text-gray-700 hover:text-red-500" />
              </div>
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                <MessageSquare className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">{post.comments.length}</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                <Award className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">Award</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer">
                <Share className="w-4 h-4 text-gray-700 hover:text-red-500" />
                <span className="text-gray-700">Share</span>
              </div>
            </div>
            <div className="rounded-lg">
              {post.comments.map((comment, index) => (
                <div key={index} className="p-2 rounded-lg mt-2">
                  <div className="flex gap-[2%]">
                    {profiles[comment.creater.userName] ? (
                      <img
                        src={profiles[comment.creater.userName].avatar + ""}
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full" />
                    )}
                    <p className="font-semibold text-xs my-auto">
                      {comment.creater.userName}
                    </p>
                  </div>
                  <p className="text-gray-700 ml-[8%]">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </ContentLayout>
    </div>}
    </div>
  )
}
export default Home
