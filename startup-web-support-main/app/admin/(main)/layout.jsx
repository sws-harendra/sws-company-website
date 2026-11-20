import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { AdminThemeProvider } from "./context/AdminThemeContext";
import AdminLayoutClient from "../components/AdminLayoutClient";
import WithRouteProtection from "../components/routePermissionChecker";

export const metadata = {
  title: "Software Development Company in Patna | Startup Web Support",
  description: "Software Development Company",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminMainLayout({ children }) {
  return (
    <AuthProvider>
      <AdminThemeProvider>
        <WithRouteProtection>
          <AdminLayoutClient>
            {children}
          </AdminLayoutClient>
        </WithRouteProtection>
      </AdminThemeProvider>
    </AuthProvider>
  );
}
