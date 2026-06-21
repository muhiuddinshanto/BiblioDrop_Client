'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// react-icons থেকে প্রয়োজনীয় আইকন ইমপোর্ট করা হয়েছে
import {
  MdMenuBook,
  MdCategory,
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

export default function Sidebar() {
  const pathname = usePathname();

  const { data: session, isPending, error } = authClient.useSession();

  const { user } = session || {};

  const role = user?.role;


  // নেভিগেশন আইটেমগুলোর অ্যারে
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

  const navItems = navLinkMap[role] || userNavLink;;

  return (
    <aside className="hidden lg:flex flex-col h-screen w-64 sticky top-0 py-6 bg-[#f6f3f4] border-r border-[#c5c6cc]/20">
      {/* লোগো বা ব্র্যান্ড নেম */}
      <div className="px-6 mb-8">
        <span className="text-2xl font-bold text-[#040d1b] font-serif">BiblioDrop</span>
      </div>

      {/* নেভিগেশন লিঙ্ক সমূহ */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          // লিঙ্কটি বর্তমানে অ্যাক্টিভ কিনা তা চেক করা হচ্ছে
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 py-3 px-5 transition-all duration-200 group ${isActive
                ? 'text-[#040d1b] border-l-4 border-[#775a19] bg-[#fcf8fa] font-bold'
                : 'text-[#45474c] hover:bg-[#f0edee] border-l-4 border-transparent'
                }`}
            >
              <Icon className={`text-xl ${isActive ? 'text-[#775a19]' : 'text-[#45474c] group-hover:text-[#775a19]'}`} />
              <span className="text-sm font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* নিচের অ্যাকশন বাটন */}
      <div className="px-4 mt-auto">
        <button className="w-full py-3 px-4 bg-[#040d1b] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-[#1a2332]">
          <MdAdd className="text-lg" />
          <span>New Entry</span>
        </button>
      </div>
    </aside>
  );
}