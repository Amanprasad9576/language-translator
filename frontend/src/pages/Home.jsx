import { Link } from "react-router-dom";

const features = [
  {
    title: "Speak naturally",
    description:
      "Use your voice—no typing. Our app listens and understands what you say in your chosen source language.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>
    )
  },
  {
    title: "Instant translation",
    description:
      "Bridge any conversation with fast, accurate translation between dozens of languages powered by modern APIs.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-5m-5 5v-5"
        />
      </svg>
    )
  },
  {
    title: "Hear it back",
    description:
      "Translated text is turned into clear speech so you can listen, learn, or share in the target language.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
        />
      </svg>
    )
  }
];

const steps = [
  { n: "01", text: "Choose your source and target languages." },
  { n: "02", text: "Tap Start and speak clearly into your microphone." },
  { n: "03", text: "Listen to the translation and read the text on screen." }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-[600px] w-[600px] rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-8 md:pt-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-indigo-300">
              Real-time · Voice-first
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Your words,{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                any language
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
              Break language barriers in seconds. Speak naturally, get instant translation, and hear
              the result—perfect for travel, work, and everyday conversations.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/translator"
                className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-500/30 transition hover:from-indigo-400 hover:to-violet-500 sm:w-auto"
              >
                Start translating free
              </Link>
              <a
                href="#how"
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-600 bg-slate-900/50 px-8 py-4 text-base font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800/50 sm:w-auto"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Hero visual card */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="relative rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-1 shadow-2xl">
              <div className="rounded-xl bg-slate-900/80 p-6 md:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-medium text-emerald-400">Live preview</p>
                    <p className="mt-1 text-2xl font-semibold text-white">English → Hindi</p>
                    <p className="mt-2 text-slate-400">
                      “Hello, nice to meet you” → मुझे आपसे मिलकर खुशी हुई
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-3">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                      </svg>
                    </span>
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400">
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-slate-800/80 bg-slate-950/50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Why Real Time Language Translator</h2>
              <p className="mt-4 text-slate-400">
                Everything you need for quick, spoken translation—without juggling multiple apps.
              </p>
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 transition hover:border-indigo-500/40 hover:bg-slate-900/60"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
                    {f.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{f.title}</h3>
                  <p className="mt-3 text-slate-400 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">How it works</h2>
              <p className="mt-4 text-slate-400">Three steps. No learning curve.</p>
            </div>
            <ol className="mx-auto mt-14 grid max-w-3xl gap-6">
              {steps.map((s) => (
                <li
                  key={s.n}
                  className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-900/30 p-6 md:gap-6"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
                    {s.n}
                  </span>
                  <p className="pt-2 text-lg text-slate-200">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12 text-center">
              <Link
                to="/translator"
                className="inline-flex rounded-xl bg-emerald-500 px-8 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
              >
                Try it now
              </Link>
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="border-t border-slate-800 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-violet-950/80 py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">Ready to speak the world?</h2>
            <p className="mt-3 text-slate-400">
              Open the translator and pick your languages—it takes less than a minute.
            </p>
            <Link
              to="/translator"
              className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-xl transition hover:bg-slate-100"
            >
              Launch translator
            </Link>
          </div>
        </section>

        <footer className="border-t border-slate-800 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 md:flex-row">
            <span>
              © {new Date().getFullYear()} Real Time Language Translator
            </span>
            <Link to="/translator" className="text-indigo-400 hover:text-indigo-300">
              Go to app →
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
