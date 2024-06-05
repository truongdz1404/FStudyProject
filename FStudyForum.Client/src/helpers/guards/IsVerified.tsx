import UserService from "@/services/UserService"
import api from "@/services/api"
import { AxiosError } from "axios"
import { Response } from "@/types/response"
import { FC, PropsWithChildren, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import Loading from "@/components/Loading"

const IsVerified: FC<PropsWithChildren> = ({children}) => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkVerification = async () => {
      try {
        const user = await UserService.getProfile();
        if (user != null){
          console.log("Call api");
          const response = await api.get<Response>(`/profile/getProfileByUsername/${user.userName}`);
          const respStatus = Number(response.data.status);
          if (respStatus === 404){
            console.log("User is not verified");
            setIsVerified(false);
          }else if (respStatus === 200){
            console.log("User is verified");
            setIsVerified(true);
          }
        }else{
          console.log("User is null");
          navigate("/auth/signin");
        }
      } catch (error: unknown) {
        if (error && (error as AxiosError).isAxiosError) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response?.data) {
            const serverError = axiosError.response.data as Response;
            if (serverError.status === "404") {
              navigate("/profile/create");
            }
          }
        }
      }finally{
        setIsLoading(false);
      }
    }
    checkVerification();
  }, [children, navigate]);
  if (isLoading) return <Loading />;
  if (!isVerified) {
    return <Navigate to="/profile/create" replace/>;
  }

  return <>{children}</>;
}

export default IsVerified