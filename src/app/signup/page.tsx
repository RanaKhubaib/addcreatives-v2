import type { Metadata } from "next";
import { AuthForm } from "@/components/site/auth-form";

export const metadata: Metadata = {
  title: "Create an account | ADD Creatives",
  description: "Create an ADD Creatives account.",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return <AuthForm mode="signup" />;
}
