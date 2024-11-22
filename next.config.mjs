/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.heygen.ai",
      },
      {
        protocol: "https",
        hostname: "files2.heygen.ai",
      },
    ],
  },
}

export default nextConfig
