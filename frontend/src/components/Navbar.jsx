import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight text-white">
          Real Time <span className="text-indigo-400">Language Translator</span>
        </Link>
        <nav className="flex items-center gap-5 md:gap-8">
          <Link
            to={{ pathname: "/", hash: "features" }}
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Features
          </Link>
          <Link
            to={{ pathname: "/", hash: "how" }}
            className="text-sm text-slate-400 transition hover:text-white"
          >
            How it works
          </Link>
          <NavLink
            to="/translator"
            className={({ isActive }) =>
              [
                "rounded-full px-4 py-2 text-sm font-medium transition shadow-lg",
                isActive
                  ? "bg-indigo-400 text-slate-950 shadow-indigo-500/30"
                  : "bg-indigo-500 text-white shadow-indigo-500/25 hover:bg-indigo-400"
              ].join(" ")
            }
          >
            Translator
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
