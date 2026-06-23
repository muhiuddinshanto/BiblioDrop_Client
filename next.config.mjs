/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // এটি যেকোনো ডোমেইনের ইমেজকে ওয়ান-টাইম পারমিশন দিয়ে দেবে
      },
    ],
  },
};

export default nextConfig;