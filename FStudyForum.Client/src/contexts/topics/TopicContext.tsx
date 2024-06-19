import { PropsWithChildren, createContext, useState } from "react";

type TopicContextType = {
     topics: number | null;
     setTopics: React.Dispatch<React.SetStateAction<number | null>>;
};

export const TopicContext = createContext<TopicContextType | undefined>(
     undefined
);

export const TopicProvider: React.FC<PropsWithChildren> = ({ children }) => {
     const [topics, setTopics] = useState<number | null>(null);
     return (
          <TopicContext.Provider value={{ topics, setTopics }}>
               {children}
          </TopicContext.Provider>
     );
}