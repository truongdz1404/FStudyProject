import { FC, PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const TopicGuard: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const { name: topicName } = useParams<{ name: string }>();
  console.log(user, topicName);
  return <>{children}</>;
};

export default TopicGuard;
