import UserService from "@/services/UserService";
import api from "@/services/api";
import axios, { AxiosError } from "axios";
import { Response } from "@/types/response";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
const SIGN_IN_PATH = "/auth/signin";
const PROFILE_CREATE_PATH = "/profile/create";

const handleError = (
    error: AxiosError,
    navigate: ReturnType<typeof useNavigate>
) => {
    if (axios.isAxiosError(error) && error.response?.status === 404){
        navigate(PROFILE_CREATE_PATH, {replace: true});
    }
    throw error;
};

const checkVerification = async (
    navigate: ReturnType<typeof useNavigate>,
    setIsVerified: React.Dispatch<React.SetStateAction<boolean>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const user = await UserService.getProfile();
        if (user != null) {
            const response = await api.get<Response>(
                `/profile/getProfileByUsername/${user.userName}`
            );
            const respStatus = Number(response.data.status);
            if (respStatus === 404) {
                setIsVerified(false);
            } else if (respStatus === 200) {
                setIsVerified(true);
            }
        } else {
            navigate(SIGN_IN_PATH, { replace: true });
        }
    } catch (error: unknown) {
        handleError(error as AxiosError, navigate);
    } finally {
        setIsLoading(false);
    }
};
const IsVerified: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        checkVerification(navigate, setIsVerified, setIsLoading);
    }, [ navigate]);
    if (isLoading) return <Loading />;
    if (!isVerified) {
        return <Navigate to={PROFILE_CREATE_PATH} replace />;
    }

    return <>{children}</>;
};

export default IsVerified;
