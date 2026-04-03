import React from "react";

function Shimmer() {
  return (
    <div className="grid grid-cols-5 gap-3 px-2">
      {Array(10).fill("").map((_, index) => (
        <div
          key={index}
          className="flex flex-col p-2 border rounded w-55 h-[420px] animate-pulse"
        >
          {/* Image */}
          <div className="bg-gray-200 rounded w-full h-40"></div>

          {/* Content */}
          <div className="flex flex-col flex-1 mt-2">
            <div className="bg-gray-200 h-5 w-3/4 rounded mt-2"></div>

            <div className="bg-gray-200 h-4 w-24 rounded mt-3 mx-auto"></div>

            <div className="mt-1 space-y-1">
              <div className="bg-gray-200 h-3 w-full rounded"></div>
              <div className="bg-gray-200 h-3 w-11/12 rounded"></div>
              <div className="bg-gray-200 h-3 w-10/12 rounded"></div>
            </div>

            <div className="flex justify-between mt-auto mb-2 pt-3">
              <div className="bg-gray-200 h-4 w-16 rounded"></div>
              <div className="bg-gray-200 h-4 w-12 rounded"></div>
            </div>

            <div className="flex gap-4 mt-auto">
              <div className="bg-gray-200 h-8 w-full rounded"></div>
              <div className="bg-gray-200 h-8 w-full rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Shimmer;