import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <div className=" h-[1000vh]">
      <Outlet />
    </div>
  );
};

export default Content;
