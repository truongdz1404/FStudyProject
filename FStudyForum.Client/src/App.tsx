import AuthProvider from "./contexts/auth/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomToast } from "./components/ui/toast/Toast";
import MyRouterProvider from "./router";

const queryClient = new QueryClient();
export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <MyRouterProvider />
        </QueryClientProvider>
        <CustomToast />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
