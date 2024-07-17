import { ContentContext } from "@/components/layout/ContentLayout";
import { useContext } from "react";

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context)
    throw new Error("Content context must be inside content provider");
  return context;
};
