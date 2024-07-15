export interface Comment {
  id: number;
  postId: number;
  replyId: number;
  topicName: string;
  attachmentId: number;
  content: string;
  author: string;
  voteType: number;
  voteCount: number;
  avatar: string;
  elapsed: string;
  updatedAt: string;
  commentParent?: Comment;
  replies?: Comment[];
}

export interface CreateComment {
  postId: number;
  content: string;
  replyId?: number;
  attachmentId?: number;
}
