export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-navy-900/60">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-teal-400/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-teal-400 animate-spin" />
      </div>
      <p className="text-sm tracking-wide">{label}</p>
    </div>
  );
}
