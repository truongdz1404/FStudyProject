import { FC, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import AuthGuard from "@/helpers/guards/AuthGuard";
import Layout from "@/components/layout/Layout";


const SignIn = lazy(() => import("./pages/auth/signin"));
const Home = lazy(() => import("./pages/home"));
const Register = lazy(() => import("./pages/auth/register"));
const ConfirmationSent = lazy(() => import("./pages/auth/confirmEmail"));
const ChangePass = lazy(() => import("./pages/reset-password/change-pass"));
const SendMail = lazy(() => import("./pages/reset-password/send-mail"));
const Router: FC = () => {
    return useRoutes([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Navigate to="/home" />,
                },
                {
                    path: "/home",
                    element: (
                        <AuthGuard>
                            <Home />
                        </AuthGuard>
                    ),
                },
                {
                    path: "/posts",
                    element: (
                        <AuthGuard>
                            <>Posts</>
                        </AuthGuard>
                    ),
                },
                {
                    path: "/topics",
                    element: (
                        <AuthGuard>
                            <>Topics</>
                        </AuthGuard>
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
                    path: "send-mail",
                    element: <SendMail />,
                },
            ],
        },
    ]);
};

export default Router;
