/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
    domains: [
      "lh3.googleusercontent.com",
      "drive.google.com"
    ],
  },

  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml; charset=utf-8"
          }    
        ]
      }
    ];
  },

  async rewrites() {
    return [
      {
        source: "/:locale/sitemap.xml",
        destination: "/sitemap.xml",
      }
    ];
  },

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      self: false
    };
    
    config.optimization.splitChunks = {
      chunks: "all",
      maxSize: 244 * 1024,
    };
    return config;
  }
};

export default nextConfig;