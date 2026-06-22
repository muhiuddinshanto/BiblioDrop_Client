export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-white px-6 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#D4AF37] dark:border-slate-800 dark:border-t-[#D4AF37]" />
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Loading BiblioDrop...</p>
      </div>
    </main>
  );
}
