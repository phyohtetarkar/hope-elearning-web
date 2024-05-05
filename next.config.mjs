/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    // staleTimes: {
    //   dynamic: 1,
    //   static: 180,
    // },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin/courses/:id/lessons",
        destination: "/admin/courses/:id",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
