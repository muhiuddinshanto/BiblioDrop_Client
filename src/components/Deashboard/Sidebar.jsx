'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MdMenuBook,
  MdHistoryEdu,
  MdLocalShipping,
  MdBookmark,
  MdImportContacts,
  MdAdd,
  MdLayers,
  MdDashboard,
  MdRateReview,
  MdManageAccounts,
  MdReceiptLong
} from 'react-icons/md';
import { authClient } from '@/lib/auth-client';

const userNavLink = [
  { name: 'Overview', href: '/dashboard/user/overview', icon: MdMenuBook },
  { name: 'Delivery History', href: '/dashboard/user/orders', icon: MdLocalShipping },
  { name: 'Wishlist', href: '/dashboard/user/wishlist', icon: MdBookmark },
  { name: 'My Reading List', href: '/dashboard/user/reading-list', icon: MdImportContacts },
  { name: 'My Reviews', href: '/dashboard/user/reviews', icon: MdHistoryEdu },
];

const librarianNavLink = [
  { name: 'Overview', href: '/dashboard/librarian/overview', icon: MdDashboard },
  { name: 'Add Book', href: '/dashboard/librarian/add-book', icon: MdMenuBook },
  { name: 'Manage Inventory', href: '/dashboard/librarian/inventory', icon: MdLayers },
  { name: 'Manage Deliveries', href: '/dashboard/librarian/deliveries', icon: MdLocalShipping },
];

const adminNavLink = [
  { name: 'Overview', href: '/dashboard/admin/overview', icon: MdDashboard },
  { name: 'Book Approval Queue', href: '/dashboard/admin/queue', icon: MdRateReview },
  { name: 'Manage Users', href: '/dashboard/admin/users', icon: MdManageAccounts },
  { name: 'Manage All Books', href: '/dashboard/admin/books', icon: MdMenuBook },
  { name: 'View All Transactions', href: '/dashboard/admin/transactions', icon: MdReceiptLong },
];

const navLinkMap = {
  user: userNavLink,
  librarian: librarianNavLink,
  admin: adminNavLink,
};

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const role = session?.user?.role || 'user';
  const navItems = navLinkMap[role] || userNavLink;
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <aside className="hidden h-[calc(100vh-5rem)] w-64 shrink-0 flex-col border-r border-[#c5c6cc]/20 bg-[#f6f3f4] py-6 dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-20 lg:flex" />;
  }

  return (
    <>
      <aside className="hidden h-[calc(100vh-5rem)] w-64 shrink-0 flex-col border-r border-[#c5c6cc]/20 bg-[#f6f3f4] py-6 dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-20 lg:flex">
        <div className="px-6 mb-8">
          <span className="font-serif text-2xl font-bold text-[#040d1b] dark:text-white">BiblioDrop</span>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{role} panel</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-4 border-l-4 px-5 py-3 transition-all duration-200 ${
                  isActive
                    ? 'border-[#775a19] bg-[#fcf8fa] font-bold text-[#040d1b] dark:bg-slate-800 dark:text-white'
                    : 'border-transparent text-[#45474c] hover:bg-[#f0edee] dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`text-xl ${isActive ? 'text-[#775a19] dark:text-[#D4AF37]' : 'text-[#45474c] group-hover:text-[#775a19] dark:text-slate-400'}`} />
                <span className="text-sm font-semibold">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 mt-auto">
          <Link
            href={role === 'librarian' ? '/dashboard/librarian/add-book' : '/books'}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#040d1b] px-4 py-3 text-sm font-semibold text-white transition-transform hover:bg-[#1a2332] active:scale-95 dark:bg-[#D4AF37] dark:text-slate-950"
          >
            <MdAdd className="text-lg" />
            <span>{role === 'librarian' ? 'New Book' : 'Browse Books'}</span>
          </Link>
        </div>
      </aside>

      <nav className="sticky top-20 z-40 flex gap-2 overflow-x-auto border-b border-slate-200 bg-white dark:bg-slate-900 px-4 py-3 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition ${
                isActive
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#775a19] dark:text-[#D4AF37]'
                  : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              <Icon className="text-base" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
