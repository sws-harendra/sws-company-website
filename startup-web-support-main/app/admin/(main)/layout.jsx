import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import Sidebar from "../components/sidebar";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
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
  title: "Softwere Devlopment Company in Patna | Startup Web Support",
  description: "Softwere Devlopment Company",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <WithRouteProtection>
        {/* <ProtectedRoute> */}
        <div className={`h-screen overflow-y-hidden flex flex-col sm:flex-row`}>
          <div className="px-6 py-3">
            <Sidebar />
          </div>
          <main className="flex-1 px-1 py-3 overflow-x-auto">{children}</main>
        </div>
      </WithRouteProtection>
      {/* </ProtectedRoute> */}
    </AuthProvider>
  );
}
