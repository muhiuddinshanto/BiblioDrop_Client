// src/app/(auth)/login/page.jsx
"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import {
  FaGoogle,
  FaArrowRightToBracket,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock
} from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  const redirectTo = redirectParam && redirectParam !== "null" ? redirectParam : null;
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const { data: authData, error } = await authClient.signIn.email({
        email: formData.get("email"),
        password: formData.get("password"),
        rememberMe: true,
      });

      if (error) {
        toast.error(`❌ Login Failed: ${error.message || "Invalid credentials"}`);
        console.error("Login Failed:", error);
        return;
      }

      if (authData) {
        toast.success(`🎉 Login Successful!`);
        router.push(redirectTo || "/");
      }

    } catch (error) {
      console.error("Login Failed:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const data = await authClient.signIn.social({
        provider: "google",
      });

      if (data) {
        toast.success(`Login Successful!`);
        router.push(redirectTo || "/");
      }
    } catch (error) {
      console.error("Google Login Failed:", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md p-5 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl my-6 sm:my-10 transition-all">

      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#0F172A] to-slate-800 dark:from-amber-400 dark:to-amber-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 shadow-inner text-2xl sm:text-4xl">
          🔑
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white tracking-tight">Welcome Back</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 sm:mt-2">Sign in to your BiblioDrop account</p>
      </div>

      {/* Google Button */}
      <Button
        onPress={handleGoogleLogin}
        variant="ghost"
        className="w-full flex items-center justify-center gap-3 border-2 border-slate-200 dark:border-slate-800 hover:border-[#0F172A] dark:hover:border-amber-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-[#0F172A] dark:text-white font-semibold rounded-2xl py-5 sm:py-6 text-sm sm:text-base transition-all active:scale-[0.985]"
      >
        <FaGoogle className="text-rose-500 text-lg sm:text-xl" />
        Continue with Google
      </Button>

      <div className="relative flex py-4 sm:py-6 items-center">
        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        <span className="flex-shrink mx-4 sm:mx-6 text-xs font-bold text-slate-400 uppercase tracking-[2px]">or</span>
        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
      </div>

      {/* Login Form */}
      <form className="flex flex-col gap-5 sm:gap-6" onSubmit={onSubmit}>

        {/* Email */}
        <div className="w-full flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#0F172A] dark:text-slate-300">Email Address</label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
            <input
              required
              type="email"
              name="email"
              placeholder="john@example.com"
              className="w-full h-12 pl-11 pr-4 bg-transparent border border-slate-200 dark:border-slate-800 focus:border-[#0F172A] dark:focus:border-amber-400 rounded-2xl outline-none text-sm transition-all text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Password */}
        <div className="w-full flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-[#0F172A] dark:text-slate-300">Password</label>
            <a href="#" className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-amber-400 transition-colors focus:outline-none">
              Forgot Password?
            </a>
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full h-12 pl-11 pr-12 bg-transparent border border-slate-200 dark:border-slate-800 focus:border-[#0F172A] dark:focus:border-amber-400 rounded-2xl outline-none text-sm transition-all text-slate-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200 transition-colors focus:outline-none"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          style={{ backgroundColor: "#0F172A" }}
          className="w-full text-white font-semibold rounded-2xl h-12 flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-slate-900/20 hover:brightness-110 mt-2 text-sm sm:text-base"
        >
          <FaArrowRightToBracket size={18} />
          Sign In
        </Button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2 sm:mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href={`/signup${redirectTo ? `?redirect=${redirectTo}` : ""}`}
            className="font-bold text-[#0F172A] dark:text-amber-400 hover:underline focus:outline-none"
          >
            Create one now
          </Link>
        </p>
      </form>
    </div>
  );
}