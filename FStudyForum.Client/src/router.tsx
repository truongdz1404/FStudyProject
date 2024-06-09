import { FC, Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AuthGuard from "@/helpers/guards/AuthGuard";
import NotFound from "@/components/NotFound";
import Layout from "@/components/layout/Layout";
import ProfileGuard from "./helpers/guards/ProfileGuard";
import NoProfileGuard from "./helpers/guards/NoProfileGuard";
import SignInGuard from "./helpers/guards/signin/SignInGuard";

const CreateProfile = lazy(() => import("@/pages/profile/create"));
const EditProfile = lazy(() => import("@/pages/profile/edit"));
const Register = lazy(() => import("@/pages/auth/register"));
const ConfirmEmail = lazy(() => import("@/pages/auth/confirm-email"));
const ChangePassword = lazy(
  () => import("@/pages/reset-password/change-password")
);
const ConfirmResetEmail = lazy(
  () => import("@/pages/reset-password/confirm-reset-email")
);
const ResetPassword = lazy(() => import("@/pages/reset-password"));
const Profile = lazy(() => import("@/pages/profile"));
const SignIn = lazy(() => import("@/pages/auth/signin"));
const Home = lazy(() => import("@/pages/home"));
const TopicList = lazy(() => import("@/pages/topic"));
const SignOut = lazy(() => import("@/pages/auth/signout"));
const Router: FC = () => {
  return useRoutes([
    
    {
      
      path: "/",
      element: (
        <AuthGuard>
          <ProfileGuard>
            <Layout />
          </ProfileGuard>
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
          element: (
            <Suspense>
              <TopicList/>
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
      path: "/profile/create",
      element: (
        <AuthGuard>
          <NoProfileGuard>
            <Suspense>
              <CreateProfile />
            </Suspense>
          </NoProfileGuard>
        </AuthGuard>
      ),
    },

    {
      path: "auth",
      children: [
        {
          path: "signin",
          element: (
            <SignInGuard restricted={true}>
              <Suspense>
                <SignIn />
              </Suspense>
            </SignInGuard>
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
      path: "reset-password",
      children: [
        {
          path: "change-password",
          element: (
            <Suspense>
              <ChangePassword />{" "}
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
