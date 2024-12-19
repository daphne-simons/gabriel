/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
  },
  webpack: (config) => {
    // Add a rule for handling font files
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/, // Match font file extensions
      type: 'asset/resource', // Use Webpack's built-in asset/resource type
      generator: {
        filename: 'static/fonts/[name][ext]', // Output font files to /_next/static/fonts/
      },
    })

    return config // Return the modified configuration
  },
}

export default nextConfig
