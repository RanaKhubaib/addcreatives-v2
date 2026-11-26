"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Site page error:", error);
  }, [error]);

  return (
    <main className="grid min-h-[65vh] place-items-center py-20">
      <Container className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">
          Something went wrong
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.05em] text-ink">
          We couldn&apos;t load this page.
        </h1>
        <p className="mt-4 text-slate-600">
          Please try again. If it keeps happening, let us know.
        </p>
        <Button className="mt-7" onClick={reset}>
          Try again
        </Button>
      </Container>
    </main>
  );
}
