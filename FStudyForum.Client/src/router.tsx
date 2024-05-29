import { FC, lazy } from "react";
import { useRoutes } from "react-router-dom";
import AuthGuard from "@/helpers/guards/AuthGuard";
import RoleBasedGuard from "@/helpers/guards/RoleBasedGuard";
import { Role } from "./helpers/constants";

const SignIn = lazy(() => import("./pages/auth/signin"));
const Home = lazy(() => import("./pages/home"));
const Profile = lazy(() => import("./pages/profile"));

const Router: FC = () => {
    return useRoutes([
        {
            path: "",
            element: <Navigate to="/home" />,
        },
        {
            path: "home",
            element: (
                <AuthGuard>
                    <RoleBasedGuard accessibleRoles={[Role.USER]}>
                        <Home />
                    </RoleBasedGuard>
                </AuthGuard>
            ),
        },
        {
            path: "auth",
            children: [
                {
                    path: "signin",
                    element: <SignIn />,
                },
                {
                    path: "register",
                    element: <SignIn />,
                },
            ],
        },
    ]);
};

export default Router;
