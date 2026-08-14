export default function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-navy-900/60 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-full border border-teal-400/40 text-teal-600 px-6 py-2 text-sm hover:bg-teal-400/10 transition"
        >
          Try again
        </button>
      )}
    </div>
  );
}
