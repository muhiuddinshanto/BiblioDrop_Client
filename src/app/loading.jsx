"use client";

import { motion } from "framer-motion";
import { TbBook2 } from "react-icons/tb";

export default function GlobalLoading() {
  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center bg-white dark:bg-slate-900 px-4 overflow-hidden">
      <div className="flex flex-col items-center max-w-xs text-center space-y-8">

        {/* ─── ANIMATED ICON ─── */}
        <div className="relative flex items-center justify-center w-24 h-24">

          {/* Outer Rotating Ring */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent border-t-[#C5A059] border-b-[#C5A059]"
            animate={{
              rotate: 360,
              borderRadius: ["24px", "40px", "24px"],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Inner Pulsing Circle */}
          <motion.div
            className="absolute w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center z-10 shadow-sm"
            animate={{ scale: [0.93, 1.05, 0.93] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Book Icon — library theme */}
            <motion.div
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <TbBook2 className="text-2xl text-[#C5A059]" />
            </motion.div>
          </motion.div>

          {/* 🎯 FIXED: Orbiting Particle — নিখুঁত উপবৃত্তাকার পথ */}
          <motion.div
            className="absolute w-2.5 h-2.5 rounded-full bg-[#C5A059] shadow-[0_0_8px_#C5A059] z-20"
            animate={{
              x: [0, 42, 0, -42, 0],
              y: [-42, 0, 42, 0, -42],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* ─── TEXT ─── */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Synchronizing
          </motion.p>
          <h2 className="text-lg font-black text-[#1A2332] dark:text-slate-100 tracking-tight">
            Curating your library
          </h2>
        </motion.div>

        {/* ─── PROGRESS BAR ─── */}
        <div className="w-40 h-[4px] bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative border border-slate-200 dark:border-slate-700">
          {/* 🎯 FIXED: ইনিশিয়াল পজিশন ও উইডথ ফিক্স করা হয়েছে */}
          <motion.div
            className="absolute top-0 h-full w-[40%] rounded-full bg-gradient-to-r from-[#1A2332] via-[#C5A059] to-[#1A2332] dark:from-slate-400 dark:via-[#C5A059] dark:to-slate-400"
            initial={{ left: "-40%" }}
            animate={{ left: ["-40%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

      </div>
    </div>
  );
}