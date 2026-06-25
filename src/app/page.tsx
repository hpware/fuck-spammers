"use client";
import { api } from "../../convex/_generated/api";
import { usePaginatedQuery, useQuery } from "convex/react";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sidebar, SenderName } from "@/components/sidebar";

function EmailDataPrefetcher({ messageId }: { messageId: string }) {
  useQuery(api.email.getDBEmail, { id: messageId });
  return null;
}

function EmailSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full mt-1" />
      </CardHeader>
    </Card>
  );
}

export default function Home() {
  const router = useRouter();
  const { results, status, loadMore } = usePaginatedQuery(
    api.email.getDBEmailsPaginated,
    {},
    { initialNumItems: 50 },
  );

  const bottomRef = useRef<HTMLDivElement>(null);
  const [prefetchedIds, setPrefetchedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && status === "CanLoadMore") {
          loadMore(50);
        }
      },
      { threshold: 0.1 },
    );

    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [status, loadMore]);

  const handleEmailHover = useCallback(
    (messageId: string) => {
      if (prefetchedIds.has(messageId)) return;
      router.prefetch(`/email/${messageId}`);
      setPrefetchedIds((prev) => new Set([...prev, messageId]));
    },
    [router, prefetchedIds],
  );

  const isLoading = status === "LoadingFirstPage";

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {[...prefetchedIds].map((id) => (
        <EmailDataPrefetcher key={id} messageId={id} />
      ))}

      <main className="flex-1 py-4 px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <EmailSkeleton key={i} />
            ))}
          </div>
        ) : results.length === 0 ? (
          <Card className="max-w-[480px]">
            <CardHeader>
              <CardDescription>No emails found</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {results.map((i: any) => (
                <Link
                  href={`/email/${i.messageId}`}
                  key={i._id}
                  prefetch={false}
                  onMouseEnter={() => handleEmailHover(i.messageId)}
                >
                  <Card className="h-full hover:border-ring transition-colors duration-150">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base font-medium">
                          {i.title}
                        </CardTitle>
                        <SenderName sender={i.sender} />
                      </div>
                      <CardDescription className="line-clamp-2">
                        TLDR: [{i.previewText}]
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
            <div ref={bottomRef} className="h-4 w-full" />
            {status === "LoadingMore" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <EmailSkeleton key={i} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
