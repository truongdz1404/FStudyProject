import { createContext, FC, useRef } from "react";
import Panel from "./Panel";
import { useSize } from "@/hooks/useSize";

type Props = {
  pannel?: React.ReactNode;
  children: React.ReactNode;
};

interface ContextType {
  width: number;
  height: number;
}

export const ContentContext = createContext<ContextType>({
  width: 0,
  height: 0
});

const ContentLayout: FC<Props> = ({ pannel, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);

  return (
    <div className="w-full flex">
      <ContentContext.Provider value={size}>
        <div ref={ref} className="flex-1 w-full">
          {children}
        </div>
      </ContentContext.Provider>
      {pannel && (
        <div className="hidden xl:block max-h-[calc(100vh-4rem)] sticky top-12 bottom-0 w-[20rem] -mr-[20rem]">
          <Panel>{pannel}</Panel>
        </div>
      )}
    </div>
  );
};

export default ContentLayout;
