import { Comment } from "./comment"
export interface Post {
    id: number
    title: string;
    content: string;
    IsDeleted : boolean;
    comments: Comment[];
}
