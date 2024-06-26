import { LoadingContext } from "@/contexts/loading/LoadingContext";
import { useContext } from "react";

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context)
    throw new Error("Loading context must be inside LoadingProvide");
  return context;
};
