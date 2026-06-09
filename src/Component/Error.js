import { useRouteError } from "react-router";
import { Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const status = error?.status ?? "Oops";
  const statusText = error?.statusText || error?.message || "Something went wrong.";

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200 md:p-10">
        <p className="text-7xl font-extrabold tracking-tight text-red-600">{status}</p>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">{statusText}</h1>
        <p className="mt-3 text-sm text-gray-500">
          The page you're looking for couldn't be loaded. Let's get you back on track.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link
            to="/"
            className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Back to home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-red-300 hover:text-red-600"
          >
            Go back
          </button>
        </div>
      </div>
    </section>
  );
};

export default Error;
