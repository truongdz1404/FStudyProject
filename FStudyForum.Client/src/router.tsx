import { FC, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AuthGuard from "@/helpers/guards/AuthGuard";
import Layout from "@/components/layout/Layout";
import Home from "./pages/home";
import Post from "./pages/post";
import Topic from "./pages/topic";
import UserProfile from "./pages/profile";

const SignIn = lazy(() => import("./pages/auth/signin"));

const Router: FC = () => {
    return useRoutes([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Navigate to="/home" />,
                },
                {
                    path: "/home",
                    element: (
                        <AuthGuard>
                            <Home />
                        </AuthGuard>
                    ),
                },
                {
                    path: "/posts",
                    element: (
                        <AuthGuard>
                            <>Posts</>
                        </AuthGuard>
                    ),
                },
                {
                    path: "/topics",
                    element: (
                        <AuthGuard>
                            <>Topics</>
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
        {
            path: "/profile",
            element: (
                <AuthGuard>
                    <><UserProfile/></>
                </AuthGuard>
            ),
        },
    ]);
};

export default Router;
