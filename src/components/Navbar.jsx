// src/components/Navbar.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Link, Button } from "@heroui/react";
import { usePathname } from "next/navigation";
import {
  FaCircleUser,
  FaBars,
  FaXmark,
  FaChevronDown,
  FaGaugeHigh,
} from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "About Us", href: "/about" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const currentPath = usePathname();

  const { data: session } = authClient.useSession();
  const { user } = session || {};
  const role = user?.role;

  // Close mobile menu on route change
  useEffect(() => {
    closeMenu();
  }, [currentPath]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const getDashboardPath = () => {
    if (role === "admin") return "/dashboard/admin";
    if (role === "librarian") return "/dashboard/librarian";
    return "/dashboard/user";
  };

  const dashboardPath = getDashboardPath();

  const dynamicMenuItems = user
    ? [...MENU_ITEMS.slice(0, 2), { label: "Dashboard", href: dashboardPath }, ...MENU_ITEMS.slice(2)]
    : MENU_ITEMS;

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = async () => {
    closeMenu();
    await authClient.signOut();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:bg-slate-950/95 shadow-sm backdrop-blur dark:border-slate-800">
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">

          {/* Left Section */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden p-2.5 -ml-2 rounded-xl hover:bg-slate-100 active:scale-95 transition-all text-[#0F172A] dark:text-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FaXmark size={20} /> : <FaBars size={20} />}
            </button>

            <Logo />
          </div>

          {/* Desktop Menu */}
          <DesktopMenu items={dynamicMenuItems} currentPath={currentPath} />

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <UserDropdown
                user={user}
                isOpen={isProfileOpen}
                setIsOpen={setIsProfileOpen}
                onLogout={handleLogout}
                dashboardPath={dashboardPath}
              />
            ) : (
              <AuthLinks />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu — rendered outside nav to cover full screen */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />

            <MobileMenu
              items={dynamicMenuItems}
              user={user}
              currentPath={currentPath}
              onClose={closeMenu}
              onLogout={handleLogout}
              dashboardPath={dashboardPath}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ==================== Sub Components ==================== */

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-3 group no-underline">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 8 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0F172A] via-slate-900 to-[#0F172A] text-xl sm:text-2xl font-black text-white shadow-md border border-[#D4AF37]/30 dark:from-[#D4AF37] dark:via-amber-500 dark:to-[#D4AF37] dark:text-slate-950"
      >
        B
      </motion.div>
      <div className="font-bold tracking-tighter flex items-center gap-1">
        <span className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-white">Biblio</span>
        <span className="text-xl sm:text-2xl font-extrabold text-[#D4AF37]">Drop</span>
      </div>
    </Link>
  );
}

function DesktopMenu({ items, currentPath }) {
  return (
    <ul className="hidden md:flex items-center gap-8 lg:gap-12 list-none m-0 p-0">
      {items.map((item) => {
        const isActive =
          item.href === "/" ? currentPath === "/" : currentPath.startsWith(item.href);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`relative text-[15px] font-bold tracking-wide transition-all duration-300 no-underline ${
                isActive
                  ? "text-[#D4AF37]"
                  : "text-[#334155] hover:text-[#0F172A] dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              {item.label}
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

function UserDropdown({ user, isOpen, setIsOpen, onLogout, dashboardPath }) {
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl border border-[#D4AF37]/30 bg-white dark:bg-slate-900 px-2.5 py-2 sm:px-4 sm:py-2.5 hover:shadow-md hover:border-[#D4AF37]/60 transition-all duration-200 dark:border-slate-700"
        aria-expanded={isOpen}
        aria-label="User menu"
      >
        <FaCircleUser className="text-xl sm:text-2xl text-[#D4AF37] flex-shrink-0" />
        <div className="hidden sm:block text-left max-w-[100px] lg:max-w-[140px]">
          <p className="text-sm font-bold text-[#0F172A] dark:text-white truncate">{user.name}</p>
          <p className="text-xs text-[#334155] -mt-0.5 capitalize dark:text-slate-400">{user.role || "user"}</p>
        </div>
        <FaChevronDown
          className={`text-xs text-[#334155] transition-transform duration-300 dark:text-slate-400 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-64 sm:w-72 origin-top-right bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 z-50 overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-gray-100 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-800/60">
              <FaCircleUser className="text-3xl sm:text-4xl text-[#D4AF37] flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-bold text-sm sm:text-base text-[#0F172A] dark:text-white truncate">{user.name}</p>
                <p className="text-xs text-[#334155] dark:text-slate-400 truncate">{user.email}</p>
              </div>
            </div>

            <div className="p-1.5 flex flex-col gap-0.5">
              <Link
                href={dashboardPath}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-[#334155] hover:text-[#0F172A] hover:bg-slate-50 transition-colors no-underline dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <FaGaugeHigh className="text-base text-[#D4AF37] flex-shrink-0" />
                Dashboard
              </Link>
            </div>

            <button
              onClick={onLogout}
              className="w-full text-left px-5 py-3.5 text-sm text-red-600 hover:bg-red-50 font-semibold transition-colors dark:hover:bg-red-950/40"
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
    <div className="flex items-center gap-2 sm:gap-4">
      <Link
        href="/login"
        className="hidden sm:block font-bold text-[#334155] hover:text-[#0F172A] px-3 py-2 transition-colors no-underline dark:text-slate-300 dark:hover:text-white"
      >
        Login
      </Link>
      <Link
        href="/signup"
        style={{ backgroundColor: "#0F172A" }}
        className="text-white font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base transition-all active:scale-95 shadow-md no-underline"
      >
        Sign Up
      </Link>
    </div>
  );
}

function MobileMenu({ items, user, currentPath, onClose, onLogout, dashboardPath }) {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 z-50 h-full w-[min(320px,85vw)] bg-white dark:bg-slate-950 shadow-2xl md:hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-800">
        <Logo />
        <button
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all text-[#0F172A] dark:text-slate-100"
          aria-label="Close menu"
        >
          <FaXmark size={20} />
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
        {items.map((item, index) => {
          const isActive =
            item.href === "/" ? currentPath === "/" : currentPath.startsWith(item.href);

          return (
            <motion.div
              key={item.href}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 + 0.1 }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className={`flex items-center px-4 py-3.5 rounded-xl text-[15px] font-bold transition-all no-underline ${
                  isActive
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "text-[#0F172A] hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.label}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* User Section */}
      <div className="border-t border-gray-100 dark:border-slate-800 px-4 py-5">
        {user ? (
          <div>
            <div className="flex items-center gap-3 mb-4 px-1">
              <FaCircleUser className="text-4xl text-[#D4AF37] flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-bold text-base text-[#0F172A] dark:text-white truncate">{user.name}</p>
                <p className="text-xs text-[#334155] dark:text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                as={Link}
                href={dashboardPath}
                onClick={onClose}
                className="w-full bg-[#0F172A] hover:bg-slate-800 text-white py-3 rounded-xl font-bold text-center no-underline"
              >
                Go to Dashboard
              </Button>
              <Button
                onClick={onLogout}
                className="w-full bg-red-50 text-red-600 hover:bg-red-100 py-3 rounded-xl font-bold"
              >
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Link
              href="/login"
              onClick={onClose}
              style={{ backgroundColor: "transparent", border: "1.5px solid #0F172A" }}
              className="w-full py-3 font-bold text-[#0F172A] dark:text-white dark:border-white rounded-xl text-center no-underline"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={onClose}
              style={{ backgroundColor: "#0F172A" }}
              className="w-full py-3 text-white font-bold rounded-xl text-center no-underline"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}