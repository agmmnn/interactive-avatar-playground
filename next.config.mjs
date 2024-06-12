/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.heygen.ai",
      },
    ],
  },
}

export default nextConfig
