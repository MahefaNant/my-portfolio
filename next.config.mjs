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
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ];
  },

  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: "all",
      maxSize: 244 * 1024,
    };
    return config;
  }
};

export default nextConfig;
