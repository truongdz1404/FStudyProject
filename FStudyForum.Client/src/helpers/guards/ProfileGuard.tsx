import Loading from "@/components/Loading";
import ProfileService from "@/services/ProfileService";
import { AxiosError } from "axios";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
const ProfileGuard: FC<PropsWithChildren> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasProfile, setHasProfile] = useState(false);

    useEffect(() => {
        const checkProfile = async () => {
            let profile;
            try {
                profile = await ProfileService.getProfileByUserName();
            } catch (error: unknown) {
                if (error && error instanceof AxiosError) {
                    toast.warning(error.message);
                }else{
                    toast.warning("An unexpected error occurred.");
                }
            }
            setHasProfile(profile != null);
            setIsLoading(false);
        };
        checkProfile();
    }, []);

    if (isLoading) return <Loading />;
    if (hasProfile) return <Navigate to="/" replace />;
    return <>{children}</>;
};

export default ProfileGuard;
