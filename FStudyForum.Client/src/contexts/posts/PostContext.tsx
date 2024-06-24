import { Post } from "@/types/post";
import { PropsWithChildren, createContext, useState } from "react";

type PostContextType = {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    postData: Post | null;
    setPostData: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const PostContext = createContext<PostContextType | undefined>(
    undefined
);



export const PostProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [postData, setPostData] = useState<Post | null>(null);
    return (
        <PostContext.Provider value={{ posts, setPosts, postData, setPostData }}>
            {children}
        </PostContext.Provider>
    );
};
