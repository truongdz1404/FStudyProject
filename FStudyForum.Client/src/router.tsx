import { FC, Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AuthGuard from "@/helpers/guards/AuthGuard";

import NotFound from "@/components/NotFound";
import Layout from "@/components/layout/Layout";
import WelcomeGuard from "./helpers/guards/WelcomeGuard";
import AuthLayout from "./components/layout/AuthLayout";
import Post from "./pages/post";

const EditProfile = lazy(() => import("@/pages/profile/edit"));
const Welcome = lazy(() => import("@/pages/welcome"));
const Register = lazy(() => import("@/pages/auth/register"));
const ConfirmEmail = lazy(() => import("@/pages/auth/confirm-email"));
const TopicDetail = lazy(() => import("@/pages/topic/TopicDetail/TopicDetail"));
const ChangePassword = lazy(
  () => import("@/pages/auth/reset-password/change-password")
);

const ResetPassword = lazy(() => import("@/pages/auth/reset-password"));
const Profile = lazy(() => import("@/pages/profile"));
const SignIn = lazy(() => import("@/pages/auth/signin"));
const Home = lazy(() => import("@/pages/home"));
const Topic = lazy(() => import("@/pages/topic"));
const SignOut = lazy(() => import("@/pages/auth/signout"));
const Router: FC = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <AuthGuard>
          <WelcomeGuard>
            <Layout />
          </WelcomeGuard>
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
          element: (
            <Suspense>
              <Post />
            </Suspense>
          ),
        },
        {
          path: "topics",
          element: (
            <Suspense>
              <Topic />
            </Suspense>
          ),
        },
        {
          path: "topic/detail/:id",
          element: (
            <Suspense>
              <TopicDetail />
            </Suspense>
          ),
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
      path: "welcome",
      element: (
        <Suspense>
          <Welcome />
        </Suspense>
      ),
    },
    {
      path: "auth",
      element: <AuthLayout />,
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
        {
          path: "register",
          element: (
            <Suspense>
              <Register />
            </Suspense>
          ),
        },
        {
          path: "reset-password",
          children: [
            {
              path: "change-password",
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              ),
            },
            {
              index: true,
              element: (
                <Suspense>
                  <ResetPassword />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "confirm-email",
          element: (
            <Suspense>
              <ConfirmEmail />
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
