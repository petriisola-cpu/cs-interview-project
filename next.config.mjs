/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Configure allowed hostnames for Next.js Image Optimization
    remotePatterns: [
      ...(process.env.NEXT_PUBLIC_CONTENTSTACK_IMAGE_HOSTNAME
        ? [{ hostname: process.env.NEXT_PUBLIC_CONTENTSTACK_IMAGE_HOSTNAME }]
        : [
          // added per Claude's suggestion  
          // { protocol: "https"},
            //{ hostname: "images.contentstack.io" },
            //{ port: ''},
            //{ pathname: "/**"},
            // end of addition
             { hostname: "images.contentstack.io" },
             { hostname: "*-images.contentstack.com" },
          ]),
          {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};



export default nextConfig;
