import { useAuth } from "@/hooks/useAuth";
import { FC, ReactNode } from "react";

export interface RoleBasedGuardProps {
    accessibleRoles: Array<string>;
    children: ReactNode;
}

const RoleBasedGuard: FC<RoleBasedGuardProps> = ({
    children,
    accessibleRoles,
}) => {
    const { user } = useAuth();
    const isRoleMatched =
        user?.roles.some((r) => accessibleRoles.includes(r)) ?? false;
    if (!isRoleMatched) return <>Not Permission</>; //TODO: Handle Not Permission
    return <>{children}</>;
};

export default RoleBasedGuard;
