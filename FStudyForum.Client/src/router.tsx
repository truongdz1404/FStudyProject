import { FC, Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

import AuthGuard from "@/helpers/guards/AuthGuard";
import NotFound from "@/components/NotFound";
import Layout from "@/components/layout/Layout";
import WelcomeGuard from "./helpers/guards/WelcomeGuard";
import AuthLayout from "./components/layout/AuthLayout";

const Popular = lazy(() => import("@/pages/popular"));
const Memebers = lazy(() => import("@/pages/dashboard/members"));
const Welcome = lazy(() => import("@/pages/welcome"));
const Register = lazy(() => import("@/pages/auth/register"));
const ConfirmEmail = lazy(() => import("@/pages/auth/confirm-email"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const ChangePassword = lazy(
  () => import("@/pages/auth/reset-password/change-password")
);

const ResetPassword = lazy(() => import("@/pages/auth/reset-password"));
const Profile = lazy(() => import("@/pages/profile"));
const EditProfile = lazy(() => import("@/pages/profile/edit"));
const SignIn = lazy(() => import("@/pages/auth/signin"));
const Home = lazy(() => import("@/pages/home"));
const TopicDetail = lazy(() => import("@/pages/topic/detail"));
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
          path: "popular",
          element: (
            <Suspense>
              <Popular />
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
      path: "/",
      element: (
        <AuthGuard>
          <Outlet />
        </AuthGuard>
      ),
      children: [
        {
          path: "welcome",
          element: (
            <Suspense>
              <Welcome />
            </Suspense>
          ),
        },
        {
          path: "dashboard",
          children: [
            {
              index: true,
              element: (
                <Suspense>
                  <Dashboard />
                </Suspense>
              ),
            },
            {
              path: "members",
              element: (
                <Suspense>
                  <Memebers />
                </Suspense>
              ),
            },
          ],
        },
      ],
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
