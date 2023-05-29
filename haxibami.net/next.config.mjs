import analyze from "@next/bundle-analyzer";
import withPlaiceholder from "@plaiceholder/next";

const withBundleAnalyzer = analyze({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: [
      "rehype-mermaidjs",
      // "playwright-core",
      "plaiceholder",
      "@plaiceholder/next",
      "fetch-site-metadata",
    ],
    scrollRestoration: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["asciinema.org", "raw.githubusercontent.com"],
  },
};

export default withBundleAnalyzer(withPlaiceholder(nextConfig));
