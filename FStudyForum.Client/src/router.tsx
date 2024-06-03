import { FC, Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AuthGuard from "@/helpers/guards/AuthGuard";
import NotFound from "./components/NotFound";
import Layout from "./components/layout/Layout";

const Profile = lazy(() => import("./pages/profile"));
const SignIn = lazy(() => import("./pages/auth/signin"));
const Home = lazy(() => import("@/pages/home"));

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
          element: (
            <Suspense>
              <Profile />
            </Suspense>
          ),
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
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};

export default Router;
