import AuthProvider from "./contexts/auth/AuthContext";
import { ToastContainer} from 'react-toastify';
import Router from "./router";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
