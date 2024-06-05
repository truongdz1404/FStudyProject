import { cn } from "@/helpers/utils";
import { useAuth } from "@/hooks/useAuth";
import HomeService from "@/services/HomeService";
import React, { FC } from "react";

const Home: FC = () => {
  const [message, setMessage] = React.useState<string>("Dit me the gioi");
  const { user } = useAuth();

  React.useEffect(() => {
    const fetchMessage = async () => {
      setMessage(await HomeService.helloworld());
    };
    fetchMessage();
  }, []);
  return (
    <div className="h-[1000vh]">
      <h1 className={cn("text-black", "bg-yellow-200")}>
        {user?.userName + " : " + message}
      </h1>
    </div>
  );
};
export default Home;
