import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import ProfileService from "@/services/ProfileService";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
const NoProfileGuard: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    if (user == null) return;
    const checkProfile = async () => {
      let profile;
      try {
        profile = await ProfileService.getProfileByUserName(user.userName);
      } catch (error: unknown) {
        console.error(error);
      }
      setHasProfile(profile != null);
      setIsLoading(false);
    };
    checkProfile();
  }, [user]);

  if (isLoading) return <Loading />;
  if (hasProfile) return <Navigate to="/profile/edit" replace />;

  return <>{children}</>;
};

export default NoProfileGuard;
