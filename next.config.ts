import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The live menu labels this "Gallery" but the URL is /facilities/.
      // Keep both working.
      { source: "/gallery", destination: "/facilities", permanent: true },
    ];
  },
  images: {
    // Photos are still served from the client's WordPress media library.
    // Run `npm run fetch-images` to pull them into /public/images, then
    // flip USE_LOCAL_IMAGES in src/lib/images.ts and this block can go.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.aureohotels.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
