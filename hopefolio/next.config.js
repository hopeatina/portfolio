/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next 15's legacy build-time lint runner is incompatible with this repo's
  // flat ESLint config. CI and local verification run `npm run lint` directly.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [], // Add any external image domains here
  },
  webpack: (config) => {
    // Add support for 3D model files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
      },
    })
    return config
  },
}

module.exports = nextConfig
