/** @type {import('next').NextConfig} */
const allowedDevOrigins = process.env.ALLOWED_DEV_ORIGINS
  ? process.env.ALLOWED_DEV_ORIGINS.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  : undefined;

const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins
};

export default nextConfig;
