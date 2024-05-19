import { useAuth } from "@/hooks/useAuth";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
    const { isInitialized, isAuthenticated } = useAuth();

    if (!isInitialized) return <></>; //TODO: Handle Loading
    if (!isAuthenticated) {
        return <Navigate to="/auth/signin" replace />;
    }
    return <>{children}</>;
};
export default AuthGuard;
