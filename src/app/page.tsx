"use client";
import { api } from "../../convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function EmailSkeleton() {
  return (
    <Card className="m-1 w-full max-w-[480px]">
      <CardHeader>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full mt-1" />
      </CardHeader>
    </Card>
  );
}

export default function Home() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.email.getDBEmailsPaginated,
    {},
    { initialNumItems: 50 },
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && status === "CanLoadMore") {
          loadMore(50);
        }
      },
      { threshold: 0.1 },
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, [status, loadMore]);

  const isLoading = status === "LoadingFirstPage";

  return (
    <div className="flex flex-col items-center py-4 px-2">
      <Card className="w-full max-w-[480px] m-1">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Emails</CardTitle>
          <div className="flex flex-row justify-center gap-3 flex-wrap text-sm text-muted-foreground pt-1">
            <Link
              href="/most-used-domains"
              className="hover:text-foreground transition-colors"
            >
              Spammers&apos; fav domains
            </Link>
            <span>·</span>
            <Link
              href="/rss.xml"
              className="hover:text-foreground transition-colors"
            >
              RSS Feed
            </Link>
          </div>
        </CardHeader>
      </Card>

      {isLoading ? (
        <>
          <EmailSkeleton />
          <EmailSkeleton />
          <EmailSkeleton />
        </>
      ) : results.length === 0 ? (
        <Card className="w-full max-w-[480px] m-1">
          <CardHeader className="text-center">
            <CardDescription>No emails found</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <>
          {results.map((i: any, index: number) => (
            <Link
              href={`/email/${i.messageId}`}
              key={i._id}
              prefetch={true}
              className="w-full max-w-[480px]"
            >
              <Card
                className={`m-1 hover:border-ring transition-colors duration-150 ${results.length === index && "mb-0"}`}
              >
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    {i.title}
                  </CardTitle>
                  <CardDescription>{i.previewText}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
          <div ref={bottomRef} className="h-4 w-full max-w-[480px]" />
          {status === "LoadingMore" && (
            <>
              <EmailSkeleton />
              <EmailSkeleton />
              <EmailSkeleton />
            </>
          )}
        </>
      )}
    </div>
  );
}
