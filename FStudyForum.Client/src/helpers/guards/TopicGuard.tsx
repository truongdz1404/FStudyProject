import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Alert } from "@material-tailwind/react";
import { AxiosError } from "axios";
import { Response } from "@/types/response";
import { checkIfTopicIsLocked } from "@/helpers/checkTopicLockedStatus";
import React from "react";

const TopicGuard: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [timeDiff, setTimeDiff] = useState("");
  const [error, setError] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log(name);
      try {
        if (user) {
          const { locked, timeDiffString } = await checkIfTopicIsLocked(
            user.username,
            `${name}`
          );
          if (locked) {
            setTimeDiff(timeDiffString);
          }
          setLoading(false);
        }
      } catch (e) {
        const error = e as AxiosError<Response>;
        setError((error?.response?.data as Response)?.message || error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [name, user, navigate]);

  if (error) {
    return <Alert color="red">{error}</Alert>;
  }
  if (timeDiff) {
    return <Alert color="red">You need {timeDiff} to unlock</Alert>;
  }

  if (!loading) return <>{children}</>;
  return null;
};

export default TopicGuard;
