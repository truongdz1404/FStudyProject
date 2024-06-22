export interface Post {
  id: number;
  topicName: string;
  topicAvatar: string;
  title: string;
  content: string;
  voteCount: number;
  commentCount: number;
  elapsed: string;
  author: string;
}
export interface CreatePost {
  title: string;
  topicName: string;
  content: string;
  attachments: Attachment[];
}
