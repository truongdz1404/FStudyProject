import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import BanUserService from "@/services/BanUserService";
import TopicService from "@/services/TopicService";
import { Alert } from "@material-tailwind/react";
import { Topic } from "@/types/topic";
import { AxiosError } from "axios";
import { Response } from "@/types/response";
import React from "react";

const BanUser: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const { name } = useParams<{ name: string }>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [timeDiff, setTimeDiff] = useState("");
  const [error, setError] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          let data: Topic | undefined;
          if (id !== undefined) {
            data = (await TopicService.topicByPost(Number(id))) as Topic;
          }
          if (name !== undefined) {
            data = (await TopicService.getTopicByName(name ?? "")) as Topic;
          }
          if (data) {
            const isLocked = await BanUserService.isLoked(
              user.username,
              data.id
            );
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
                const secondsDiff = Math.floor(timeDiff / 1000);
                const hoursDiff = Math.floor(timeDiff / (1000 * 3600));
                const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
                const monthsDiff = Math.floor(daysDiff / 30);
                const yearsDiff = Math.floor(monthsDiff / 12);
                const minutesDiff = Math.floor(timeDiff / (1000 * 60));
                if (secondsDiff < 60) {
                  setTimeDiff(`${secondsDiff} giây`);
                } else if (minutesDiff < 60) {
                  setTimeDiff(`${minutesDiff} phút`);
                } else if (hoursDiff < 24) {
                  setTimeDiff(`${hoursDiff} giờ`);
                } else if (daysDiff < 30) {
                  setTimeDiff(`${daysDiff} ngày`);
                } else if (monthsDiff < 12) {
                  setTimeDiff(`${monthsDiff} tháng`);
                } else {
                  setTimeDiff(`${yearsDiff} năm`);
                }
              }
            } else {
              setLoading(false);
            }
          }
        }
      } catch (e) {
        const error = e as AxiosError<Response>;
        setError((error?.response?.data as Response)?.message || error.message);
      }
    };
    fetchData();
  }, [name, user, navigate]);

  if (error) {
    return <Alert color="red">{error}</Alert>;
  }
  if (timeDiff) {
    return <Alert color="red">Bạn cần {timeDiff} để mở khóa</Alert>;
  }

  if (!loading) return <>{children}</>;
  return null;
};

export default BanUser;
