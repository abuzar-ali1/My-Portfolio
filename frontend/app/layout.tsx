import type { Metadata } from "next";
import "./globals.css";
import ReactLenis from "lenis/react";
import { Roboto } from 'next/font/google';
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export const metadata: Metadata = {
  title: "Abuzar Ali | Full Stack Developer",
  
  description: "Portfolio of Abuzar Ali. Specializing in building exceptional digital experiences with Next.js, React, and Tailwind CSS.",
  
  icons: {
    icon: "/logo.svg", 
  },
};


const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased` }
      >
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
          <Navbar />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
        </ReactLenis>
      </body>
    </html>
  );
}
