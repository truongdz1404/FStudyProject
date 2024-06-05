import { FC, Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AuthGuard from "@/helpers/guards/AuthGuard";
import Layout from "@/components/layout/Layout";
const SignIn = lazy(() => import("./pages/auth/signin"));
import NotFound from "./components/NotFound";
import EditProfile from "./pages/profile/edit";
import Profile from "./pages/profile";
const Home = lazy(() => import("@/pages/home"));
const SignOut = lazy(() => import("@/pages/auth/signout"));
const Router: FC = () => {
    return useRoutes([
        {
            path: "/",
            element: (
                <AuthGuard>
                    <Layout />
                </AuthGuard>
            ),
            children: [
                {                   
                    index: true,
                    element: <Navigate to="/home" replace />,
                },
                {
                    path: "home",
                    element: (
                        <Suspense>
                            <Home />
                        </Suspense>
                    ),
                },
                {
                    path: "posts",
                    element: <>Posts</>,
                },
                {
                    path: "topics",
                    element: <>Topics</>,
                },
                {
                    path: "profile",
                    children: [
                        {
                            index: true,
                            element: (
                              <Suspense>
                                  <Profile />
                              </Suspense>
                          ),
                        },
                        {
                            path: "edit",
                            element: (
                                <Suspense>
                                    <EditProfile />
                                </Suspense>
                            ),
                        },
                    ],
                },
            ],
        },
        {
            path: "auth",
            children: [
                {
                    path: "signin",
                    element: (
                        <Suspense>
                            <SignIn />
                        </Suspense>
                    ),
                },
                {
                    path: "signout",
                    element: (
                        <Suspense>
                            <SignOut />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: "*",
            element: <NotFound />,
        }, 
    ]);
};

export default Router;
