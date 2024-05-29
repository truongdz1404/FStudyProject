import { FC, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AuthGuard from "@/helpers/guards/AuthGuard";
import Layout from "@/components/layout/Layout";

const SignIn = lazy(() => import("./pages/auth/signin"));
const Home = lazy(() => import("./pages/home"));

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
