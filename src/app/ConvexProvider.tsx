"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const prerenderConvexUrl = "https://placeholder.convex.cloud";

export default function ConvexP({ children }: { children: ReactNode }) {
  const convex = useMemo(() => {
    const url =
      convexUrl ?? (typeof window === "undefined" ? prerenderConvexUrl : null);

    if (!url) {
      return null;
    }

    return new ConvexReactClient(url);
  }, []);

  if (!convex) {
    throw new Error("Missing NEXT_PUBLIC_CONVEX_URL.");
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
