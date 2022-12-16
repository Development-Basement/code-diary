/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  output: "standalone",
  redirects: async () => {
    return [{ source: "/", destination: "/login", permanent: true }];
  },
};

module.exports = nextConfig;
