import AuthProvider from "./contexts/auth/AuthContext";
import { CLIENT_ID } from "./helpers/constants";
import { ToastContainer} from 'react-toastify';
import Router from "./router";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
    return (
        <>
        <ToastContainer />
            <GoogleOAuthProvider clientId={CLIENT_ID}>
                <AuthProvider>
                    <Router />
                </AuthProvider>
            </GoogleOAuthProvider>
            
        </>
    );
}
