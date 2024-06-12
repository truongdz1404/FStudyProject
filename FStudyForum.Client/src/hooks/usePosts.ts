import { PostContext } from "@/contexts/PostContext";
import { useContext } from "react";

export const usePosts = () => {
     const context = useContext(PostContext);
     if (context === undefined) {
         throw new Error("usePosts must be used within a PostProvider");
     }
     return context;
 };