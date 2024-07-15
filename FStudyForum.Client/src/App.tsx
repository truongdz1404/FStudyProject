import AuthProvider from "./contexts/auth/AuthContext";
import Router from "./router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomToast } from "./components/ui/toast/Toast";
import { NotificationProvider } from "./contexts/NotificationContext";

const queryClient = new QueryClient();
export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <AuthProvider>
          
            <NotificationProvider>
              <QueryClientProvider client={queryClient}>
                <Router />
              </QueryClientProvider>
              <CustomToast />
            </NotificationProvider>
          
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
