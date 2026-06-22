// src/components/Navbar.jsx
"use client";

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { usePathname } from "next/navigation";
import { 
  FaCircleUser, 
  FaBars, 
  FaXmark, 
  FaChevronDown, 
  FaGaugeHigh
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

  // ðŸ’¡ à¦¡à¦¾à¦‡à¦¨à¦¾à¦®à¦¿à¦• à¦¡à§à¦¯à¦¾à¦¶à¦¬à§‹à¦°à§à¦¡ à¦ªà¦¾à¦¥ à¦•à§à¦¯à¦¾à¦²à¦•à§à¦²à§‡à¦¶à¦¨ à¦²à¦œà¦¿à¦•
  const getDashboardPath = () => {
    if (role === "admin") return "/dashboard/admin";
    if (role === "librarian") return "/dashboard/librarian";
    return "/dashboard/user"; 
  };

  const dashboardPath = getDashboardPath();

  // ðŸ’¡ à¦®à§‡à¦¨à§ à¦†à¦‡à¦Ÿà§‡à¦®à¦—à§à¦²à§‹à¦° à¦¸à¦¾à¦¥à§‡ à¦¡à¦¾à¦‡à¦¨à¦¾à¦®à¦¿à¦• à¦¡à§à¦¯à¦¾à¦¶à¦¬à§‹à¦°à§à¦¡ à¦°à§à¦Ÿ à¦ªà§à¦¶ à¦•à¦°à¦¾ à¦¹à¦šà§à¦›à§‡
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
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-3 -ml-3 rounded-2xl hover:bg-slate-100 active:scale-95 transition-all text-[#0F172A] dark:text-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
          </button>

          <Logo />
        </div>

        {/* Desktop Menu */}
        <DesktopMenu items={dynamicMenuItems} currentPath={currentPath} />

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          {user ? (
            <UserDropdown
              user={user}
              isOpen={isProfileOpen}
              setIsOpen={setIsProfileOpen}
              onLogout={handleLogout}
              dashboardPath={dashboardPath} // ðŸ’¡ à¦¡à¦¾à¦‡à¦¨à¦¾à¦®à¦¿à¦• à¦ªà¦¾à¦¥ à¦¡à§à¦°à¦ªà¦¡à¦¾à¦‰à¦¨à§‡ à¦ªà¦¾à¦ à¦¾à¦¨à§‹ à¦¹à¦²à§‹
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
            items={dynamicMenuItems}
            user={user}
            currentPath={currentPath}
            onClose={closeMenu}
            onLogout={handleLogout}
            dashboardPath={dashboardPath} // ðŸ’¡ à¦¡à¦¾à¦‡à¦¨à¦¾à¦®à¦¿à¦• à¦ªà¦¾à¦¥ à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦®à§‡à¦¨à§à¦¤à§‡ à¦ªà¦¾à¦ à¦¾à¦¨à§‹ à¦¹à¦²à§‹
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
        className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F172A] via-slate-900 to-[#0F172A] text-2xl font-black text-white shadow-lg border border-[#D4AF37]/30 dark:from-[#D4AF37] dark:via-amber-500 dark:to-[#D4AF37] dark:text-slate-950"
      >
        B
      </motion.div>
      <div className="font-bold tracking-tighter flex items-center gap-1">
        <span className="text-2xl font-extrabold text-[#0F172A] dark:text-white">Biblio</span>
        <span className="text-2xl font-extrabold text-[#D4AF37]">Drop</span>
      </div>
    </Link>
  );
}

function DesktopMenu({ items, currentPath }) {
  return (
    <ul className="hidden md:flex items-center gap-10 lg:gap-12 list-none m-0 p-0">
      {items.map((item) => {
        // à¦¡à§à¦¯à¦¾à¦¶à¦¬à§‹à¦°à§à¦¡à§‡à¦° à¦¸à¦¾à¦¬-à¦°à¦¾à¦‰à¦Ÿà§‡ à¦¥à¦¾à¦•à¦²à§‡à¦“ à¦¯à§‡à¦¨ 'Dashboard' à¦²à¦¿à¦‚à¦•à¦Ÿà¦¿ à¦…à§à¦¯à¦¾à¦•à§à¦Ÿà¦¿à¦­ à¦¦à§‡à¦–à¦¾à§Ÿ (à¦¯à§‡à¦®à¦¨: /dashboard/user/overview)
        const isActive = item.href === "/" 
          ? currentPath === "/" 
          : currentPath.startsWith(item.href);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`relative text-[15.5px] font-bold tracking-wide transition-all duration-300 no-underline ${
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
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-3xl border border-[#D4AF37]/30 bg-white px-3 py-2.5 hover:shadow-md hover:border-[#D4AF37]/60 transition-all duration-200 dark:bg-slate-900 dark:border-slate-700 sm:px-5"
      >
        <FaCircleUser className="text-2xl text-[#D4AF37]" />
        <div className="hidden sm:block text-left pr-2">
          <p className="text-sm font-bold text-[#0F172A] dark:text-white">{user.name}</p>
          <p className="text-xs text-[#334155] -mt-0.5 capitalize dark:text-slate-400">{user.role || "user"}</p>
        </div>
        <FaChevronDown className={`text-xs text-[#334155] transition-transform duration-300 dark:text-slate-400 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-72 origin-top-right bg-white rounded-3xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden dark:bg-slate-900 dark:border-slate-800"
          >
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/60">
              <FaCircleUser className="text-4xl text-[#D4AF37]" />
              <div>
                <p className="font-bold text-base text-[#0F172A] dark:text-white">{user.name}</p>
                <p className="text-xs text-[#334155] truncate max-w-[160px] dark:text-slate-400">{user.email}</p>
              </div>
            </div>
            <div className="p-1.5 flex flex-col gap-0.5">
              {/* ðŸ“Š ðŸ’¡ à¦à¦–à¦¾à¦¨à§‡ à¦¡à¦¾à¦‡à¦¨à¦¾à¦®à¦¿à¦• à¦¡à§à¦¯à¦¾à¦¶à¦¬à§‹à¦°à§à¦¡ à¦ªà¦¾à¦¥ à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦° à¦•à¦°à¦¾ à¦¹à§Ÿà§‡à¦›à§‡ */}
              <Link
                href={dashboardPath}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-[#334155] hover:text-[#0F172A] hover:bg-slate-50 transition-colors no-underline dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <FaGaugeHigh className="text-lg text-[#D4AF37]" />
                Dashboard
              </Link>
            </div>

            <button
              onClick={onLogout}
              className="w-full text-left px-6 py-4 text-red-600 hover:bg-red-50 font-semibold transition-colors dark:hover:bg-red-950/40"
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
        className="font-bold text-[#334155] hover:text-[#0F172A] px-4 py-2.5 transition-colors no-underline dark:text-slate-300 dark:hover:text-white"
      >
        Login
      </Link>
      <Link
        href="/signup"
        style={{ backgroundColor: "#0F172A" }}
        className="text-white font-bold px-6 py-2.5 rounded-full transition-all active:scale-95 shadow-md no-underline"
      >
        Sign Up
      </Link>
    </div>
  );
}

function MobileMenu({ items, user, currentPath, onClose, onLogout, dashboardPath }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="md:hidden overflow-hidden bg-white border-t border-gray-100 shadow-inner dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="px-6 py-8 flex flex-col gap-2">
        {items.map((item, index) => {
          const isActive = item.href === "/" 
            ? currentPath === "/" 
            : currentPath.startsWith(item.href);

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
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]" 
                    : "text-[#0F172A] hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.label}
              </Link>
            </motion.div>
          );
        })}

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
          {user ? (
            <div className="bg-slate-50 rounded-2xl p-5 dark:bg-slate-900">
              <div className="flex items-center gap-4 mb-6">
                <FaCircleUser className="text-5xl text-[#D4AF37]" />
                <div>
                  <p className="font-bold text-lg text-[#0F172A]">{user.name}</p>
                  <p className="text-sm text-[#334155] break-all dark:text-slate-400">{user.email}</p>
                </div>
              </div>
              
              {/* ðŸ’¡ à¦®à§‹à¦¬à¦¾à¦‡à¦² à¦‡à¦‰à¦œà¦¾à¦°à§‡à¦° à¦¸à§à¦¬à¦¿à¦§à¦¾à¦° à¦œà¦¨à§à¦¯ à¦¡à§à¦°à¦ªà¦¡à¦¾à¦‰à¦¨ à¦›à¦¾à§œà¦¾à¦“ à¦¸à¦°à¦¾à¦¸à¦°à¦¿ à¦à¦•à¦Ÿà¦¿ à¦¡à§à¦¯à¦¾à¦¶à¦¬à§‹à¦°à§à¦¡ à¦¶à¦°à§à¦Ÿà¦•à¦¾à¦Ÿ à¦¬à¦¾à¦Ÿà¦¨ */}
              <Button
                as={Link}
                href={dashboardPath}
                onClick={onClose}
                className="w-full bg-[#0F172A] hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold mb-3 block text-center no-underline"
              >
                Go To Dashboard
              </Button>

              <Button
                onClick={onLogout}
                className="w-full bg-red-50 text-red-600 hover:bg-red-100 py-3.5 rounded-xl font-bold"
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
              <Link
                href="/signup"
                onClick={onClose}
                style={{ backgroundColor: "#0F172A" }}
                className="w-full py-4 text-white font-bold rounded-xl text-base text-center no-underline"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
