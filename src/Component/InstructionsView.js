import React from "react";

const InstructionsView = ({ item, index, isOpen, onToggle }) => {
  return (
    <li className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
          isOpen ? "bg-red-50" : "hover:bg-slate-50"
        }`}
      >
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
            isOpen ? "bg-red-600 text-white" : "bg-slate-100 text-slate-600"
          }`}
        >
          {index + 1}
        </span>

        <span
          className={`font-semibold ${isOpen ? "text-red-700" : "text-slate-800"}`}
        >
          Step {index + 1}
        </span>

        <svg
          viewBox="0 0 24 24"
          className={`ml-auto h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="border-t border-slate-100 px-4 py-3 pl-14 text-sm leading-relaxed text-slate-600">
          {item}
        </div>
      )}
    </li>
  );
};

export default InstructionsView;
