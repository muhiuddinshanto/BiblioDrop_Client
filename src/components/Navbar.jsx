// src/components/Navbar.jsx
"use client";

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { usePathname } from "next/navigation"; // 💡 কারেন্ট পাথ ট্র্যাক করার জন্য হুক
import { 
  FaCircleUser, 
  FaBars, 
  FaXmark, 
  FaChevronDown, 
  FaGaugeHigh
} from "react-icons/fa6";

import { motion, AnimatePresence } from "framer-motion";
import { authClient, useSession } from "@/lib/auth-client";

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "Dashboard", href: "/dashboard" }, // 💡 স্ট্যাটিক অ্যাকসেন্ট বাদ দেওয়া হয়েছে
  { label: "About Us", href: "/about" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const currentPath = usePathname(); // 💡 কারেন্ট ইউআরএল (যেমন: '/books') বের করবে

  const  { data: session, isPending, error } = authClient.useSession();

  const { user } = session || {};
  

  // const [user, setUser] = useState({
  //   name: "Mohiuddin",
  //   email: "shanto@example.com",
  // });

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout =async () => {
    closeMenu();
    await authClient.signOut();
    
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-3 -ml-3 rounded-2xl hover:bg-slate-100 active:scale-95 transition-all text-[#0F172A]"
          >
            {isMenuOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
          </button>

          <Logo />
        </div>

        {/* Desktop Menu (💡 কারেন্ট পাথ পাস করা হচ্ছে) */}
        <DesktopMenu items={MENU_ITEMS} currentPath={currentPath} />

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {user ? (
            <UserDropdown
              user={user}
              isOpen={isProfileOpen}
              setIsOpen={setIsProfileOpen}
              onLogout={handleLogout}
            />
          ) : (
            <AuthLinks />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            items={MENU_ITEMS}
            user={user}
            currentPath={currentPath}
            onClose={closeMenu}
            onLogout={handleLogout}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ==================== Sub Components ==================== */

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group no-underline">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 8 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F172A] via-slate-900 to-[#0F172A] text-2xl font-black text-white shadow-lg border border-[#D4AF37]/30"
      >
        B
      </motion.div>
      <div className="font-bold tracking-tighter flex items-center gap-1">
        <span className="text-2xl font-extrabold text-[#0F172A]">Biblio</span>
        <span className="text-2xl font-extrabold text-[#D4AF37]">Drop</span>
      </div>
    </Link>
  );
}

function DesktopMenu({ items, currentPath }) {
  return (
    <ul className="hidden md:flex items-center gap-10 lg:gap-12 list-none m-0 p-0">
      {items.map((item) => {
        // 💡 চেক করা হচ্ছে ইউজার বর্তমানে এই পেজে আছে কিনা
        const isActive = currentPath === item.href;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`relative text-[15.5px] font-bold tracking-wide transition-all duration-300 no-underline ${
                isActive
                  ? "text-[#D4AF37]" // একটিভ থাকলে গোল্ডেন কালার
                  : "text-[#334155] hover:text-[#0F172A]"
              }`}
            >
              {item.label}
              
              {/* 💡 একটিভ পেজের নিচে ফ্রেমার মোশনের স্মুথ আন্ডারলাইন ম্যাজিক */}
              {isActive && (
                <motion.span
                  layoutId="underline"
                  className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-[#D4AF37] rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 300 }}
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function UserDropdown({ user, isOpen, setIsOpen, onLogout }) {
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-3xl border border-[#D4AF37]/30 bg-white px-5 py-2.5 hover:shadow-md hover:border-[#D4AF37]/60 transition-all duration-200"
      >
        <FaCircleUser className="text-2xl text-[#D4AF37]" />
        <div className="hidden sm:block text-left pr-2">
          <p className="text-sm font-bold text-[#0F172A]">{user.name}</p>
          <p className="text-xs text-[#334155] -mt-0.5">{user.email}</p>
        </div>
        <FaChevronDown className={`text-xs text-[#334155] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-72 origin-top-right bg-white rounded-3xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-4 bg-slate-50/50">
              <FaCircleUser className="text-4xl text-[#D4AF37]" />
              <div>
                <p className="font-bold text-base text-[#0F172A]">{user.name}</p>
                <p className="text-xs text-[#334155] truncate max-w-[160px]">{user.email}</p>
              </div>
            </div>
            <div className="p-1.5 flex flex-col gap-0.5">
             {/* 📊 Dashboard Link */}
              <Link
                href="/dashboard/user"
                className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-[#334155] hover:text-[#0F172A] hover:bg-slate-50 transition-colors no-underline"
              >
                <FaGaugeHigh className="text-lg text-[#D4AF37]" />
                Dashboard
              </Link>
            </div>

            <button
              onClick={onLogout}
              className="w-full text-left px-6 py-4 text-red-600 hover:bg-red-50 font-semibold transition-colors"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AuthLinks() {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/login"
        className="font-bold text-[#334155] hover:text-[#0F172A] px-4 py-2.5 transition-colors no-underline"
      >
        Login
      </Link>
      <Link
        href="/signup"
        style={{ backgroundColor: "#0F172A" }}
        className="text-white font-bold px-6 py-2.5 rounded-full transition-all active:scale-95 shadow-md"
        size="sm"
      >
        Sign Up
      </Link>
    </div>
  );
}

function MobileMenu({ items, user, currentPath, onClose, onLogout }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="md:hidden overflow-hidden bg-white border-t border-gray-100 shadow-inner"
    >
      <div className="px-6 py-8 flex flex-col gap-2">
        {items.map((item, index) => {
          const isActive = currentPath === item.href;

          return (
            <motion.div
              key={item.href}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className={`block px-5 py-4 rounded-2xl text-[16px] font-bold transition-all no-underline ${
                  isActive
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]" // মোবাইল মেনুতে অ্যাক্টিভ ব্যাকগ্রাউন্ড হাইলাইট
                    : "text-[#0F172A] hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            </motion.div>
          );
        })}

        <div className="mt-6 pt-6 border-t border-gray-100">
          {user ? (
            <div className="bg-slate-50 rounded-2xl p-5">
              <div className="flex items-center gap-4 mb-6">
                <FaCircleUser className="text-5xl text-[#D4AF37]" />
                <div>
                  <p className="font-bold text-lg text-[#0F172A]">{user.name}</p>
                  <p className="text-sm text-[#334155]">{user.email}</p>
                </div>
              </div>
              <Button
                onClick={onLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-bold"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/login"
                onClick={onClose}
                className="text-center py-3.5 font-bold text-base text-[#334155] hover:bg-slate-50 rounded-xl no-underline"
              >
                Login
              </Link>
              <Button
                as={Link}
                href="/register"
                onClick={onClose}
                style={{ backgroundColor: "#0F172A" }}
                className="w-full py-4 text-white font-bold rounded-xl text-base"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}