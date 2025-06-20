/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/Me-main' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Me-main' : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['@ai-sdk/google']
  },
  // Ensure CSS is properly handled in static export
  optimizeFonts: false,
  // Disable server-side features for static export
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true
}

export default nextConfig