"use client";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";

export default function About() {
  return (
    <div className="flex min-h-screen">
      <Sidebar showBack showViewMore />

      <main className="flex-1 py-4 px-6 max-w-2xl">
        <div className="space-y-4 mt-8">
          <p className="text-lg">
            I hate getting spam emails, so I made this...
          </p>
          <p className="text-sm text-muted-foreground">
            This website is open source, made based on Fastmail&apos;s JMAP API,
            and Convex&apos;s cron functions. Copyright &copy;{" "}
            {new Date().getUTCFullYear()}{" "}
            <Link
              href="https://github.com/hpware"
              className="text-foreground hover:underline"
            >
              hpware
            </Link>
          </p>
          <p className="text-sm text-muted-foreground">
            If you have spam, please email{" "}
            <Link
              href="mailto:abcspam@auto.yhw.tw"
              className="text-foreground hover:underline"
            >
              abcspam@auto.yhw.tw
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
