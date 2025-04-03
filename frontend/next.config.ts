import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    env: {
        GEMINI_API_KEY: process.env.GEMINI_API_KEY,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
};

export default nextConfig;
