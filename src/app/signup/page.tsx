import type { Metadata } from "next";
import { AuthForm } from "@/components/site/auth-form";
import { AuthProvider } from "@/components/site/auth-provider";

export const metadata: Metadata = {
  title: "Create an account | ADD Creatives",
  description: "Create an ADD Creatives account.",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <AuthProvider>
      <AuthForm mode="signup" />
    </AuthProvider>
  );
}
