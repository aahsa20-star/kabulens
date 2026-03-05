import { Suspense } from "react";
import SearchContent from "./SearchContent";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 py-6">
          <div className="skeleton h-12 max-w-2xl rounded-lg" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
