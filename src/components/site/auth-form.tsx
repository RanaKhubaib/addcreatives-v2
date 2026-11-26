"use client";

import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent, type ReactNode, type Ref } from "react";
import { useAuth } from "@/components/site/auth-provider";
import { firebaseConfigured } from "@/lib/firebase";

interface AuthFormProps {
  mode: "signin" | "signup";
}

function friendlyAuthError(error: unknown) {
  const code =
    error && typeof error === "object" && "code" in error
      ? String(error.code)
      : "";

  const messages: Record<string, string> = {
    "auth/email-already-in-use": "That email already has an account. Try signing in.",
    "auth/invalid-credential": "The email or password does not match an account.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/popup-closed-by-user": "The Google sign-in window was closed before finishing.",
    "auth/weak-password": "Choose a password with at least 6 characters.",
    "auth/user-disabled": "This account is currently disabled.",
    "auth/user-not-found": "We couldn't find an account with that email.",
    "auth/wrong-password": "The email or password does not match an account.",
  };

  if (error instanceof Error && error.message === "Authentication is not configured yet.") {
    return error.message;
  }
  return messages[code] ?? "We couldn't complete sign-in. Please try again.";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { resetPassword, signInWithEmail, signInWithGoogle, signUpWithEmail } =
    useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  const isSignup = mode === "signup";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const signedInUser = isSignup
        ? await signUpWithEmail(name, email, password)
        : await signInWithEmail(email, password);
      router.push(isAdminEmail(signedInUser.email) ? "/admin" : "/");
    } catch (error) {
      setErrorMessage(friendlyAuthError(error));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setSubmitting(true);
    setErrorMessage("");
    try {
      const signedInUser = await signInWithGoogle();
      router.push(isAdminEmail(signedInUser.email) ? "/admin" : "/");
    } catch (error) {
      setErrorMessage(friendlyAuthError(error));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResetPassword() {
    const email = (emailInputRef.current?.value ?? "").trim();
    if (!email) {
      setErrorMessage("Enter your email above, then choose reset password.");
      return;
    }

    try {
      await resetPassword(email);
      setErrorMessage("");
      setSuccessMessage("If an account exists for that email, a reset link is on its way.");
    } catch (error) {
      setErrorMessage(friendlyAuthError(error));
    }
  }

  return (
    <main className="grid min-h-[calc(100vh-76px)] bg-[#f7f9fd] lg:grid-cols-2">
      <section className="relative isolate hidden overflow-hidden bg-gradient-to-br from-[#0a1e39] via-navy to-[#4a6fb5] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div
          aria-hidden="true"
          className="absolute -right-36 -top-32 -z-10 h-[38rem] w-[38rem] rounded-full border border-white/15"
        />
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-12 -z-10 h-[28rem] w-[28rem] rounded-full border border-white/15"
        />
        <Link
          className="font-display text-xl font-extrabold tracking-[-0.06em]"
          href="/"
        >
          <span className="text-blue-200">ADD</span> CREATIVES
        </Link>
        <div className="relative max-w-xl">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <Sparkles aria-hidden="true" size={25} />
          </span>
          <h1 className="mt-7 font-display text-4xl font-extrabold leading-tight tracking-[-0.055em] xl:text-5xl">
            Good ideas grow when the right people work together.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-blue-100/75">
            Your ADD Creatives account gives you a place to manage projects and
            follow the work taking shape.
          </p>
        </div>
        <p className="text-xs text-blue-100/55">
          {isSignup ? "Create your account" : "Welcome back"}
          <span className="px-2">/</span>
          {isSignup ? "A clear next step starts here" : "Let's keep moving forward"}
        </p>
      </section>

      <section className="flex items-center justify-center px-5 py-12 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-brand-blue"
            href="/"
          >
            <ArrowLeft aria-hidden="true" size={16} /> Back to the website
          </Link>
          <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-45px_rgba(10,15,28,0.3)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">
              {isSignup ? "Create your account" : "Your account"}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink">
              {isSignup ? "Join ADD Creatives." : "Welcome back."}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {isSignup
                ? "Create an account to continue."
                : "Sign in with Google or your email and password."}
            </p>

            {!firebaseConfigured ? (
              <p
                className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"
                role="status"
              >
                Authentication is not configured yet. Add the Firebase web app
                values to <code>.env.local</code> to enable account access.
              </p>
            ) : null}

            <button
              className="mt-6 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-ink transition hover:bg-soft disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!firebaseConfigured || submitting}
              onClick={() => void handleGoogleSignIn()}
              type="button"
            >
              <GoogleMark />
              Continue with Google
            </button>

            <div className="my-6 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              or use email
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {isSignup ? (
                <AuthField
                  autoComplete="name"
                  icon={<Sparkles aria-hidden="true" size={17} />}
                  label="Full name"
                  name="name"
                  placeholder="Your name"
                  required
                />
              ) : null}
              <AuthField
                autoComplete="email"
                icon={<Mail aria-hidden="true" size={17} />}
                inputRef={emailInputRef}
                label="Email address"
                name="email"
                placeholder="you@company.com"
                required
                type="email"
              />
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink">
                  Password
                </span>
                <span className="relative block">
                  <LockKeyhole
                    aria-hidden="true"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={17}
                  />
                  <input
                    autoComplete={isSignup ? "new-password" : "current-password"}
                    className="min-h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-700 outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-blue-100"
                    minLength={6}
                    name="password"
                    required
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-ink"
                    onClick={() => setShowPassword((show) => !show)}
                    type="button"
                  >
                    {showPassword ? (
                      <EyeOff aria-hidden="true" size={17} />
                    ) : (
                      <Eye aria-hidden="true" size={17} />
                    )}
                  </button>
                </span>
              </label>

              {!isSignup ? (
                <button
                  className="text-xs font-bold text-brand-blue hover:underline"
                  onClick={() => void handleResetPassword()}
                  type="button"
                >
                  Forgot your password?
                </button>
              ) : null}

              {errorMessage ? (
                <p
                  aria-live="assertive"
                  className="rounded-xl bg-red-50 p-3 text-sm text-red-800"
                  role="alert"
                >
                  {errorMessage}
                </p>
              ) : null}
              {successMessage ? (
                <p
                  aria-live="polite"
                  className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800"
                  role="status"
                >
                  {successMessage}
                </p>
              ) : null}

              <button
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-bold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!firebaseConfigured || submitting}
                type="submit"
              >
                {submitting
                  ? "Please wait…"
                  : isSignup
                    ? "Create account"
                    : "Sign in"}
                {!submitting ? <ArrowRight aria-hidden="true" size={16} /> : null}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              {isSignup ? "Already have an account?" : "New to ADD Creatives?"}{" "}
              <Link
                className="font-bold text-brand-blue hover:underline"
                href={isSignup ? "/signin" : "/signup"}
              >
                {isSignup ? "Sign in" : "Create account"}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function isAdminEmail(email: string | null) {
  const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase());
  return Boolean(email && adminEmails.includes(email.toLowerCase()));
}

function AuthField({
  autoComplete,
  icon,
  inputRef,
  label,
  name,
  placeholder,
  required = false,
  type = "text",
}: {
  autoComplete: string;
  icon: ReactNode;
  inputRef?: Ref<HTMLInputElement>;
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      <span className="relative block">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          autoComplete={autoComplete}
          className="min-h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-brand-blue focus:ring-4 focus:ring-blue-100"
          name={name}
          placeholder={placeholder}
          ref={inputRef}
          required={required}
          type={type}
        />
      </span>
    </label>
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" height="18" viewBox="0 0 48 48" width="18">
      <path
        d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.1v5h6.6c3.9-3.6 6.1-8.8 6.1-14.8Z"
        fill="#4285F4"
      />
      <path
        d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5c-1.8 1.2-4.1 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z"
        fill="#34A853"
      />
      <path
        d="M12.6 27.7a12 12 0 0 1 0-7.4v-5.2H5.8a20 20 0 0 0 0 17.8l6.8-5.2Z"
        fill="#FBBC05"
      />
      <path
        d="M24 11.9c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.9 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.2c1.6-4.8 6.1-8.4 11.4-8.4Z"
        fill="#EA4335"
      />
    </svg>
  );
}
