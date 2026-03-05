export default function Loading() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-12 animate-pulse">
      {/* Title skeleton */}
      <div className="mb-8">
        <div className="h-7 w-48 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-72 bg-gray-100 rounded" />
      </div>

      {/* Card skeletons */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-5">
            <div className="h-36 bg-gray-100 rounded-lg mb-4" />
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-full bg-gray-100 rounded mb-1" />
            <div className="h-3 w-2/3 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
