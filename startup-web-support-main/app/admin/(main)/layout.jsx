import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { AdminThemeProvider } from "./context/AdminThemeContext";
import AdminLayoutClient from "../components/AdminLayoutClient";
import WithRouteProtection from "../components/routePermissionChecker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Software Development Company in Patna | Startup Web Support",
  description: "Software Development Company",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
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
