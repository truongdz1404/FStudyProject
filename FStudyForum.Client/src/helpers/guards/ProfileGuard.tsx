import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import ProfileService from "@/services/ProfileService";

const PROFILE_CREATE_PATH = "/profile/create";
const checkHadProfile = async (
  username: string,
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    await ProfileService.getProfileByUserName(username);
    setIsVerified(true);
  } catch (error: unknown) {
    setIsVerified(false);
  } finally {
    setIsLoading(false);
  }
};
const ProfileGuard: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user == null) return;
    checkHadProfile(user.userName, setIsVerified, setIsLoading);
  }, [user]);
  if (isLoading) return <Loading />;
  if (!isVerified) {
    return <Navigate to={PROFILE_CREATE_PATH} replace />;
  }

  return <>{children}</>;
};

export default ProfileGuard;
