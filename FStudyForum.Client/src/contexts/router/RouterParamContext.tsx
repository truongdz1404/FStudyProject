import TopicService from "@/services/TopicService";
import { Topic } from "@/types/topic";
import { AxiosError } from "axios";
import React, { FC, PropsWithChildren } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Response } from "@/types/response";
import { Profile } from "@/types/profile";
import ProfileService from "@/services/ProfileService";

interface RouterParamType {
  topic: Topic | null;
  user: Profile | null;
  error?: string;
}
export const RouterParamContext = React.createContext<RouterParamType>({
  topic: null,
  user: null
});

const RouterParamProvider: FC<PropsWithChildren> = ({ children }) => {
  const { name, username } = useParams<{ name: string; username: string }>();
  const [topic, setTopic] = React.useState<Topic | null>(null);
  const [user, setUser] = React.useState<Profile | null>(null);

  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setTopic(null);
    if (!name) return;
    const fetchTopic = async () => {
      try {
        const topic = await TopicService.getTopicByName(name);
        setTopic(topic);
      } catch (e) {
        setTopic(null);
        const error = e as AxiosError;
        setError((error?.response?.data as Response)?.message || error.message);
      }
    };
    fetchTopic();
  }, [name]);

  React.useEffect(() => {
    if (!username) return;
    const fetchUser = async () => {
      try {
        const user = await ProfileService.getByUsername(username!);
        setUser(user);
      } catch (e) {
        setUser(null);
        const error = e as AxiosError;
        setError((error?.response?.data as Response)?.message || error.message);
      }
    };
    fetchUser();
  }, [username]);

  if (error) return <Navigate to={"not-found"} />;

  return (
    <RouterParamContext.Provider value={{ topic, user, error }}>
      {children}
    </RouterParamContext.Provider>
  );
};

export default RouterParamProvider;
