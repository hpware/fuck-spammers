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
      <body
        className={`${openSans.variable} antialiased bg-background text-foreground`}
      >
        <ConvexP>
          {children}
          <div className="flex flex-col justify-center align-middle text-center items-center">
            <div className="flex flex-col border border-border bg-card rounded-lg m-1 p-3 max-w-[560px] w-full justify-center align-middle text-center items-center gap-1">
              <span className="text-sm text-muted-foreground">
                Built with Fastmail&apos;s JMAP api &amp; Convex.
              </span>
              <span className="text-sm text-muted-foreground">
                <Link
                  href="https://github.com/hpware/fuck-spammers"
                  className="text-foreground hover:underline"
                >
                  Open source
                </Link>{" "}
                on GitHub.
              </span>
              <span className="text-sm text-muted-foreground">
                &copy; {new Date().getUTCFullYear()}{" "}
                <Link
                  href="https://github.com/hpware"
                  className="text-foreground hover:underline"
                >
                  Howard
                </Link>
              </span>
            </div>
          </div>
        </ConvexP>
      </body>
    </html>
  );
}
