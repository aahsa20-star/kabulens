export default function StocksJapanLoading() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-4 w-40 bg-gray-200 rounded mb-6" />

      {/* Heading skeleton */}
      <div className="h-8 w-32 bg-gray-200 rounded mb-6" />

      {/* Tab skeleton */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-9 w-24 bg-gray-200 rounded-lg" />
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-100 bg-gray-50/50 px-4 py-3 flex gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded flex-1" />
          ))}
        </div>
        {/* Rows */}
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="border-b border-gray-50 px-4 py-3.5 flex gap-4">
            <div className="h-4 w-12 bg-gray-200 rounded" />
            <div className="h-4 flex-1 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-100 rounded-md" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
