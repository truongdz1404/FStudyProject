import AuthProvider from "./contexts/auth/AuthContext";
import Router from "./router";

export default function App() {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
}
