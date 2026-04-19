export default function ProfileSkeleton() {
  return (
    <div className="animate-fade-in">
      {/* Avatar + upload button skeleton */}
      <div className="flex items-center gap-4 mb-7">
        <div className="skeleton w-[72px] h-[72px] rounded-full flex-shrink-0" />
        <div className="flex flex-col gap-2">
          <div className="skeleton h-8 w-36 rounded-lg" />
          <div className="skeleton h-3.5 w-28 rounded" />
        </div>
      </div>

      {/* Fields skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="skeleton h-3.5 w-20 rounded" />
            <div className="skeleton h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>

      {/* Address skeleton */}
      <div className="flex flex-col gap-2 mb-7">
        <div className="skeleton h-3.5 w-16 rounded" />
        <div className="skeleton h-20 w-full rounded-lg" />
      </div>

      {/* Button skeleton */}
      <div className="skeleton h-10 w-32 rounded-lg" />
    </div>
  );
}
