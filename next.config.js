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
            value: "Abdullah Al Rafi, Python & JavaScript Developer, Analyst (Data Science) at bKash Limited",
          },
          {
            key: "X-Developed-For",
            value: "Portfolio Blog Project",
          },
          {
            key: "X-Developed-Using",
            value: "Next.js PostgreSQL and Django",
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
