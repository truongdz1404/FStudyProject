import { FC, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import AuthGuard from "@/helpers/guards/AuthGuard";
import NotFound from "@/components/NotFound";
import Layout from "@/components/layout/Layout";
import TopicGuard from "./helpers/guards/TopicGuard";
import WelcomeGuard from "@/helpers/guards/WelcomeGuard";
import AuthLayout from "@/components/layout/AuthLayout";
import RoleBasedGuard from "@/helpers/guards/RoleBasedGuard";
import Donate from "./pages/donate";
import Notification from "./pages/donate/notification";
import SavePost from "./pages/user/saved";
import { ROLE } from "@/helpers/constants";
import Loadable from "./helpers/loading/Loadable";
import { SignalRProvider } from "./contexts/signalR/SignalRContext";
import Cookies from "js-cookie";


const QRCode = Loadable(lazy(() => import("./pages/donate/qrcode")));
const Popular = Loadable(lazy(() => import("@/pages/popular")));
const Memebers = Loadable(lazy(() => import("@/pages/manager/members")));
const Welcome = Loadable(lazy(() => import("@/pages/welcome")));
const Register = Loadable(lazy(() => import("@/pages/auth/register")));
const ConfirmEmail = Loadable(lazy(() => import("@/pages/auth/confirm-email")));
const ChangePassword = Loadable(
  lazy(() => import("@/pages/auth/reset-password/change-password"))
);
const SubmitPage = Loadable(lazy(() => import("@/pages/submit")));
const Comments = Loadable(lazy(() => import("@/pages/topic/comments")));
const TopcicManager = Loadable(lazy(() => import("@/pages/manager/topics")));
const CategoryManager = Loadable(
  lazy(() => import("@/pages/manager/categories"))
);
const ResetPassword = Loadable(
  lazy(() => import("@/pages/auth/reset-password"))
);
const Profile = Loadable(lazy(() => import("@/pages/user")));
const ProfileSettings = Loadable(
  lazy(() => import("@/pages/settings/profile"))
);
const SignIn = Loadable(lazy(() => import("@/pages/auth/signin")));
const Home = Loadable(lazy(() => import("@/pages/home")));
const TopicDetail = Loadable(lazy(() => import("@/pages/topic")));
const Topics = Loadable(lazy(() => import("@/pages/topics")));
const UserPosts = Loadable(lazy(() => import("@/pages/user/posts")));
const UserOverview = Loadable(lazy(() => import("@/pages/user/overview")));

const SearchPage = Loadable(lazy(() => import("@/pages/search/posts")));
const SearchTopics = Loadable(lazy(() => import("@/pages/search/topics")));
const SearchComments = Loadable(lazy(() => import("@/pages/search/comments")));
const SearchPeople = Loadable(lazy(() => import("@/pages/search/people")));
const SignOut = Loadable(lazy(() => import("@/pages/auth/signout")));
const ListReport = Loadable(lazy(() => import("@/pages/manager/report/list")));
const Search = Loadable(lazy(() => import("@/pages/search")));

const Test = Loadable(lazy(() => import("@/pages/test")));
const Response = Loadable(
  lazy(() => import("@/pages/manager/report/response"))
);

const Router: FC = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <AuthGuard>
          <WelcomeGuard>
            <SignalRProvider hubName="notification-hub" accessTokenFactory={() => String(Cookies.get('FStudyForum-Access-Token'))}>
              <Layout />
            </SignalRProvider>
          </WelcomeGuard>
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/home" replace />
        },
        {
          path: "test",
          element: <Test />
        },
        {
          path: "home",
          element: <Home />
        },
        {
          path: "popular",
          element: <Popular />
        },
        {
          path: "topics",
          children: [
            {
              index: true,
              element: <Topics />
            }
          ]
        },
        {
          path: "donate",
          children: [
            {
              index: true,
              element: <Donate />
            },
            {
              path: "qrcode",
              element: <QRCode />
            },
            {
              path: "transaction",
              element: <Notification />
            }
          ]
        },
        {
          path: "manager",
          element: (
            <RoleBasedGuard accessibleRoles={[ROLE.Admin]}>
              <Outlet />
            </RoleBasedGuard>
          ),
          children: [
            {
              path: "members",
              element: <Memebers />
            },
            {
              path: "analytics",
              element: <>Analytics</>
            },
            {
              path: "topics",
              children: [
                {
                  index: true,
                  element: <TopcicManager />
                }
              ]
            },
            {
              path: "categories",
              children: [
                {
                  index: true,
                  element: <CategoryManager />
                }
              ]
            },
            {
              path: "report",
              element: <ListReport />
            },
            {
              path: "report/:reportId",
              element: <Response />
            }
          ]
        },
        {
          path: "topic/:name",
          element: (
            <TopicGuard>
              <Outlet />
            </TopicGuard>
          ),
          children: [
            {
              index: true,
              element: <TopicDetail />
            },
            {
              path: "submit",
              element: <SubmitPage />
            },
            {
              path: "comments/:id",
              children: [
                {
                  index: true,
                  element: <Comments />
                }
              ]
            }
          ]
        },
        {
          path: "user/:username",
          element: <Profile />,
          children: [
            {
              index: true,
              element: <UserOverview />
            },
            {
              path: "posts",
              element: <UserPosts />
            },
            {
              path: "saved",
              element: <SavePost />
            }
          ]
        },
        {
          path: "user/:username",
          children: [
            {
              path: "submit",
              element: <SubmitPage />
            },
            {
              path: "comments/:id",
              children: [
                {
                  index: true,
                  element: <Comments />
                }
              ]
            }
          ]
        },
        {
          path: "settings",
          children: [
            {
              path: "profile",
              element: <ProfileSettings />
            }
          ]
        },
        {
          path: "submit",
          element: <SubmitPage />
        },
        {
          path: "search",
          element: <Search />,
          children: [
            {
              path: "posts",
              element: <SearchPage />
            },
            {
              path: "topics",
              element: <SearchTopics />
            },
            {
              path: "comments",
              element: <SearchComments />
            },
            {
              path: "people",
              element: <SearchPeople />
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
          element: <Welcome />
        }
      ]
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        {
          path: "signin",
          element: <SignIn />
        },
        {
          path: "signout",
          element: <SignOut />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "reset-password",
          children: [
            {
              path: "change-password",
              element: <ChangePassword />
            },
            {
              index: true,
              element: <ResetPassword />
            }
          ]
        },
        {
          path: "confirm-email",
          element: <ConfirmEmail />
        }
      ]
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);
};

export default Router;
