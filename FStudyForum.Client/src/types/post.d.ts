export interface Post {
  id: number;
  topicName: string;
  topicAvatar: string;
  title: string;
  content: string;
  voteType: number;
  voteCount: number;
  commentCount: number;
  elapsed: string;
  author: string;
  authorAvatar: string;
  attachments: Attachment[];
}
export interface CreatePost {
  title: string;
  topicName: string;
  content: string;
  attachments: Attachment[];
}
export interface SavePost {
  postId: number;
}
