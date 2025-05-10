import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@/components/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Media Dashboard",
  description: "A modern social media dashboard built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}