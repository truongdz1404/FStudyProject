import { FC, Suspense, lazy } from "react"
import { Navigate, Outlet, useRoutes } from "react-router-dom"

import AuthGuard from "@/helpers/guards/AuthGuard"
import NotFound from "@/components/NotFound"
import Layout from "@/components/layout/Layout"
import WelcomeGuard from "./helpers/guards/WelcomeGuard"
import AuthLayout from "./components/layout/AuthLayout"
import RoleBasedGuard from "./helpers/guards/RoleBasedGuard"
import { Role } from "./helpers/constants"
import { PostProvider } from "./contexts/PostContext"

const Popular = lazy(() => import("@/pages/popular"))
const Memebers = lazy(() => import("@/pages/manager/members"))
const Welcome = lazy(() => import("@/pages/welcome"))
const Register = lazy(() => import("@/pages/auth/register"))
const ConfirmEmail = lazy(() => import("@/pages/auth/confirm-email"))
const ChangePassword = lazy(
  () => import("@/pages/auth/reset-password/change-password")
)
const TopcicManager = lazy(() => import("@/pages/manager/topics"))
const ResetPassword = lazy(() => import("@/pages/auth/reset-password"))
const Profile = lazy(() => import("@/pages/profile"))
const EditProfile = lazy(() => import("@/pages/profile/edit"))
const SignIn = lazy(() => import("@/pages/auth/signin"))
const Home = lazy(() => import("@/pages/home"))
const TopicDetail = lazy(() => import("@/pages/topic/detail"))
const Topic = lazy(() => import("@/pages/topic"))
const SignOut = lazy(() => import("@/pages/auth/signout"))
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
            <PostProvider>
              <Suspense>
                <Home />
              </Suspense>
            </PostProvider>
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
          element: (
            <Suspense>
              <Topic />
            </Suspense>
          )
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
              element: (
                <Suspense>
                  <TopcicManager />
                </Suspense>
              )
            }
          ]
        },
        {
          path: "topic/detail/:id",
          element: (
            <Suspense>
              <TopicDetail />
            </Suspense>
          )
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
              )
            },
            {
              path: "edit",
              element: (
                <Suspense>
                  <EditProfile />
                </Suspense>
              )
            }
          ]
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
    },

    {
      path: "*",
      element: <NotFound />
    }
  ])
}

export default Router
