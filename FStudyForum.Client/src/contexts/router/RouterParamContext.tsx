import TopicService from "@/services/TopicService";
import { Topic } from "@/types/topic";
import React, { FC, PropsWithChildren } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Profile } from "@/types/profile";
import ProfileService from "@/services/ProfileService";
import { useQuery } from "@tanstack/react-query";
import PostService from "@/services/PostService";
import { Post } from "@/types/post";
import { Attachment } from "@/types/attachment";
import FeedService from "@/services/FeedService";
import { Feed } from "@/types/feed";

interface RouterParamType {
  topic?: Topic;
  user?: Profile;
  post?: Post;
  feed?: Feed;
  attachment?: Attachment;
}
export const RouterParamContext = React.createContext<RouterParamType>({});

const RouterParamProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    name: topicName,
    username,
    id: postId,
    feedName
  } = useParams<{
    name: string;
    username: string;
    id: string;
    feedName: string;
  }>();

  const { data: post, error: postError } = useQuery({
    queryKey: ["POST_DETAIL", postId],
    queryFn: async () => {
      if (!postId) return;
      const [data] = await Promise.all([
        PostService.getById(postId),
        PostService.addRecent(Number(postId))
      ]);
      return data;
    },
    enabled: !!postId
  });

  const { data: topic, error: topicError } = useQuery({
    queryKey: ["TOPIC_DETAIL", topicName],
    queryFn: async () => {
      if (!topicName) return;
      const data = await TopicService.getTopicByName(topicName);
      return data;
    },
    enabled: !!topicName
  });

  const { data: feed, error: feedError } = useQuery({
    queryKey: ["FEED_DETAIL", feedName],
    queryFn: async () => {
      if (!feedName) return;
      const data = await FeedService.getFeed(feedName);
      return data;
    },
    enabled: !!feedName
  });

  const { data: user, error: userError } = useQuery({
    queryKey: ["USER_DETAIL", username],
    queryFn: async () => {
      if (!username) return;
      const data = await ProfileService.getByUsername(username);
      return data;
    },
    enabled: !!username
  });

  if (postError || topicError || userError || feedError)
    return <Navigate to={"not-found"} />;

  return (
    <RouterParamContext.Provider value={{ topic, user, post, feed }}>
      {children}
    </RouterParamContext.Provider>
  );
};

export default RouterParamProvider;
