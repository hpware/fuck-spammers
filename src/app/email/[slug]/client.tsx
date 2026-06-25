"use client";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useState } from "react";
import dompurify from "dompurify";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sidebar } from "@/components/sidebar";

function decodeHTMLEntities(text: string): string {
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.body.textContent ?? text;
}

function EmailDetailSkeleton() {
  return (
    <div className="flex min-h-screen">
      <Sidebar showBack showViewMore />
      <main className="flex-1 py-4 px-6">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-5 w-1/4 mb-2" />
        <Skeleton className="h-4 w-full mt-6" />
        <Skeleton className="h-4 w-5/6 mt-2" />
        <Skeleton className="h-4 w-4/5 mt-2" />
      </main>
    </div>
  );
}

export default function Client({ slug }: { slug: string }) {
  const data = useQuery(api.email.getDBEmail, { id: slug });
  const [userMode, setUserMode] = useState<"text" | "html">("text");
  const isLoading = data === undefined;
  const email = data?.[0];

  if (isLoading) return <EmailDetailSkeleton />;

  if (!email) {
    return (
      <div className="flex min-h-screen">
        <Sidebar showBack showViewMore />
        <main className="flex-1 py-4 px-6">
          <h1 className="text-2xl font-bold text-destructive">
            Email not found
          </h1>
        </main>
      </div>
    );
  }

  const senderName = email.sender.split("@")[0] ?? email.sender;
  const senderDomain = email.sender.split("@")[1] ?? "";

  return (
    <div className="flex min-h-screen">
      <Sidebar showBack showViewMore />

      <main className="flex-1 py-4 px-6 max-w-3xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{email.title}</h1>
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center justify-center w-8 h-8 border border-border text-base">
                @
              </span>
              <div>
                <div className="text-foreground">{senderName}</div>
                <div>Using Domain: {senderDomain}</div>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setUserMode(userMode === "html" ? "text" : "html")
            }
            disabled={email.emailHTML === undefined}
            title={userMode === "html" ? "Display as Text" : "Display as HTML"}
          >
            {userMode === "html" ? (
              <span className="text-xs font-mono">Aa</span>
            ) : (
              <span className="text-sm font-mono">&lt;/&gt;</span>
            )}
          </Button>
        </div>

        <div className="mt-6">
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
        </div>
      </main>
    </div>
  );
}
