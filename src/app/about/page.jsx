"use client";

import React from "react";
import Link from "next/link";
import { 
  MdAutoStories, 
  MdPeopleOutline, 
  MdOutlineWorkspacePremium, 
  MdArrowForward,
  MdMenuBook
} from "react-icons/md";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf9fa] text-[#040d1b] font-sans">
      
      {/* ==================== ১. হিরো সেকশন (Hero Section) ==================== */}
      <section className="relative py-20 px-4 md:px-10 max-w-7xl mx-auto flex flex-col items-center text-center space-y-6 border-b border-slate-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#775a19]/10 text-[#775a19] rounded-full text-xs font-bold uppercase tracking-wider">
          <MdMenuBook className="text-sm" /> Our Story
        </div>
        <h1 className="text-4xl md:text-6xl font-bold font-serif max-w-3xl leading-tight">
          Redefining the Way You <span className="text-[#775a19] italic">Discover</span> and Access Knowledge
        </h1>
        <p className="text-sm md:text-base text-[#45474c] max-w-2xl leading-relaxed">
          Welcome to BiblioDrop, your premier institutional hub for curating, tracking, and exploring world-class literature. We bridges the gap between avid readers and global knowledge repositories.
        </p>
      </section>

      {/* ==================== ২. আমাদের ভিশন ও মিশন (Mission & Vision) ==================== */}
      <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold font-serif tracking-tight">
            Cultivating a Modern Sanctuary for Books
          </h2>
          <p className="text-sm text-[#45474c] leading-relaxed">
            At BiblioDrop, we believe that books are not just pages bound together, but gateways to endless possibilities. Founded with a vision to streamline library management and personal book curation, we provide an intuitive platform where users can request, track, and build their dream wishlists seamlessly.
          </p>
          <p className="text-sm text-[#45474c] leading-relaxed">
            Whether you are expanding your academic horizon or diving into rich fiction, our ecosystem ensures a frictionless acquisition process with real-time analytics and tracking.
          </p>
        </div>
        
        {/* ইমেজের জন্য একটি চমৎকার মিনিমাল গ্রিড ইফেক্ট */}
        <div className="relative aspect-[4/3] bg-gradient-to-tr from-[#040d1b] to-slate-800 rounded-3xl p-8 flex flex-col justify-between shadow-xl overflow-hidden group">
          <div className="absolute inset-0 bg-[#775a19]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <MdAutoStories className="text-6xl text-[#fed488]/80 self-end animate-pulse" />
          <div>
            <h3 className="text-xl font-bold font-serif text-white mb-2">Empowering 10k+ Readers</h3>
            <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
              Connecting institutions, curators, and readers under one single digital roof.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== ৩. মূল বৈশিষ্ট্যসমূহ (Core Values) ==================== */}
      <section className="bg-white py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-10 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold font-serif">Why Choose BiblioDrop?</h2>
            <p className="text-xs text-[#45474c]">The pillars that make our platform exceptional.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ভ্যালু ১ */}
            <div className="p-6 rounded-2xl bg-[#faf9fa] border border-slate-100 space-y-4 hover:border-[#775a19]/40 hover:shadow-md transition-all duration-300 group">
              <div className="w-12 h-12 bg-white text-[#040d1b] rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-[#040d1b] group-hover:text-white transition-all duration-300 shadow-sm text-xl">
                <MdAutoStories />
              </div>
              <h3 className="text-lg font-bold font-serif">Curated Collections</h3>
              <p className="text-xs text-[#45474c] leading-relaxed">
                Access a vast, meticulously organized catalog of genres ranging from cutting-edge science to timeless historical fiction.
              </p>
            </div>

            {/* ভ্যালু ২ */}
            <div className="p-6 rounded-2xl bg-[#faf9fa] border border-slate-100 space-y-4 hover:border-[#775a19]/40 hover:shadow-md transition-all duration-300 group">
              <div className="w-12 h-12 bg-white text-[#775a19] rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-[#775a19] group-hover:text-white transition-all duration-300 shadow-sm text-xl">
                <MdOutlineWorkspacePremium />
              </div>
              <h3 className="text-lg font-bold font-serif">Premium Experience</h3>
              <p className="text-xs text-[#45474c] leading-relaxed">
                Enjoy fluid interfaces, seamless Stripe-powered transactions, live analytics trends, and a premium dashboard tracking system.
              </p>
            </div>

            {/* ভ্যালু ৩ */}
            <div className="p-6 rounded-2xl bg-[#faf9fa] border border-slate-100 space-y-4 hover:border-[#775a19]/40 hover:shadow-md transition-all duration-300 group">
              <div className="w-12 h-12 bg-white text-emerald-700 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300 shadow-sm text-xl">
                <MdPeopleOutline />
              </div>
              <h3 className="text-lg font-bold font-serif">Community Focused</h3>
              <p className="text-xs text-[#45474c] leading-relaxed">
                Built for readers by readers. We support institutional integrations and dedicated custom user curations for lifelong learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ৪. কল টু অ্যাকশন (CTA Section) ==================== */}
      <section className="py-20 px-4 text-center max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold font-serif">Ready to Start Your Literary Journey?</h2>
        <p className="text-xs text-[#45474c] max-w-md mx-auto leading-relaxed">
          Explore our vast catalog, request deliveries, and curate your personalized dashboard today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-[#040d1b] hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            Explore Dashboard <MdArrowForward className="text-sm" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 px-6 py-3 border border-slate-200 text-[#45474c] hover:bg-slate-50 hover:text-[#040d1b] rounded-xl text-xs font-bold transition-all active:scale-95"
          >
            Browse Books
          </Link>
        </div>
      </section>

    </div>
  );
}