import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import GlobalScene from './components/GlobalScene';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Abdullah Malik - Web Developer Portfolio",
  description: "Aspiring Web Developer | MERN Stack | React.js | JavaScript | Next.js | WordPress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className={inter.className} style={{ margin: 0, padding: 0, overflow: 'auto' }}>
        {/* Global 3D Scene - behind all content */}
        <GlobalScene />
        
        {/* Navigation Bar */}
        <Navbar />
        
        {/* Cursor */}
        <Cursor />
        
        {/* Page content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}