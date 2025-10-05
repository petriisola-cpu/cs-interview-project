

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    
    unoptimized: true,
  
    remotePatterns: [
      ...(process.env.NEXT_PUBLIC_CONTENTSTACK_IMAGE_HOSTNAME
        ? [{ 
            protocol: "https",
            hostname: process.env.NEXT_PUBLIC_CONTENTSTACK_IMAGE_HOSTNAME 
          }]
        : [
            {
              protocol: "https",
              hostname: "images.contentstack.io",
              pathname: "/v3/assets/**",
            },
            {
              protocol: "https",
              hostname: "res.cloudinary.com",
            },
            {
              protocol: "https",
              hostname: "*-images.contentstack.com",
            },
          ]),
    ],
  },
};

export default nextConfig;
