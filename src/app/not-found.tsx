import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <main className="grid min-h-[65vh] place-items-center border-y border-slate-200 bg-white py-20">
      <Container className="text-center">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
          Page not found
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-[-0.05em] text-ink sm:text-6xl">
          Looks like this path took a different turn.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
          The page may have moved or the link may be out of date. Let&apos;s get
          you back on track.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">
            <ArrowLeft aria-hidden="true" size={16} /> Go home
          </Button>
          <Button href="/contact" variant="secondary">
            Get in touch <ArrowRight aria-hidden="true" size={16} />
          </Button>
        </div>
      </Container>
    </main>
  );
}
