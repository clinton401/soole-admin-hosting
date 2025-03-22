import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com', "nobox-upload-bucket.s3.eu-west-2.amazonaws.com"], // Add Cloudinary's domain
  },
};

export default nextConfig;
