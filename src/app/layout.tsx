import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import ReactQueryProvider from "./ReactQueryProvider";
import Link from "next/link";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sleek Next App",
  description: "A beautiful Next.js app with Tailwind, ShadCN, React Query, and ApexCharts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black antialiased",
        geistSans.variable,
        geistMono.variable
      )}>
        <nav className="w-full flex justify-center py-6 mb-8">
          <div className="flex gap-6 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full shadow-lg border border-white/20">
            <Link href="/" className="text-lg font-semibold text-white hover:text-purple-300 transition">Home</Link>
            <Link href="/users" className="text-lg font-semibold text-white hover:text-purple-300 transition">Users</Link>
            <Link href="/posts" className="text-lg font-semibold text-white hover:text-purple-300 transition">Posts</Link>
            <Link href="/dashboard" className="text-lg font-semibold text-white hover:text-purple-300 transition">Dashboard</Link>
          </div>
        </nav>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}