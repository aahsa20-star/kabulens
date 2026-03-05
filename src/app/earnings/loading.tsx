export default function EarningsLoading() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12 animate-pulse">
      {/* Heading skeleton */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-6 w-6 bg-gray-200 rounded" />
          <div className="h-8 w-40 bg-gray-200 rounded" />
        </div>
        <div className="h-4 w-64 bg-gray-100 rounded" />
      </div>

      {/* Filter skeleton */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-32 bg-gray-200 rounded-lg" />
      </div>

      {/* This week section */}
      <div className="mb-8">
        <div className="h-5 w-36 bg-gray-200 rounded mb-4" />
        <div className="grid gap-3 sm:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-3">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <div className="h-4 w-12 bg-gray-200 rounded" />
                <div className="h-4 w-8 bg-gray-100 rounded" />
              </div>
              <div className="space-y-2">
                {[1, 2].map((j) => (
                  <div key={j} className="rounded-md p-2">
                    <div className="h-3 w-20 bg-gray-200 rounded mb-1" />
                    <div className="h-3 w-12 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next week section */}
      <div>
        <div className="h-5 w-36 bg-gray-200 rounded mb-4" />
        <div className="grid gap-3 sm:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-3">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <div className="h-4 w-12 bg-gray-200 rounded" />
              </div>
              <div className="space-y-2">
                <div className="rounded-md p-2">
                  <div className="h-3 w-20 bg-gray-200 rounded mb-1" />
                  <div className="h-3 w-12 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
