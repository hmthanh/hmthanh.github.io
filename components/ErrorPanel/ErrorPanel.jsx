import React from "react";

export default function ErrorPanel() {
  return (
    <div className="w-full h-full flex flex-wrap content-center justify-center">
      <div className="flex items-start space-x-4">
        <div className="relative mt-1 w-4 h-4 rounded-full bg-rose-400 text-white flex items-center justify-center ring-2 ring-rose-400 dark:bg-red-400 dark:ring-red-400">
          <svg
            width="6"
            height="6"
            className="overflow-visible"
            aria-hidden="true"
          >
            <path
              d="M0 0L6 6M6 0L0 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
        <p className="m-0 flex-1 text-base font-semibold text-slate-900 dark:text-slate-200">
          Error when loading data
        </p>
      </div>
    </div>
  );
}
