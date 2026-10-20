export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-brand-primary p-6">
      <div className="container mx-auto max-w-[1152px]">
        {/* Monogram Skeleton Pulsing */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-brand-glass-border bg-brand-elevated shadow-gold-subtle">
          <div className="h-10 w-10 skeleton-shimmer rounded-lg" />
        </div>

        {/* Headline Skeleton */}
        <div className="mx-auto mb-4 h-10 w-3/4 max-w-lg skeleton-shimmer rounded-md" />
        <div className="mx-auto mb-10 h-5 w-1/2 max-w-md skeleton-shimmer rounded-md" />

        {/* Bento Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="glass-card flex h-64 flex-col justify-between rounded-2xl p-6"
            >
              <div className="h-8 w-1/3 skeleton-shimmer rounded-md" />
              <div className="space-y-3">
                <div className="h-4 w-full skeleton-shimmer rounded-md" />
                <div className="h-4 w-5/6 skeleton-shimmer rounded-md" />
                <div className="h-4 w-2/3 skeleton-shimmer rounded-md" />
              </div>
              <div className="h-10 w-full skeleton-shimmer rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
