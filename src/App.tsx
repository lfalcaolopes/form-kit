function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Tailwind Ready
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                Form Kit Playground
              </h1>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              v4
            </span>
          </div>
          <p className="mt-4 text-base text-slate-600">
            If this card looks styled, Tailwind is working. Start editing{' '}
            <span className="rounded bg-slate-100 px-2 py-1 font-mono text-sm text-slate-700">
              src/App.tsx
            </span>{' '}
            to build your form-kit demo.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tailwind
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900">
                Utilities
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Vite
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900">
                HMR Ready
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                React
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900">
                Typed
              </p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Looks Good
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
