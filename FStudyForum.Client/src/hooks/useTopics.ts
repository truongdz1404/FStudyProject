import { TopicContext } from "@/contexts/topics/TopicContext"
import { useContext } from "react"

export const useTopics = () => {
     const context = useContext(TopicContext);
     if (context === undefined) {
           throw new Error("useTopics must be used within a TopicProvider");
     }
     return context;
}