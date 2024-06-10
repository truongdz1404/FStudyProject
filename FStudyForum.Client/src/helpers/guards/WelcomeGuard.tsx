import React, { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import ProfileService from "@/services/ProfileService";
import { useAuth } from "@/hooks/useAuth";

const WelcomeGuard: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    if (user == null) return;
    const checkHadProfile = async () => {
      try {
        setIsLoading(true);
        await ProfileService.getByUsername(user.username);
      } catch (error) {
        navigate("/welcome");
      } finally {
        setIsLoading(false);
      }
    };
    checkHadProfile();
  }, [user, navigate]);

  if (isLoading) return <Loading />;

  return <>{children}</>;
};

export default WelcomeGuard;
