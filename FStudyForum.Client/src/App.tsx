import AuthProvider from "./contexts/auth/AuthContext";
import { ToastContainer } from "react-toastify";
import Router from "./router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingProvider from "./contexts/loading/LoadingContext";

const queryClient = new QueryClient();
export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <AuthProvider>
        <ToastContainer />
        <QueryClientProvider client={queryClient}>
          <LoadingProvider>
            <Router />
          </LoadingProvider>
        </QueryClientProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
