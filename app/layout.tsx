import type { Metadata } from "next";
import "./globals.css";
import { getHeader } from "@/lib/contentstack";
import Header from "@/components/Header";
// import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Petri's Showcase Site",
  description: "Built with Contentstack and Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let header;
  
  try {
    header = await getHeader();
    console.log("Header data:", header);
  } catch (error) {
    console.error("Error in layout:", error);
  }

  return (
    <html lang="en">
      <body>
        <Header header={header} />
        {children}
      </body>
    </html>
  );
}


