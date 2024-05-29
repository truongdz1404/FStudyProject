import AuthProvider from "./contexts/auth/AuthContext";
import { CLIENT_ID } from "./helpers/constants";
import Router from "./router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

export default function App() {
    return (
        <>
            {/* <ToastContainer />
            <GoogleOAuthProvider clientId={CLIENT_ID}>
                <AuthProvider>
                   
                </AuthProvider>
            </GoogleOAuthProvider> */}
            <Router />
        </>
    );
}
