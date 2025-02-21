/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID:
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2o3top45uowdm.cloudfront.net",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "assets.prometheusapartments.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
