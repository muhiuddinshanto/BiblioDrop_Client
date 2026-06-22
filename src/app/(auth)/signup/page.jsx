// src/app/(auth)/signup/page.jsx
"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // 👈 useRouter ইম্পোর্ট করুন
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { FaGoogle, FaCheck, FaRotateLeft, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaImage } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterForm() {

  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [photoPreview, setPhotoPreview] = useState("");

  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect"); 
  const redirectTo = redirectParam && redirectParam !== "null" ? redirectParam : null;
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formValues = {};
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });
    formValues.role = role;

   

    try {
      // 💡 Better-Auth অফিশিয়াল সাইন-আপ মেথড (ফিক্সড)
      const { data: authData, error } = await authClient.signUp.email({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        image: formData.get("photoUrl"),
        role: role,
      });

      if (error) {
        // Better Auth এরর মেসেজ হ্যান্ডলিং
        toast.error(`❌ Error: ${error.message || "Something went wrong!"}`);
        return;
      }

      if (authData) {
        toast.success(`🎉 Registration Successful for ${formData.get("name")}!`);
        router.push(redirectTo || "/");
      }

    } catch (err) {
      console.error("Auth Request Crash:", err);
    }
  };

  // Photo URL Preview
  const handlePhotoChange = (e) => {
    const url = e.target.value;
    setPhotoPreview(url);
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
        provider: "google",
      });

      if (data) {
        toast.success(`🎉 Login Successful for ${data.user?.name || "User"}!`);
        router.push(redirectTo || "/");
      }
  };

  return (
    <div className="mx-auto w-full max-w-md p-5 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 shadow-2xl my-6 sm:my-10">

      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#0F172A] to-slate-800 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 shadow-inner text-2xl sm:text-3xl">
          📚
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">Create Account</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 sm:mt-2">Join the BiblioDrop community today</p>
      </div>

      {/* Google Button */}
      <Button
        onClick={handleGoogleLogin}
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

      {/* Main Form */}
      <Form className="flex flex-col gap-5 sm:gap-6" onSubmit={onSubmit}>

        {/* Full Name */}
        <TextField isRequired name="name" type="text">
          <Label className="text-sm font-semibold text-[#0F172A]">Full Name</Label>
          <div className="relative mt-1">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <Input placeholder="John Doe" className="pl-11 w-full" />
          </div>
          <FieldError className="text-xs text-rose-500 mt-1" />
        </TextField>

        {/* Email */}
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) =>
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ? "Please enter a valid email address"
              : null
          }
        >
          <Label className="text-sm font-semibold text-[#0F172A]">Email Address</Label>
          <div className="relative mt-1">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <Input placeholder="john@example.com" className="pl-11 w-full" />
          </div>
          <Description className="text-[11px] text-slate-400 mt-1">Must be unique and valid</Description>
          <FieldError className="text-xs text-rose-500 mt-1" />
        </TextField>

        {/* Profile Photo */}
        <TextField isRequired name="photoUrl" type="url">
          <Label className="text-sm font-semibold text-[#0F172A]">Profile Photo URL</Label>
          <div className="relative mt-1">
            <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <Input
              placeholder="https://example.com/avatar.jpg"
              className="pl-11 w-full"
              onChange={handlePhotoChange}
            />
          </div>
          {photoPreview && (
            <div className="mt-3 flex justify-center">
              <img
                src={photoPreview}
                alt="Preview"
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl border border-slate-200 shadow-sm"
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          )}
          <FieldError className="text-xs text-rose-500 mt-1" />
        </TextField>

        {/* Password */}
        <TextField
          isRequired
          name="password"
          type={showPassword ? "text" : "password"}
          onChange={(val) => setPasswordValue(val)}
          validate={(value) => {
            if (value.length < 8) return "Password must be at least 8 characters";
            if (!/[A-Z]/.test(value)) return "Must contain at least one uppercase letter";
            if (!/[0-9]/.test(value)) return "Must contain at least one number";
            return null;
          }}
        >
          <Label className="text-sm font-semibold text-[#0F172A]">Password</Label>
          <div className="relative mt-1">
            <Input placeholder="Create a strong password" className="pr-12 w-full" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-300 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <Description className="text-[11px] text-slate-400 mt-1">
            Minimum 8 characters with uppercase & number
          </Description>
          <FieldError className="text-xs text-rose-500 mt-1" />
        </TextField>

        {/* Confirm Password */}
        <TextField
          isRequired
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          validate={(value) => (value !== passwordValue ? "Passwords do not match" : null)}
        >
          <Label className="text-sm font-semibold text-[#0F172A]">Confirm Password</Label>
          <div className="relative mt-1">
            <Input placeholder="Retype your password" className="pr-12 w-full" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-300 focus:outline-none"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <FieldError className="text-xs text-rose-500 mt-1" />
        </TextField>

        {/* Role Selection */}
        <div className="flex flex-col gap-3">
          <Label className="text-sm font-semibold text-[#0F172A]">Choose Your Role</Label>
          <RadioGroup
            value={role}
            onChange={setRole}
            orientation="vertical"
            className="w-full gap-3 sm:flex-row sm:gap-4"
          >
            <Radio value="user" className="w-full sm:flex-1">
              <div className="border-2 border-slate-200 hover:border-[#0F172A] rounded-2xl p-4 cursor-pointer transition-all data-[selected=true]:border-[#0F172A] data-[selected=true]:bg-slate-50 w-full">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label className="text-sm font-medium cursor-pointer text-[#0F172A]">User (Reader)</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Browse, read & review books</p>
                </Radio.Content>
              </div>
            </Radio>

            <Radio value="librarian" className="w-full sm:flex-1">
              <div className="border-2 border-slate-200 hover:border-[#0F172A] rounded-2xl p-4 cursor-pointer transition-all data-[selected=true]:border-[#0F172A] data-[selected=true]:bg-slate-50 w-full">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label className="text-sm font-medium cursor-pointer text-[#0F172A]">Librarian</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage books & catalog</p>
                </Radio.Content>
              </div>
            </Radio>
          </RadioGroup>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
          <Button
            type="submit"
            style={{ backgroundColor: "#0F172A" }}
            className="w-full sm:flex-1 text-white font-semibold rounded-2xl py-4 flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-slate-900/20 hover:brightness-105"
          >
            <FaCheck size={17} />
            Create Account
          </Button>

          <Button
            type="reset"
            variant="flat"
            onPress={() => {
              setRole("user");
              setPhotoPreview("");
            }}
            className="w-full sm:w-auto border border-slate-200 text-slate-600 dark:text-slate-300 font-semibold rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-slate-50"
          >
            <FaRotateLeft size={17} />
            Reset
          </Button>
        </div>
      </Form>
            {/* Signin Link */}
      <div className="text-center mt-6 pt-5 border-t border-slate-100 text-sm">
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Already have an account?{" "}
          <Link 
            href={`/login?redirect=${redirectTo}`} 
            className="text-[#0F172A] font-bold hover:underline transition-all"
          >
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}
