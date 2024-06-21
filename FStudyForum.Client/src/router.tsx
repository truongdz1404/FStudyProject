import { FC, Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

import AuthGuard from "@/helpers/guards/AuthGuard";
import NotFound from "@/components/NotFound";
import Layout from "@/components/layout/Layout";
import BanUser from "./helpers/guards/BanUser";
import WelcomeGuard from "@/helpers/guards/WelcomeGuard";
import AuthLayout from "@/components/layout/AuthLayout";
import RoleBasedGuard from "@/helpers/guards/RoleBasedGuard";
import { Role } from "@/helpers/constants";
import Donate from "./pages/donate";
import Payment from "./pages/donate/payment";
import Notification from "./pages/donate/notification";
import PostDetail from "./pages/post/detail";

const Popular = lazy(() => import("@/pages/popular"));
const Memebers = lazy(() => import("@/pages/manager/members"));
const Welcome = lazy(() => import("@/pages/welcome"));
const Register = lazy(() => import("@/pages/auth/register"));
const ConfirmEmail = lazy(() => import("@/pages/auth/confirm-email"));
const ChangePassword = lazy(
  () => import("@/pages/auth/reset-password/change-password")
);

const SubmitPage = lazy(() => import("@/pages/submit"));
const TopcicManager = lazy(() => import("@/pages/manager/topics"));
const ResetPassword = lazy(() => import("@/pages/auth/reset-password"));
const Profile = lazy(() => import("@/pages/profile"));
const ProfileSettings = lazy(() => import("@/pages/settings/profile"));
const SignIn = lazy(() => import("@/pages/auth/signin"));
const Home = lazy(() => import("@/pages/home"));
const TopicDetail = lazy(() => import("@/pages/topic"));
const Topics = lazy(() => import("@/pages/topics"));
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
          element: <Navigate to="/home" replace />
        },
        {
          path: "home",
          element: (
            <Suspense>
              <Home />
            </Suspense>
          )
        },
        {
          path: "popular",
          element: (
            <Suspense>
              <Popular />
            </Suspense>
          )
        },
        {
          path: "topics",
          children: [
            {
              index: true,
              element: (
                <Suspense>
                  <Topics />
                </Suspense>
              )
            }
          ]
        }, {
          path: "donate",
          children: [
            {
              index: true,
              element: (
                <Suspense>
                  <Donate />
                </Suspense>
              )
            }, {
              path: "payment",
              element: (
                <Suspense>
                  <Payment />
                </Suspense>
              )
            }, {
              path:"success",
              element: (
                <Suspense>
                  <Notification />
                </Suspense>
              )
            }
          ]
        },
        {
          path: "manager",
          element: (
            <RoleBasedGuard accessibleRoles={[Role.Admin]}>
              <Outlet />
            </RoleBasedGuard>
          ),
          children: [
            {
              path: "members",
              element: (
                <Suspense>
                  <Memebers />
                </Suspense>
              )
            },
            {
              path: "analytics",
              element: (
                <Suspense>
                  <>Analytics</>
                </Suspense>
              )
            },
            {
              path: "topics",
              children: [
                {
                  index: true,
                  element: (
                    <Suspense>
                      <TopcicManager />
                    </Suspense>
                  )
                }
              ]
            }
          ]
        },
        {
          path: "topic/:name",
          children: [
            {
              index: true,
              element: (
                <Suspense>
                   <BanUser>
                  <TopicDetail />
                  </BanUser>
                </Suspense>
              )
            },
            {
              path: "submit",
              element: (
                <Suspense>
                  <>Topic submit</>
                </Suspense>
              )
            }
          ]
        },
        {
          path: "profile/:name",
          element: (
            <Suspense>
              <Profile />
            </Suspense>
          )
        },
        {
          path: "settings",
          children: [
            {
              path: "profile",
              element: (
                <Suspense>
                  <ProfileSettings />
                </Suspense>
              )
            }
          ]
        },
        {
          path: "submit",
          element: (
            <Suspense>
              <SubmitPage />
            </Suspense>
          )
        }
      ]
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
          )
        }
      ]
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
          )
        },
        {
          path: "signout",
          element: (
            <Suspense>
              <SignOut />
            </Suspense>
          )
        },
        {
          path: "register",
          element: (
            <Suspense>
              <Register />
            </Suspense>
          )
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
              )
            },
            {
              index: true,
              element: (
                <Suspense>
                  <ResetPassword />
                </Suspense>
              )
            }
          ]
        },
        {
          path: "confirm-email",
          element: (
            <Suspense>
              <ConfirmEmail />
            </Suspense>
          )
        }
      ]
    }, {
    path: "post/:id",
    element:(
      <Suspense>
        <BanUser>
        <PostDetail />
        </BanUser>       
      </Suspense>
    )
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);
};

export default Router;
