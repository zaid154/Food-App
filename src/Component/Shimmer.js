import React from "react";

function Shimmer() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array(8).fill("").map((_, index) => (
        <div
          key={index}
          className="flex h-[360px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white animate-pulse"
        >
          <div className="h-44 w-full bg-slate-200" />
          <div className="flex flex-1 flex-col gap-2 p-4">
            <div className="h-4 w-3/4 rounded bg-slate-200" />
            <div className="mt-1 space-y-1.5">
              <div className="h-3 w-full rounded bg-slate-200" />
              <div className="h-3 w-11/12 rounded bg-slate-200" />
            </div>
            <div className="mt-2 flex justify-between">
              <div className="h-4 w-16 rounded bg-slate-200" />
              <div className="h-4 w-12 rounded bg-slate-200" />
            </div>
            <div className="mt-auto flex gap-2 pt-3">
              <div className="h-8 w-full rounded-lg bg-slate-200" />
              <div className="h-8 w-full rounded-lg bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Shimmer;
