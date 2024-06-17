import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import BanUserService from "@/services/BanUserService";
import TopicService from "@/services/TopicService";

const BanUser: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [daysDiff, setDaysDiff] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const data = await TopicService.GetTopicByName(name ?? "");
          const isLocked = await BanUserService.isLoked(user.username, data.id);
          if (isLocked.data) {
            const unlockTimeResponse = await TopicService.unlockTime(
              user?.username ?? "",
              data.id
            );
            const unlockTimeDate = new Date(String(unlockTimeResponse.data));
            const now = new Date();
            if (now.getTime() >= unlockTimeDate.getTime()) {
              await TopicService.unlocked(user?.username ?? "", data.id);
              setLoading(false);
            } else {
              const timeDiff = unlockTimeDate.getTime() - now.getTime();
              const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
              setDaysDiff(daysDiff);
            }
          } else {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [name, user, navigate]);
  if (daysDiff > 0) {
   return <>Bạn cần {daysDiff} ngày để mở khóa</>
  }
  if(!loading)
  return <>{children}</>;
};
export default BanUser;
