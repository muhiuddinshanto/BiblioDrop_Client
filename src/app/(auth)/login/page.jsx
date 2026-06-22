
"use client";
import React, { useState } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
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
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    console.log("Login Credentials Submitted:", data);

    try {
      const { data: authData, error } = await authClient.signIn.email({
        email: formData.get("email"),
        password: formData.get("password"),
        rememberMe: true,
      });

      if (error) {
        toast.error(`âŒ Login Failed: ${error.message || "Invalid credentials"}`);
        console.error("Login Failed:", error);
        return;
      }

      if (authData) {
        // ðŸš€ à¦«à¦¿à¦•à§à¦¸à¦¡: à¦¨à¦¾à¦® à¦¸à¦°à¦¾à¦¸à¦°à¦¿ 'authData.user' à¦¥à§‡à¦•à§‡ à¦¨à§‡à¦“à§Ÿà¦¾ à¦¹à¦šà§à¦›à§‡
        toast.success(`ðŸŽ‰ Login Successful for ${authData.user?.name || "User"}!`);
        router.push(redirectTo || "/");
      }

    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const handleGoogleLogin = async () => {
      const data = await authClient.signIn.social({
        provider: "google",
      });

      if (data) {
        toast.success(`ðŸŽ‰ Login Successful for ${data.user?.name || "User"}!`);
        router.push(redirectTo || "/");
      }


      
    
    
  };

  return (
    <div className="mx-auto w-full max-w-md p-5 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 shadow-2xl my-6 sm:my-10">

      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#0F172A] to-slate-800 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 shadow-inner text-2xl sm:text-4xl">
          ðŸ”
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">Welcome Back</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 sm:mt-2">Sign in to your BiblioDrop account</p>
      </div>

      {/* Google Button */}
      <Button
        onPress={handleGoogleLogin}
        variant="ghost"
        className="w-full flex items-center justify-center gap-3 border-2 border-slate-200 hover:border-[#0F172A] hover:bg-slate-50 text-[#0F172A] font-semibold rounded-2xl py-5 sm:py-6 text-sm sm:text-base transition-all active:scale-[0.985]"
      >
        <FaGoogle className="text-rose-500 text-lg sm:text-xl" />
        Continue with Google
      </Button>

      <div className="relative flex py-4 sm:py-6 items-center">
        <div className="flex-grow border-t border-slate-200"></div>
        <span className="flex-shrink mx-4 sm:mx-6 text-xs font-bold text-slate-400 uppercase tracking-[2px]">or</span>
        <div className="flex-grow border-t border-slate-200"></div>
      </div>

      {/* Login Form */}
      <Form className="flex flex-col gap-5 sm:gap-6" onSubmit={onSubmit}>

        {/* Email */}
        <TextField isRequired name="email" type="email">
          <Label className="text-sm font-semibold text-[#0F172A]">Email Address</Label>
          <div className="relative mt-1">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <Input placeholder="john@example.com" className="pl-11 w-full" />
          </div>
          <FieldError className="text-xs text-rose-500 mt-1" />
        </TextField>

        {/* Password */}
        <TextField isRequired name="password" type={showPassword ? "text" : "password"}>
          <div className="flex justify-between items-center mb-1">
            <Label className="text-sm font-semibold text-[#0F172A]">Password</Label>
            <a href="#" className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#0F172A] transition-colors focus:outline-none">
              Forgot Password?
            </a>
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <Input placeholder="Enter your password" className="pl-11 pr-12 w-full" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-300 transition-colors focus:outline-none"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          <FieldError className="text-xs text-rose-500 mt-1" />
        </TextField>

        {/* Submit Button */}
        <Button
          type="submit"
          style={{ backgroundColor: "#0F172A" }}
          className="w-full text-white font-semibold rounded-2xl py-4 flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-slate-900/20 hover:brightness-105 mt-2 text-sm sm:text-base"
        >
          <FaArrowRightToBracket size={18} />
          Sign In
        </Button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2 sm:mt-4">
          Don&apos;t have an account?{" "}
          {/* ðŸš€ à¦«à¦¿à¦•à§à¦¸à¦¡: à¦Ÿà§‡à¦®à¦ªà§à¦²à§‡à¦Ÿ à¦²à¦¿à¦Ÿà¦¾à¦°à§‡à¦² à¦¦à¦¿à§Ÿà§‡ à¦¡à¦¾à¦‡à¦¨à¦¾à¦®à¦¿à¦• à¦°à¦¿à¦¡à¦¾à¦‡à¦°à§‡à¦•à§à¦Ÿ à¦ªà§à¦¯à¦¾à¦°à¦¾à¦®à¦¿à¦Ÿà¦¾à¦° */}
          <Link
            href={`/signup${redirectTo ? `?redirect=${redirectTo}` : ""}`}
            className="font-bold text-[#0F172A] hover:underline focus:outline-none"
          >
            Create one now
          </Link>
        </p>
      </Form>
    </div>
  );
}

