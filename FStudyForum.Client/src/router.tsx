import { FC, Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AuthGuard from "@/helpers/guards/AuthGuard";
import NotFound from "./components/NotFound";
import Layout from "./components/layout/Layout";


const Register = lazy(() => import("./pages/auth/register"));
const ConfirmationSent = lazy(() => import("./pages/auth/confirmEmail"));
const ChangePass = lazy(() => import("./pages/reset-password/change-pass"));
const SendMail = lazy(() => import("./pages/reset-password"));
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
          element: <SignIn />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "confirmation-sent",
          element: <ConfirmationSent />,
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
          path: "change-pass",
          element: <ChangePass />,
        },
        {
          index: true,
          element: <SendMail />,
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
