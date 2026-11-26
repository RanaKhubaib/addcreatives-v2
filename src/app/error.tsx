"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

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
      <div className="wrap text-center">
        <p className="eyebrow text-royal">Something went wrong</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-[-0.03em] text-ink">
          We couldn&rsquo;t load this page.
        </h1>
        <p className="mt-4 text-steel">
          Please try again. If it keeps happening, let us know.
        </p>
        <Button className="mt-7" onClick={reset}>
          Try again
        </Button>
      </div>
    </main>
  );
}
