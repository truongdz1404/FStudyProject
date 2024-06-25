
export interface Comment {
  id: number;
  postId: number;
  replyId: number;
  content: string;
  author: string;
  voteCount: number;
  createdAt: string;
  updatedAt: string;
  replies?: Comment[]; 
  
}

export interface CreateComment {
  postId: number;
  content: string;
  replyId?: number;
}
