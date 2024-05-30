import { FC, lazy } from "react";
import { useRoutes } from "react-router-dom";
import AuthGuard from "@/helpers/guards/AuthGuard";
import RoleBasedGuard from "./helpers/guards/RoleBasedGuard";
import { Role } from "./helpers/constants";
import LayOut from "./components/LayOut";
import Post from "./pages/post";
import Topic from "./pages/topic";
import Home from "./pages/home";
const SignIn = lazy(() => import("./pages/auth/signin"));

const Router: FC = () => {
    return useRoutes([
        {
            path: "",
            element: <LayOut />,
            children: [
                {
                    path: "/home",
                    element: (
                        <AuthGuard>
                            <RoleBasedGuard accessibleRoles={[Role.USER]}>
                                <Home />
                            </RoleBasedGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: "/post",
                    element: <Post />,
                },
                {
                    path: "/topic",
                    element: <Topic />,
                },
            ],
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
