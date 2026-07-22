export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6" aria-hidden="true">
      {/* summary tiles */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-stone-200/80 bg-white/60 p-3.5 shadow-sm"
          >
            <div className="h-4 w-24 animate-pulse rounded bg-stone-200" />
            <div className="mt-2 h-7 w-12 animate-pulse rounded bg-stone-200" />
          </div>
        ))}
      </div>

      {/* card grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex w-full flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="aspect-[16/9] w-full animate-pulse bg-stone-200" />
            <div className="flex flex-col gap-3 p-3.5">
              <div className="h-5 w-3/4 animate-pulse rounded bg-stone-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-stone-200" />
              <div className="mt-1 h-2 w-full animate-pulse rounded-full bg-stone-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
