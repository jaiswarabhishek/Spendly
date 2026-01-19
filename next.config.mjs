/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/api/forecast/expense/:path*", // Path in Next.js
        destination: "http://127.0.0.1:5328/api/forecast/expense/:path*", // Path to your Flask API
      },
    ];
  },
};

export default nextConfig;
