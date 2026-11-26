import type { Metadata } from "next";
import { AuthForm } from "@/components/site/auth-form";

export const metadata: Metadata = {
  title: "Sign in | ADD Creatives",
  description: "Sign in to your ADD Creatives account.",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return <AuthForm mode="signin" />;
}
