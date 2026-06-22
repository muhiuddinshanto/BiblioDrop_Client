"use client";

import React from 'react';
import { MdOutlineToggleOn, MdOutlineToggleOff } from 'react-icons/md';

export default function StatusToggleButton({ status, onStatusToggle, isProcessing }) {
  const isPublished = status === "Available";
  const isPending = status === "Pending Approval";

  return (
    <button 
      disabled={isPending || isProcessing}
      onClick={onStatusToggle}
      className={`flex items-center justify-center gap-2 border rounded-lg py-2.5 text-xs font-bold transition shadow-sm
        ${isPending || isProcessing
          ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed shadow-none"
          : isPublished
            ? "bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-100"
            : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-100"
        }`}
      title={isPending ? "Cannot publish until approved by admin" : `Click to make ${isPublished ? 'Unpublished' : 'Published'}`}
    >
      {isPublished ? (
        <>
          <MdOutlineToggleOn className="text-xl text-rose-500" /> Unpublish
        </>
      ) : (
        <>
          <MdOutlineToggleOff className="text-xl text-emerald-500" /> {isPending ? "Pending" : "Publish"}
        </>
      )}
    </button>
  );
}
