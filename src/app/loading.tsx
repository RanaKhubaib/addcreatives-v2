import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <main aria-label="Loading page" className="min-h-[65vh] bg-[#f7f9fd] py-20">
      <Container>
        <div className="h-4 w-28 animate-pulse rounded bg-blue-100" />
        <div className="mt-6 h-14 max-w-2xl animate-pulse rounded-xl bg-slate-200" />
        <div className="mt-4 h-6 max-w-xl animate-pulse rounded-lg bg-slate-100" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              className="h-72 animate-pulse rounded-2xl border border-slate-100 bg-white"
              key={item}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}
