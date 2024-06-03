import AuthProvider from "./contexts/auth/AuthContext";
import Router from "./router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <ToastContainer />
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
}
