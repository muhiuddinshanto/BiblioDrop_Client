"use client";

import { motion } from "framer-motion";
import { FaRegCompass } from "react-icons/fa6";

export default function GlobalLoading() {
  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center bg-white dark:bg-slate-900 px-4 overflow-hidden">
      <div className="flex flex-col items-center max-w-xs text-center space-y-8">
        
        {/* ─── 🌀 ANIMATED ICON CONTAINER ─── */}
        <div className="relative flex items-center justify-center w-24 h-24">
          
          {/* Outer Golden Geometric Ring */}
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-[#C5A059]/20 border-t-[#C5A059] border-b-[#C5A059]"
            animate={{ rotate: 360, borderRadius: ["24px", "40px", "24px"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Inner Navy Pulser */}
          <motion.div
            className="absolute w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm"
            animate={{ scale: [0.9, 1.05, 0.9] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Center Compass Rotating Gently */}
            <motion.div
              className="text-[#1A2332] dark:text-slate-100"
              animate={{ rotate: [0, -45, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaRegCompass className="text-2xl" />
            </motion.div>
          </motion.div>

          {/* Orbiting Ambient Particle */}
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_10px_#C5A059]"
            animate={{
              x: [0, 45, 0, -45, 0],
              y: [-45, 0, 45, 0, -45],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* ─── 📝 STAGGERED TEXT ANIMATION ─── */}
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
            Curating Literary Archive
          </h2>
        </motion.div>

        {/* ─── ⚡ PREMIUM PROGRESS BAR ─── */}
        <div className="w-40 h-[4px] bg-slate-100 rounded-full overflow-hidden relative border border-slate-50">
          <motion.div
            className="h-full bg-gradient-to-r from-[#1A2332] via-[#C5A059] to-[#1A2332]"
            initial={{ left: "-100%", width: "40%" }}
            animate={{ left: ["-100%", "100%"] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ position: "absolute", top: 0 }}
          />
        </div>

      </div>
    </div>
  );
}
