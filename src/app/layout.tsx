import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import ConvexP from "./ConvexProvider";
import Link from "next/link";

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
      <body className={`${openSans.variable} antialiased`}>
        <ConvexP>
          {children}
          <div className="flex flex-col justify-center align-middle text-center items-center">
            <div className="flex flex-col border-2 border-stone-700 m-1 p-1 max-w-[400px] w-full justify-center align-middle text-center items-center">
              <span className="text-sm">
                This website is built around Fastmail's JMAP api & Convex.
              </span>
              <span className="text-sm">
                This website is{" "}
                <Link href="https://github.com/hpware/fuck-spammers">
                  open source
                </Link>
                !
              </span>
              <span className="text-sm">
                &copy; {new Date().getUTCFullYear()}{" "}
                <Link href="https://github.com/hpware">Howard</Link>
              </span>
            </div>
          </div>
        </ConvexP>
      </body>
    </html>
  );
}
