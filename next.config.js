/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: "X-Developed-By",
            value: "Abdullah Al Rafi",
          },
          {
            key: "X-Developed-For",
            value: "Portfolio Project",
          },
          {
            key: "X-Developed-Using",
            value: "Next.js Firebase and Vercel",
          },
          {
            key: "X-Developed-At",
            value: "Home Sweet Home",
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
