import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BiblioDrop",
  description: "Online book delivery management system for readers, librarians, and admins.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full w-full flex flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
        </ThemeProvider>
      </body>
    </html>
  );
}
