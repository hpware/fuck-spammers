import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import ConvexP from "./ConvexProvider";

const openSans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Prevent FOIT (Flash of Invisible Text)
  preload: true,
});

export const metadata: Metadata = {
  title: "fuck email spam & cold emails",
  description:
    "Cold emails suck, wastes my inbox & time. So, this website displays them, hey at least those wasted space are used up to power this site eh",
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} antialiased bg-background text-foreground`}
      >
        <ConvexP>{children}</ConvexP>
      </body>
    </html>
  );
}
