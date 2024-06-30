// import PostService from "@/services/PostService";
// import TopicService from "@/services/TopicService";
// import { Post } from "@/types/post";
// import { Topic } from "@/types/topic";
// import React from "react";
// import { useParams } from "react-router-dom";

// type Params = {
//   name: string;
//   id: string;
// };

const usePath = () => {
  //   const { name: topicName, id: postId } = useParams<Params>();
  //   const [topic, setTopic] = React.useState<Topic | undefined>();
  //   const [post, setPost] = React.useState<Post | undefined>();
  //   React.useEffect(() => {
  //     setTopic(undefined);
  //     if (!topicName) return;
  //     const fetchTopic = async () => {
  //       try {
  //         const topic = await TopicService.getTopicByName(topicName);
  //         setTopic(topic);
  //       } catch (error) {
  //         throw new Error("Topic not found");
  //       }
  //     };
  //     fetchTopic();
  //   }, [topicName]);
  //   React.useEffect(() => {
  //     setTopic(undefined);
  //     if (!postId) return;
  //     const fetchPost = async () => {
  //       try {
  //         const post = await PostService.getById(postId);
  //         setPost(post);
  //       } catch (error) {
  //         throw new Error("Topic not found");
  //       }
  //     };
  //     fetchPost();
  //   }, [postId]);
  //   return [topic];
};
export default usePath;
