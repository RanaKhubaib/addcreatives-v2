import type { Metadata } from "next";
import { AdminScreen } from "@/components/site/admin-screen";
import { AuthProvider } from "@/components/site/auth-provider";

export const metadata: Metadata = {
  title: "Admin | ADD Creatives",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminScreen />
    </AuthProvider>
  );
}
