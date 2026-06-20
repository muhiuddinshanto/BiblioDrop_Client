"use client";

import React from "react";

export default function ApprovalRow({ title, author, librarian, onApprove, onDelete }) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="p-4 font-bold text-[#040d1b] text-sm">{title}</td>
      <td className="p-4 text-sm text-[#45474c]">{author}</td>
      <td className="p-4 text-sm text-[#45474c]">{librarian}</td>
      <td className="p-4 text-right space-x-2">
        <button 
          onClick={onApprove}
          className="px-3 py-1.5 bg-[#040d1b] hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-colors"
        >
          Approve & Publish
        </button>
        <button 
          onClick={onDelete}
          className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50 transition-colors"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}