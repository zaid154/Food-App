import { useState } from "react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Recipes", value: "300+" },
  { label: "Cuisines", value: "25+" },
  { label: "Avg rating", value: "4.7" },
  { label: "Delivery time", value: "30 min" }
];

const About = () => {
  const [likes, setLikes] = useState(0);

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-red-600">
              About YumRun
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Real food, fast — straight to your door.
            </h1>
            <p className="mt-4 text-base leading-7 text-gray-600">
              YumRun is a small but mighty team of food lovers building a friendlier
              way to discover and order meals. We pick the best dishes from local
              kitchens, hand-curate every menu, and make sure your order arrives
              hot, fresh, and on time.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                  <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/"
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Browse menu
              </Link>
              <button
                onClick={() => setLikes((l) => l + 1)}
                className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              >
                ❤ Like ({likes})
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=70"
                alt="Plated meal"
                className="h-72 w-full object-cover md:h-96"
                loading="lazy"
              />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-600">
                  Our mission
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Make great food feel effortless — for every meal, for every budget.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            { title: "Quality first", body: "We taste-test every dish before it hits the menu." },
            { title: "Local kitchens", body: "We partner with neighborhood chefs you can trust." },
            { title: "Honest pricing", body: "No surprise fees. The price you see is the price you pay." }
          ].map((v) => (
            <div key={v.title} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <p className="text-base font-bold text-slate-900">{v.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
