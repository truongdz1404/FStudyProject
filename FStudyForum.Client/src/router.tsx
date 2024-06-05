import { FC, Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AuthGuard from "@/helpers/guards/AuthGuard";
// import Layout from "@/components/layout/Layout";
// import Home from "./pages/home";
// import Post from "./pages/post";
// import Topic from "./pages/topic";
// import UserProfile from "./pages/profile";
// import Profile from "./pages/profile";
// import NotFound from "./components/NotFound";

const SignIn = lazy(() => import("./pages/auth/signin"));
import NotFound from "./components/NotFound";
import Layout from "./components/layout/Layout";
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
                    // path: "/",
                    // element: <Layout />,
                    // children: [
                    //     {
                    //         index: true,
                    //         element: <Navigate to="/home" />,
                    //     },
                    //     {
                    //         path: "/home",
                    //         element: (
                    //             <AuthGuard>
                    //                 <Home />
                    //             </AuthGuard>
                    //         ),
                    //     },
                    //     {
                    //         path: "/posts",
                    //         element: (
                    //             <AuthGuard>
                    //                 <>Posts</>
                    //             </AuthGuard>
                    //         ),
                    //     },
                    //     {
                    //         path: "/topics",
                    //         element: (
                    //             <AuthGuard>
                    //                 <>Topics</>
                    //             </AuthGuard>
                    //         ),
                    //     },
                    //     {
                    //         path: "/post",
                    //         element: <Post />,
                    //     },
                    //     {
                    //         path: "/topic",
                    //         element: <Topic />,
                    //     },
                    // ],

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
                    element: (
                        <Suspense>
                            <Profile />{" "}
                        </Suspense>
                    ),
                    children: [
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
         }, //{
        //     path: "profile/edit",
        //     element: (
        //         <Suspense>
        //             <EditProfile />
        //         </Suspense>
        //     ),
        // }
    ]);
};

export default Router;
