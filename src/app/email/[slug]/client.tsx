"use client";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useState } from "react";
import dompurify from "dompurify";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function decodeHTMLEntities(text: string): string {
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.body.textContent ?? text;
}

function EmailDetailSkeleton() {
  return (
    <div className="flex flex-col items-center py-4 px-2 gap-2">
      <Card className="w-full max-w-[560px]">
        <CardHeader>
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </CardHeader>
      </Card>
      <Card className="w-full max-w-[560px]">
        <CardContent className="pt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function Client({ slug }: { slug: string }) {
  const data = useQuery(api.email.getDBEmail, { id: slug });
  const [userMode, setUserMode] = useState<"text" | "html">("text");
  const isLoading = data === undefined;
  const email = data?.[0];

  if (isLoading) {
    return <EmailDetailSkeleton />;
  }

  if (!email) {
    return (
      <div className="flex flex-col items-center py-4 px-2">
        <Card className="w-full max-w-[560px]">
          <CardHeader className="text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Go back
            </Link>
            <CardTitle className="text-destructive">Email not found</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-4 px-2 gap-2">
      <Card className="w-full max-w-[560px]">
        <CardHeader className="text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Go back
          </Link>
          <CardTitle>{email.title}</CardTitle>
        </CardHeader>
      </Card>

      <Button
        variant="outline"
        className="w-full max-w-[560px]"
        onClick={() => setUserMode(userMode === "html" ? "text" : "html")}
        disabled={email.emailHTML === undefined}
      >
        {userMode === "html" ? "Render as Text" : "Render as HTML"}
      </Button>

      <Card className="w-full max-w-[560px]">
        <CardContent className="pt-4">
          {userMode === "text" ? (
            <span className="whitespace-pre-wrap break-all text-sm">
              {decodeHTMLEntities(email.emailText)}
            </span>
          ) : (
            email.emailHTML !== undefined && (
              <div
                className="*:text-foreground! text-sm"
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(email.emailHTML),
                }}
              />
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
