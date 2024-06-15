import { Post } from "@/types/post";
import { PropsWithChildren, createContext, useState } from "react";

type PostContextType = {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

export const PostContext = createContext<PostContextType | undefined>(
    undefined
);



export const PostProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    return (
        <PostContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostContext.Provider>
    );
};
