import { Comment } from './comment';
export interface Post {
    title: string;
    content: string;
    IsDeleted : boolean;
    comments: Comment[];
}