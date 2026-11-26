export default function Loading() {
  return (
    <main aria-label="Loading page" className="min-h-[65vh] bg-mist py-20">
      <div className="wrap">
        <div className="h-4 w-28 animate-pulse rounded bg-ice" />
        <div className="mt-6 h-14 max-w-2xl animate-pulse rounded-xl bg-slate-200" />
        <div className="mt-4 h-6 max-w-xl animate-pulse rounded-lg bg-white" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white"
              key={item}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
