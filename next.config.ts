import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // /capture/ → capture/index.html, which GitHub Pages serves without a redirect
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
