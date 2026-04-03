import React from "react";

const InstructionsView = ({ item, index, isOpen, onToggle }) => {
  return (
    <li
      className="list-none mb-2 cursor-pointer"
      onClick={onToggle}
    >
      {/* Header */}
      <div
        className={`flex items-center gap-2 font-semibold p-2 rounded-lg
        ${isOpen ? "bg-amber-400" : "bg-amber-200"}`}
      >
        <span className="w-6 h-6 rounded-full bg-white text-amber-600 flex items-center justify-center text-xs font-bold">
          {index + 1}
        </span>

        Step {index + 1}

        <span className="ml-auto">
          {isOpen ? "▲" : "▼"}
        </span>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="mt-1 p-3 bg-white rounded text-sm border-l-4 border-amber-400">
          {item}
        </div>
      )}
    </li>
  );
};

export default InstructionsView;