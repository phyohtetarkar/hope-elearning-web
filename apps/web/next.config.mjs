/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
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
        source: "/courses",
        destination: "/browse",
        permanent: true,
      },
      {
        source: "/tags",
        destination: "/blogs",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      /**
       * Rewrites for Multi Zones
       */
      {
        source: '/admin',
        destination: `${process.env.ADMIN_URL}/admin`,
      },
      {
        source: '/admin/:path*',
        destination: `${process.env.ADMIN_URL}/admin/:path*`,
      },
      {
        source: "/admin-static/_next/:path+",
        destination: `${process.env.ADMIN_URL}/admin-static/_next/:path+`,
      },
      {
        source: "/admin-static/tinymce/:path+",
        destination: `${process.env.ADMIN_URL}/admin-static/tinymce/:path+`,
      },
    ]
  },
};

export default nextConfig;
