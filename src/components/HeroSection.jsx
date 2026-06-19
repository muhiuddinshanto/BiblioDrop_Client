"use client";

import { Button } from "@heroui/react";
import { 
  FaMagnifyingGlass, 
  FaArrowRight, 
  FaBookOpen 
} from "react-icons/fa6";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-white flex items-center">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A2332_1px,transparent_1px),linear-gradient(to_bottom,#1A2332_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_60%,transparent_100%)] opacity-[0.03]" />

      <div className="relative mx-auto max-w-7xl w-full px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div 
          className="lg:col-span-7 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Glowing Badge */}
          <motion.div 
            variants={itemVariants}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#C5A059]/30 bg-gradient-to-r from-[#C5A059]/10 to-transparent px-5 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]"></span>
            </span>
            <p className="text-xs font-bold tracking-[3px] uppercase text-[#1A2332]">
              THE PREMIUM ARCHIVE
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-[#1A2332] leading-[1.05]"
          >
            Curation With <br />
            <span className="bg-gradient-to-r from-[#1A2332] via-[#C5A059] to-[#1A2332] bg-clip-text text-transparent">
              Scholarly Care.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600"
          >
            Access a world-class collection of literature, meticulously curated and delivered with the precision of a modern scholarly archive.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 w-full max-w-xl"
          >
            <form 
              onSubmit={(e) => e.preventDefault()} 
              className="group flex items-center gap-2 rounded-3xl border border-slate-200 bg-white/70 p-2 shadow-xl shadow-slate-200/60 backdrop-blur-xl transition-all duration-500 focus-within:border-[#C5A059] focus-within:shadow-2xl focus-within:shadow-[#C5A059]/10"
            >
              <div className="flex flex-1 items-center gap-4 px-6">
                <FaMagnifyingGlass className="text-2xl text-slate-400 group-focus-within:text-[#C5A059] transition-colors" />
                <input
                  type="text"
                  placeholder="Search your next masterpiece..."
                  className="w-full bg-transparent text-lg font-medium placeholder-slate-400 outline-none text-[#1A2332]"
                />
              </div>
              <Button
                type="submit"
                className="rounded-2xl bg-[#1A2332] hover:bg-black px-8 py-7 font-semibold text-white shadow-lg flex items-center gap-3 group-hover:pr-9 transition-all duration-300"
                endContent={
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                }
              >
                Explore
              </Button>
            </form>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 flex items-center gap-10"
          >
            <div>
              <p className="text-4xl font-black tracking-tighter text-[#1A2332]">12,400+</p>
              <p className="text-sm font-semibold text-slate-500 mt-1">ACTIVE READERS</p>
            </div>
            <div className="h-9 w-px bg-slate-200" />
            <div>
              <p className="text-4xl font-black tracking-tighter text-[#C5A059]">4.98</p>
              <p className="text-sm font-semibold text-slate-500 mt-1">AVERAGE RATING</p>
            </div>
          </motion.div>

        </motion.div>

        {/* Right Visual */}
        <div className="lg:col-span-5 relative flex justify-center">
          
          {/* Glow Circle */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 0.6 }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            className="absolute h-[420px] w-[420px] rounded-full bg-[#C5A059]/10 blur-[100px] -z-10"
          />

          {/* Main Book Image */}
          <motion.div 
            initial={{ opacity: 0, y: 60, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            whileHover={{ scale: 1.03, rotate: 2 }}
            className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-slate-100"
          >
            <img 
              className="w-full h-full object-cover transition-all duration-700"
              src="https://images.unsplash.com/photo-1513001900722-370f803f498d?q=80&w=800" 
              alt="Premium Library"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <p className="uppercase tracking-[2px] text-[#C5A059] text-xs font-bold">Just Added</p>
              <h3 className="text-2xl font-bold leading-tight mt-2">
                The Architecture of Literary Heritage
              </h3>
            </div>
          </motion.div>

          {/* Floating Mini Card */}
          <motion.div 
            initial={{ opacity: 0, x: -60, y: 40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-4 bg-white/90 backdrop-blur-2xl border border-white p-5 rounded-3xl shadow-2xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1A2332] text-[#C5A059]">
              <FaBookOpen className="text-3xl" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">THIS WEEK</p>
              <p className="font-bold text-[#1A2332] text-lg">1,240+ Handpicked Books</p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}