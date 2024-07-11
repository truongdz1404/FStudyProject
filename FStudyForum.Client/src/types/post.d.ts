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

export interface EditPost {
  title: string;
  content: string;
  attachments: Attachment[];
}
export interface SavePost {
  postId: number;
}
export interface StatisticsPost {
  date: Date;
  totalPosts: number;
  totalComments: number;
  totalVotes: number;
}
