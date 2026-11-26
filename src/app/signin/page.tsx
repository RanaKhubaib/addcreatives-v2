import type { Metadata } from "next";
import { AuthForm } from "@/components/site/auth-form";
import { AuthProvider } from "@/components/site/auth-provider";

export const metadata: Metadata = {
  title: "Sign in | ADD Creatives",
  description: "Sign in to your ADD Creatives account.",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <AuthProvider>
      <AuthForm mode="signin" />
    </AuthProvider>
  );
}
