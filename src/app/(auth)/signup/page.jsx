// src/app/(auth)/signup/page.jsx
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@heroui/react";
import { 
  FaGoogle, 
  FaCheck, 
  FaEye, 
  FaEyeSlash, 
  FaUser, 
  FaEnvelope, 
  FaImage,
  FaCircleCheck 
} from "react-icons/fa6";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [photoPreview, setPhotoPreview] = useState("");

  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  const redirectTo = redirectParam && redirectParam !== "null" ? redirectParam : null;
  const router = useRouter();

  const isPasswordInvalid = passwordValue && confirmPasswordValue && passwordValue !== confirmPasswordValue;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (passwordValue !== confirmPasswordValue) {
      toast.error("❌ Passwords do not match!");
      return;
    }

    const formData = new FormData(e.currentTarget);

    try {
      const { data: authData, error } = await authClient.signUp.email({
        name: formData.get("name"),
        email: formData.get("email"),
        password: passwordValue,
        image: formData.get("photoUrl"),
        role: role,
      });

      if (error) {
        toast.error(`❌ ${error.message || "Registration failed"}`);
        return;
      }

      if (authData) {
        toast.success(`🎉 Welcome ${formData.get("name")}!`);
        router.push(redirectTo || "/");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 transition-colors duration-300">
      {/* ব্যাকগ্রাউন্ড গ্লো */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-blue-500/10 dark:bg-amber-500/5 blur-[120px]" />
        <div className="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-amber-500/10 dark:bg-blue-500/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg z-10"
      >
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none p-6 sm:p-10 transition-all">
          
          {/* হেডার */}
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="mx-auto w-16 h-16 bg-slate-900 dark:bg-amber-400 rounded-2xl flex items-center justify-center text-3xl shadow-md mb-4"
            >
              📖
            </motion.div>
            <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Join BiblioDrop
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Create your scholarly account</p>
          </div>

          {/* গুগল লগইন */}
          <Button
            onClick={() => authClient.signIn.social({ provider: "google" })}
            variant="bordered"
            className="w-full flex items-center justify-center gap-3 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-medium rounded-2xl h-12 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <FaGoogle className="text-[#EA4335] text-lg" />
            Continue with Google
          </Button>

          <div className="relative flex items-center py-6">
            <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
            <span className="px-4 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">or</span>
            <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
          </div>

          {/* ফর্ম */}
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            
            {/* Full Name */}
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-medium text-sm">Full Name</label>
              <div className="relative flex items-center">
                <FaUser className="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Mohiuddin Shanto"
                  className="w-full h-12 pl-11 pr-4 bg-transparent border border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-amber-400 rounded-2xl outline-none text-sm transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-medium text-sm">Email Address</label>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full h-12 pl-11 pr-4 bg-transparent border border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-amber-400 rounded-2xl outline-none text-sm transition-all"
                />
              </div>
            </div>

            {/* Profile Photo URL */}
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-medium text-sm">Profile Photo URL</label>
              <div className="relative flex items-center">
                <FaImage className="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                  type="url"
                  name="photoUrl"
                  placeholder="https://example.com/avatar.jpg"
                  onChange={(e) => setPhotoPreview(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-transparent border border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-amber-400 rounded-2xl outline-none text-sm transition-all"
                />
              </div>
              {photoPreview && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-2 flex justify-center">
                  <img 
                    src={photoPreview} 
                    alt="Preview" 
                    className="w-16 h-16 object-cover rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm" 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </motion.div>
              )}
            </div>

            {/* Password */}
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-medium text-sm">Password</label>
              <div className="relative flex items-center">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  className="w-full h-12 px-4 pr-12 bg-transparent border border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-amber-400 rounded-2xl outline-none text-sm transition-all"
                />
                <button className="absolute right-4 focus:outline-none" type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <FaEyeSlash className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" />
                  ) : (
                    <FaEye className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-medium text-sm">Confirm Password</label>
              <div className="relative flex items-center">
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPasswordValue}
                  onChange={(e) => setConfirmPasswordValue(e.target.value)}
                  className={`w-full h-12 px-4 pr-12 bg-transparent border rounded-2xl outline-none text-sm transition-all
                    ${isPasswordInvalid 
                      ? "border-rose-500 focus:border-rose-500" 
                      : "border-slate-200 dark:border-slate-800 focus:border-slate-900 dark:focus:border-amber-400"
                    }`}
                />
                <button className="absolute right-4 focus:outline-none" type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" />
                  ) : (
                    <FaEye className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" />
                  )}
                </button>
              </div>
              {isPasswordInvalid && (
                <span className="text-xs text-rose-500 mt-0.5">Passwords do not match</span>
              )}
            </div>

            {/* Role Selection */}
            <div className="w-full flex flex-col gap-2.5 mt-1">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">I want to join as</label>
              <div className="grid grid-cols-2 gap-4">
                
                {/* Reader Option */}
                <div
                  onClick={() => setRole("user")}
                  className={`relative flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 select-none
                    ${role === "user" 
                      ? "border-slate-900 bg-slate-50 dark:border-amber-400 dark:bg-amber-400/10 shadow-sm" 
                      : "border-slate-200 bg-transparent hover:bg-slate-50/50 dark:border-slate-800/80 dark:hover:bg-slate-800/30"
                    }`}
                >
                  <div className="flex flex-col flex-1">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">User</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Browse & collect books</span>
                  </div>
                  {role === "user" && (
                    <FaCircleCheck className="text-slate-900 dark:text-amber-400 text-lg flex-shrink-0 mt-0.5" />
                  )}
                </div>

                {/* Librarian Option */}
                <div
                  onClick={() => setRole("librarian")}
                  className={`relative flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 select-none
                    ${role === "librarian" 
                      ? "border-slate-900 bg-slate-50 dark:border-amber-400 dark:bg-amber-400/10 shadow-sm" 
                      : "border-slate-200 bg-transparent hover:bg-slate-50/50 dark:border-slate-800/80 dark:hover:bg-slate-800/30"
                    }`}
                >
                  <div className="flex flex-col flex-1">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Librarian</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage the collection</span>
                  </div>
                  {role === "librarian" && (
                    <FaCircleCheck className="text-slate-900 dark:text-amber-400 text-lg flex-shrink-0 mt-0.5" />
                  )}
                </div>

              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-slate-900 hover:bg-black text-white dark:bg-amber-400 dark:text-slate-900 dark:hover:bg-amber-300 font-semibold h-12 rounded-2xl text-sm shadow-md mt-2 transition-all active:scale-[0.99]"
            >
              <FaCheck className="mr-2" />
              Create My Account
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
            Already have an account?{" "}
            <Link href={`/login?redirect=${redirectTo}`} className="font-semibold text-slate-900 dark:text-amber-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}