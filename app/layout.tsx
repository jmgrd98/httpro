import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { MethodUrlProvider } from '../context/MethodUrlContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HTTPro",
  description: "Test your APIs with the power of AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <MethodUrlProvider>
      <html lang='en'>
        <body>{children}</body>
      </html>
      </MethodUrlProvider>
  </ClerkProvider>
  );
}
