import React from "react";

// className="px-8 py-2 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-900  border-b-4 hover:cursor-pointer flex justify-center items-center gap-2"

export default function Button({ text, onClick, color, icon, disabled }) {
  if (color === "primary") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="px-8 py-2 bg-emerald-400 text-black rounded-lg border-2 border-gray-900  disabled:text-gray-500 disabled:bg-gray-200 disabled:border-gray-400 flex justify-center items-center gap-2"
      >
        {icon}
        {text}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-8 py-2 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-900   hover:cursor-pointer flex justify-center items-center gap-2"
    >
      {icon}
      {text}
    </button>
  );
}
