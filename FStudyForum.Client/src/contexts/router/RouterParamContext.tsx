import TopicService from "@/services/TopicService";
import { Topic } from "@/types/topic";
import { AxiosError } from "axios";
import React, { FC, PropsWithChildren } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Response } from "@/types/response";

interface RouterParamType {
  topic: Topic | null;
  error: string;
}
export const RouterParamContext = React.createContext<RouterParamType>({
  topic: null,
  error: ""
});

const RouterParamProvider: FC<PropsWithChildren> = ({ children }) => {
  const { name } = useParams<{ name: string }>();
  const [topic, setTopic] = React.useState<Topic | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setTopic(null);
    if (!name) return;
    const fetchTopic = async () => {
      try {
        const topic = await TopicService.getTopicByName(name);
        setTopic(topic);
      } catch (e) {
        const error = e as AxiosError;
        setError((error?.response?.data as Response)?.message || error.message);
      }
    };
    fetchTopic();
  }, [name]);

  if (error) return <Navigate to={"not-found"} />;

  return (
    <RouterParamContext.Provider value={{ topic, error }}>
      {children}
    </RouterParamContext.Provider>
  );
};

export default RouterParamProvider;
