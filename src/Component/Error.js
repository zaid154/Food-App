import { useRouteError } from "react-router";
import { Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const status = error?.status ?? "Oops";
  const statusText = error?.statusText || error?.message || "Something went wrong.";

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-orange-50/60 via-white to-white px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200 md:p-10">
        <p className="text-7xl font-black tracking-tight text-orange-500">{status}</p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">{statusText}</h1>
        <p className="mt-3 text-sm text-slate-500">
          The page you're looking for couldn't be loaded. Let's get you back on track.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link
            to="/"
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-600"
          >
            Go back
          </button>
        </div>
      </div>
    </section>
  );
};

export default Error;
