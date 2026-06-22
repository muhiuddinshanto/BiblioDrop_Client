"use client";

import React from 'react';
import Link from 'next/link';
import { 
    FaGithub, 
    FaLinkedinIn, 
    FaXTwitter, 
    FaEnvelope, 
    FaArrowRight, 
    FaLayerGroup 
} from 'react-icons/fa6';

/**
 * =========================================================================
 * @COMPONENT: Footer (Clean & Professional Tech-Vibe)
 * =========================================================================
 * Features:
 * 1. Fully responsive multi-column grid layout using Tailwind CSS.
 * 2. Integrated Newsletter input with active states matching your color palette.
 * 3. Dynamic year rendering and modern typography.
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Subscribe logic here
    };

    return (
        <footer className="w-full bg-[#1A2332] text-slate-400 pt-16 pb-8 px-6 lg:px-8 border-t border-slate-800">
            <div className="mx-auto max-w-6xl">
                
                {/* 🎛️ Top Grid: Brand, Links & Newsletter */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
                    
                    {/* Column 1: Brand Info (4 Columns) */}
                    <div className="md:col-span-4 flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2 text-white font-black text-xl tracking-tight">
                            <div className="h-8 w-8 rounded-lg bg-[#C5A059] flex items-center justify-center text-[#1A2332]">
                                <FaLayerGroup className="text-sm" />
                            </div>
                            BiblioDrop<span className="text-[#C5A059]">.</span>
                        </Link>
                        <p className="text-xs leading-relaxed max-w-sm font-medium">
                            A premium decentralized archival delivery network. Bridging world-class literature with scholarly communities through secure local distribution.
                        </p>
                    </div>

                    {/* Column 2: Quick Navigation (2 Columns) */}
                    <div className="md:col-span-2 flex flex-col gap-3">
                        <h4 className="text-xs font-black tracking-widest uppercase text-white">Archive</h4>
                        <ul className="flex flex-col gap-2.5 text-xs font-semibold">
                            <li><Link href="/books" className="hover:text-[#C5A059] transition-colors">All Books</Link></li>
                            <li><Link href="/books?category=Science" className="hover:text-[#C5A059] transition-colors">Research</Link></li>
                            <li><Link href="/librarians" className="hover:text-[#C5A059] transition-colors">Our Curators</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Platform Links (2 Columns) */}
                    <div className="md:col-span-2 flex flex-col gap-3">
                        <h4 className="text-xs font-black tracking-widest uppercase text-white">Company</h4>
                        <ul className="flex flex-col gap-2.5 text-xs font-semibold">
                            <li><Link href="/about" className="hover:text-[#C5A059] transition-colors">About Us</Link></li>
                            <li><Link href="/terms" className="hover:text-[#C5A059] transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-[#C5A059] transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter Subscription (4 Columns) */}
                    <div className="md:col-span-4 flex flex-col gap-3">
                        <h4 className="text-xs font-black tracking-widest uppercase text-white">Join The Chronicle</h4>
                        <p className="text-xs font-medium">Get notified instantly about new manuscript drops and curated arrivals.</p>
                        
                        <form onSubmit={handleSubscribe} className="mt-2 flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl focus-within:border-[#C5A059] transition-colors">
                            <div className="flex items-center gap-2 pl-3 flex-1">
                                <FaEnvelope className="text-slate-500 text-sm" />
                                <input 
                                    type="email" 
                                    placeholder="Enter institutional email..." 
                                    className="w-full bg-transparent text-xs font-medium text-white outline-none placeholder-slate-600"
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="bg-[#C5A059] hover:bg-white text-[#1A2332] font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 group"
                            >
                                Subscribe <FaArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </form>
                    </div>

                </div>

                {/* 🔒 Bottom Grid: Copyright & Socials */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] font-semibold tracking-wide uppercase font-mono">
                        &copy; {currentYear} BiblioDrop Inc. All rights reserved. Built with Scholarly Care.
                    </p>
                    
                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#C5A059] hover:border-[#C5A059]/40 rounded-lg transition-all text-sm">
                            <FaGithub />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#C5A059] hover:border-[#C5A059]/40 rounded-lg transition-all text-sm">
                            <FaLinkedinIn />
                        </a>
                        <a href="https://x.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#C5A059] hover:border-[#C5A059]/40 rounded-lg transition-all text-sm">
                            <FaXTwitter />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}