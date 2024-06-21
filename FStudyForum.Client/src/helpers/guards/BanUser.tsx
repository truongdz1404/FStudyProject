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
  const [daysDiff, setDaysDiff] = useState(0);
  const [error, setError] = React.useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          let data;
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
                const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                setDaysDiff(daysDiff);
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
  if (daysDiff > 0) {
    return <Alert color="red">Bạn cần {daysDiff} giờ để mở khóa</Alert>;
  }
  if (!loading) return <>{children}</>;
};
export default BanUser;
