import AuthProvider from "./contexts/auth/AuthContext";
import Router from "./router";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientID =
    "837834875365-39sja66gdi7rgd6mh8iih2it9sdcsaq2.apps.googleusercontent.com";
export default function App() {
    return (
        <GoogleOAuthProvider clientId={clientID}>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}
