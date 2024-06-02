import AuthProvider from "./contexts/auth/AuthContext";
import { CLIENT_ID } from "./helpers/constants";

import Router from "./router";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
    return (
        <>
            <GoogleOAuthProvider clientId={CLIENT_ID}>
                <AuthProvider>
                    <Router />
                </AuthProvider>
            </GoogleOAuthProvider>
            
        </>
    );
}
