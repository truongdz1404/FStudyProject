import React from "react";
import Content from "./Content";
import { Header } from "./Header";
import Sidebar from "./Sidebar";
import { cn } from "@/helpers/utils";
import { Drawer } from "@material-tailwind/react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  return (
    <div className="font-inter">
      <Header openSidebar={openSidebar} />
      <div className="flex">
        <div className={cn("fixed left-0 max-w-[18rem] hidden lg:block")}>
          <Sidebar />
        </div>
        <div className="lg:ml-[18rem] pt-2">
          <Content />
        </div>
      </div>

      <Drawer open={isSidebarOpen} onClose={closeSidebar}>
        <Sidebar />
      </Drawer>
    </div>
  );
};
export default Layout;
