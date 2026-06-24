"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    FaGithub,
    FaLinkedinIn,
    FaXTwitter,
    FaEnvelope,
    FaArrowRight,
    FaBookOpen,
    FaCircleCheck,
} from 'react-icons/fa6';

const NAV = [
    {
        label: "Discover",
        links: [
            { name: "All Books", href: "/books" },
            { name: "Research", href: "/books?category=Science" },
            { name: "New Arrivals", href: "/books?sort=new" },
            { name: "Curators", href: "/librarians" },
        ],
    },
    {
        label: "Company",
        links: [
            { name: "About Us", href: "/about" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Contact", href: "/contact" },
        ],
    },
];

const SOCIALS = [
    { icon: FaGithub, href: "https://github.com", label: "GitHub" },
    { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaXTwitter, href: "https://x.com", label: "X / Twitter" },
];

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [focused, setFocused] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 4000);
    };

    return (
        <footer className="relative w-full overflow-hidden bg-slate-50 dark:bg-[#080d16] text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-none transition-colors duration-300">

            {/* Ambient glow — top */}
            <div
                aria-hidden
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px]"
                style={{
                    background: "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)",
                    opacity: 0.35,
                }}
            />

            {/* Radial glow behind logo */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-32 left-0 w-[500px] h-[400px] opacity-[0.06] dark:opacity-[0.04]"
                style={{
                    background: "radial-gradient(ellipse at 20% 0%, #D4AF37 0%, transparent 70%)",
                }}
            />

            <div className="relative mx-auto max-w-6xl px-6 lg:px-8 pt-16 pb-8">

                {/* ── Top Section ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-slate-200 dark:border-white/[0.05]">

                    {/* Brand */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                        className="lg:col-span-4 flex flex-col gap-5"
                    >
                        <Link
                            href="/"
                            className="flex items-center gap-2.5 w-fit group"
                        >
                            <div className="h-9 w-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#D4AF37]/20">
                                <FaBookOpen className="text-[#D4AF37] text-sm" />
                            </div>
                            <span className="text-slate-900 dark:text-white font-black text-xl tracking-tight font-sans">
                                Biblio<span className="text-[#D4AF37]">Drop</span>
                            </span>
                        </Link>

                        <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-500 max-w-[280px]">
                            A premium archival delivery network — bridging world-class literature with scholarly communities.
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-2 mt-1">
                            {SOCIALS.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={label}
                                    whileHover={{ y: -2, color: "#D4AF37" }}
                                    transition={{ duration: 0.18 }}
                                    className="h-8 w-8 rounded-lg border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.03] flex items-center justify-center text-slate-400 dark:text-slate-500 hover:border-[#D4AF37]/30 dark:hover:border-[#D4AF37]/30 transition-colors duration-200 text-sm shadow-sm dark:shadow-none"
                                >
                                    <Icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Nav columns */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-8">
                        {NAV.map(({ label, links }, colIdx) => (
                            <motion.div
                                key={label}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={colIdx + 1}
                                className="flex flex-col gap-4"
                            >
                                <h4 className="text-[10px] font-black uppercase tracking-[.2em] text-slate-800 dark:text-white/80">
                                    {label}
                                </h4>
                                <ul className="flex flex-col gap-2.5">
                                    {links.map(({ name, href }) => (
                                        <li key={name}>
                                            <Link
                                                href={href}
                                                className="text-[13px] font-medium text-slate-500 dark:text-slate-500 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors duration-200 flex items-center gap-1 group/link"
                                            >
                                                <span className="h-px w-0 bg-[#D4AF37] group-hover/link:w-3 transition-all duration-300 inline-block" />
                                                {name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Newsletter */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={3}
                        className="lg:col-span-4 flex flex-col gap-4"
                    >
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[.2em] text-slate-800 dark:text-white/80 mb-3">
                                The Chronicle
                            </h4>
                            <p className="text-[13px] text-slate-500 dark:text-slate-500 leading-relaxed">
                                New manuscript drops & curated arrivals — direct to your inbox.
                            </p>
                        </div>

                        <form onSubmit={handleSubscribe}>
                            <motion.div
                                animate={{
                                    borderColor: subscribed
                                        ? "rgba(34,197,94,0.4)"
                                        : focused
                                        ? "rgba(212,175,55,0.45)"
                                        : "transparent",
                                }}
                                transition={{ duration: 0.25 }}
                                className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] p-1.5 shadow-sm dark:shadow-none"
                            >
                                <div className="flex items-center gap-2 px-2.5 flex-1 min-w-0">
                                    <FaEnvelope className="text-slate-400 dark:text-slate-600 text-[11px] flex-shrink-0" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                        placeholder="your@email.com"
                                        required
                                        className="w-full bg-transparent text-[12.5px] font-medium text-slate-800 dark:text-white outline-none placeholder-slate-400 dark:placeholder-slate-700 truncate"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="flex-shrink-0 flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#c9a332] text-[#080d16] font-black text-[11px] tracking-[.06em] uppercase px-3.5 py-2 rounded-lg transition-colors duration-200"
                                >
                                    {subscribed ? (
                                        <>
                                            <FaCircleCheck className="text-[10px]" />
                                            Done
                                        </>
                                    ) : (
                                        <>
                                            Join
                                            <FaArrowRight className="text-[9px]" />
                                        </>
                                    )}
                                </motion.button>
                            </motion.div>
                        </form>

                        {/* Trust note */}
                        <p className="text-[11px] text-slate-400 dark:text-slate-700 font-medium">
                            No spam. Unsubscribe anytime.
                        </p>
                    </motion.div>

                </div>

                {/* ── Bottom bar ── */}
                <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[11px] font-medium text-slate-400 dark:text-slate-700 tracking-wide">
                        &copy; {currentYear} BiblioDrop Inc. — Built with scholarly care.
                    </p>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-700">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        All systems operational
                    </div>
                </div>

            </div>
        </footer>
    );
}