"use client";

import { ArrowRight, LayoutDashboard, LogOut, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminManager } from "@/components/site/admin-manager";
import { useAuth } from "@/components/site/auth-provider";
import { Container } from "@/components/ui/container";
import { firebaseConfigured } from "@/lib/firebase";

export default function AdminPage() {
  const router = useRouter();
  const { isAdmin, loading, logOut, user } = useAuth();

  useEffect(() => {
    if (!loading && firebaseConfigured && !user) router.replace("/signin");
  }, [loading, router, user]);

  async function handleSignOut() {
    try {
      await logOut();
      router.replace("/");
    } catch (error) {
      console.error("Could not sign out from admin:", error);
    }
  }

  if (!firebaseConfigured) {
    return (
      <main className="min-h-[65vh] bg-[#f7f9fd] py-16">
        <Container>
          <div className="mx-auto max-w-2xl rounded-[1.75rem] border border-amber-200 bg-amber-50 p-7">
            <ShieldCheck aria-hidden="true" className="text-amber-800" size={26} />
            <h1 className="mt-4 font-display text-2xl font-extrabold text-ink">
              Admin setup is not connected yet.
            </h1>
            <p className="mt-3 text-sm leading-6 text-amber-950">
              Add Firebase web settings to <code>.env.local</code>, enable
              Authentication and Firestore, and add your account email to{" "}
              <code>NEXT_PUBLIC_ADMIN_EMAILS</code>. Then assign{" "}
              <code>role: &quot;admin&quot;</code> to its user document in
              Firestore.
            </p>
          </div>
        </Container>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-[65vh] py-16">
        <Container>
          <p className="text-sm text-slate-500">Checking account access…</p>
        </Container>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-[65vh] py-16">
        <Container>
          <p className="text-sm text-slate-500">Redirecting to sign in…</p>
        </Container>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-[65vh] bg-[#f7f9fd] py-16">
        <Container>
          <div className="mx-auto max-w-xl rounded-[1.75rem] border border-slate-200 bg-white p-7">
            <ShieldCheck aria-hidden="true" className="text-brand-blue" size={26} />
            <h1 className="mt-4 font-display text-2xl font-extrabold text-ink">
              This account does not have admin access.
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Sign in with an email listed in <code>NEXT_PUBLIC_ADMIN_EMAILS</code>.
            </p>
            <button
              className="mt-5 text-sm font-bold text-brand-blue"
              onClick={() => void handleSignOut()}
              type="button"
            >
              Sign out
            </button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#f7f9fd] py-10 sm:py-14">
      <Container>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">
              <LayoutDashboard aria-hidden="true" size={15} /> Admin workspace
            </p>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink">
              Manage your website content.
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Signed in as {user.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700"
              href="/"
            >
              View website <ArrowRight aria-hidden="true" size={15} />
            </Link>
            <button
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700"
              onClick={() => void handleSignOut()}
              type="button"
            >
              <LogOut aria-hidden="true" size={15} /> Sign out
            </button>
          </div>
        </div>
        <AdminManager />
      </Container>
    </main>
  );
}
