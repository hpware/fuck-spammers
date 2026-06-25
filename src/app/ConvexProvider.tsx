"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export default function ConvexP({ children }: { children: ReactNode }) {
  const convex = useMemo(() => {
    if (!convexUrl) {
      return null;
    }

    return new ConvexReactClient(convexUrl);
  }, []);

  if (!convex) {
    if (typeof window === "undefined") {
      return <>{children}</>;
    }

    throw new Error("Missing NEXT_PUBLIC_CONVEX_URL.");
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
