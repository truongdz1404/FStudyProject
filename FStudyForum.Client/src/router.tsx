import { FC, Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AuthGuard from "@/helpers/guards/AuthGuard";
import NotFound from "@/components/NotFound";
import Layout from "@/components/layout/Layout";

const Register = lazy(() => import("@/pages/auth/register"));
const ConfirmEmail = lazy(() => import("@/pages/auth/confirm-email"));
const ChangePassword = lazy(() => import("@/pages/reset-password/change-password"));
const ConfirmResetEmail = lazy(() => import("@/pages/reset-password/confirm-reset-email"));
const ResetPassword = lazy(() => import("@/pages/reset-password"));
const Profile = lazy(() => import("@/pages/profile"));
const SignIn = lazy(() => import("@/pages/auth/signin"));
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
        {
          path: "register",
          element: (
            <Suspense>
              <Register />
            </Suspense>
          ),
        },
        {
          path: "confirm-email",
          element: (
            <Suspense>
              <ConfirmEmail />
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
      path: "reset-password",
      children: [
        {
          path: "change-password",
          element: <ChangePassword />,
        },
        {
          index: true,
          element: <ResetPassword />,
        },
        {
          path: "confirm-reset-email",
          element: (
            <Suspense>
              <ConfirmResetEmail />
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
