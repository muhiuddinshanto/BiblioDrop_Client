"use client";

import React, { useState } from "react";
import { MdMenuBook, MdCloudUpload, MdHourglassEmpty, MdAttachMoney } from "react-icons/md";

// ক্যাটাগরি লিস্ট
const CATEGORIES = [
  "Philosophy",
  "Architecture",
  "History",
  "Science",
  "Cartography",
  "Technology",
  "Non-Fiction",
];

export default function BookForm({ onSubmit, initialData = null, isSubmitting = false }) {
  // ডিফল্ট ব্ল্যাঙ্ক স্টেটের অবজেক্ট
  const defaultFields = {
    title: "",
    author: "",
    description: "",
    price: "",
    category: "",
  };

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    author: initialData?.author || "",
    description: initialData?.description || "",
    price: initialData?.price || "", 
    category: initialData?.category || "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // ইনপুট চেঞ্জ হ্যান্ডলার
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ইমেজ সিলেক্ট এবং প্রিভিউ হ্যান্ডলার
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // imgBB-তে ইমেজ আপলোড করার মেইন লজিক
  const uploadToImgBB = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; 
    if (!apiKey) {
      console.error("imgBB API Key is missing!");
      alert("Image upload failed: API key not configured.");
      return null;
    }

    const body = new FormData();
    body.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: body,
      });
      const data = await res.json();
      if (data.success) {
        return data.data.url;
      }
      return null;
    } catch (error) {
      console.error("Error uploading image to imgBB:", error);
      return null;
    }
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formTarget = e.target; // ফর্ম এলিমেন্ট রেফারেন্স রাখা হলো রিসেট করার জন্য
    setUploadingImage(true);

    let finalImageUrl = imagePreview;

    if (imageFile) {
      const uploadedUrl = await uploadToImgBB(imageFile);
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      } else {
        alert("Failed to upload image. Please try again.");
        setUploadingImage(false);
        return;
      }
    }

    if (!finalImageUrl) {
      alert("Please upload a book cover image.");
      setUploadingImage(false);
      return;
    }

    setUploadingImage(false);

    try {
      // মেইন সাবমিট ফাংশনে ডাটা পাঠানো এবং এর রেসপন্সের জন্য অপেক্ষা করা
      await onSubmit({
        ...formData,
        price: Number(formData.price), 
        image: finalImageUrl,
        status: "Pending Approval", 
      });

      // 💡 সফলভাবে সাবমিট হওয়ার পর যদি এটি নতুন এন্ট্রি হয় (initialData না থাকে), তবে ফিল্ড ক্লিয়ার হবে
      if (!initialData) {
        setFormData(defaultFields); // টেক্সট ফিল্ড স্টেট রিসেট
        setImageFile(null); // ফাইল স্টেট রিসেট
        setImagePreview(null); // ইমেজ প্রিভিউ বক্স রিসেট
        formTarget.reset(); // HTML ডম ইনপুট রিসেট (ফাইল সিলেক্টরের ভেতরের ভ্যালু ক্লিনের জন্য)
      }
    } catch (error) {
      console.error("Submission handler error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
      
      {/* দুই কলামের গ্রিড (Title & Author) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#45474c]">Book Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., The Silent Alchemist"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#775a19] text-sm text-[#040d1b] transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#45474c]">Author Name</label>
          <input
            type="text"
            name="author"
            required
            value={formData.author}
            onChange={handleChange}
            placeholder="e.g., Sarah Jenkins"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#775a19] text-sm text-[#040d1b] transition-colors"
          />
        </div>
      </div>

      {/* dua কলামের গ্রিড (Category & Price) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#45474c]">Category</label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#775a19] text-sm text-[#040d1b] bg-white transition-colors"
          >
            <option value="" disabled>Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#45474c]">Book Price ($)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              <MdAttachMoney />
            </span>
            <input
              type="number"
              name="price"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#775a19] text-sm text-[#040d1b] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[#45474c]">Description / Synopsis</label>
        <textarea
          name="description"
          required
          rows="4"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write a captivating summary of the book..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#775a19] text-sm text-[#040d1b] transition-colors resize-none"
        />
      </div>

      {/* Image Upload Feature */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[#45474c]">Book Cover Image</label>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center border border-dashed border-slate-200 p-4 rounded-xl">
          
          {/* প্রিভিউ বক্স */}
          <div className="sm:col-span-3 flex justify-center bg-slate-50 rounded-lg p-2 h-28 border border-slate-100 overflow-hidden">
            {imagePreview ? (
              <img src={imagePreview} alt="Cover Preview" className="h-full object-contain rounded shadow-sm" />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-300 text-center">
                <MdMenuBook className="text-3xl" />
                <span className="text-[10px] mt-1 font-medium">No Cover</span>
              </div>
            )}
          </div>

          {/* ফাইল আপলোডার এরিয়া */}
          <div className="sm:col-span-9 relative w-full">
            <input
              type="file"
              id="cover-upload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="cover-upload"
              className="flex flex-col items-center justify-center py-5 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors group"
            >
              <MdCloudUpload className="text-2xl text-slate-400 group-hover:text-[#775a19] transition-colors" />
              <span className="text-xs font-bold text-[#040d1b] mt-1">Click to upload cover</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Supports PNG, JPG, WEBP (Max 5MB)</span>
            </label>
          </div>
        </div>
      </div>

      {/* ইনফো নোট */}
      <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-4 flex items-start gap-3">
        <MdHourglassEmpty className="text-lg text-[#775a19] mt-0.5 flex-shrink-0" />
        <p className="text-xs text-[#775a19] font-medium leading-relaxed">
          <strong>Notice:</strong> Upon submission, this volume will be cataloged under <strong>"Pending Approval"</strong> status. It will remain invisible on the public Browse platform until verified by institutional curation.
        </p>
      </div>

      {/* সাবমিট বাটন */}
      <button
        type="submit"
        disabled={isSubmitting || uploadingImage}
        className="w-full bg-[#040d1b] hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl transition-all active:scale-[0.99] disabled:bg-slate-300 disabled:scale-100 flex items-center justify-center gap-2 text-sm shadow-sm"
      >
        {uploadingImage ? "Hosting Cover Image..." : isSubmitting ? "Cataloging Book..." : "Submit for Verification"}
      </button>

    </form>
  );
}