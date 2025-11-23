import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import ConvexP from "./ConvexProvider";
import Link from "next/link";

const openSans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "f**k email spam",
  description:
    "Do YOU want your spam listed here? Email: john.nation@cf.yhw.tw to get YOUR spam here! (prob will use AI to check long term, for now humans to go!)",
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
          <div className="flex flex-col justify-center text-center">
            <span className="text-sm">
              This website is built around Fastmail's JMAP api & Convex.
            </span>
            <span className="text-sm">
              &copy; {new Date().getUTCFullYear()}{" "}
              <Link href="https://github.com/hpware">Howard</Link>
            </span>
          </div>
        </ConvexP>
      </body>
    </html>
  );
}
