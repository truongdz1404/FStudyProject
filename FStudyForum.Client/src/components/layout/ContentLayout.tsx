import { FC } from "react";
import Panel from "../Panel";

type PageLayoutProps = {
  pannel?: React.ReactNode;
  children: React.ReactNode;
};

const ContentLayout: FC<PageLayoutProps> = ({ pannel, children }) => {
  return (
    <div className="w-full flex">
      <div className="flex-1">{children}</div>
      <div className="hidden xl:block overflow-auto max-h-screen sticky top-12 bottom-0 w-[20rem] -mr-[20rem]">
        <Panel>{pannel}</Panel>
      </div>
    </div>
  );
};

export default ContentLayout;
