"use client";
import { api } from "../../convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import Link from "next/link";
import { useEffect, useRef } from "react";

function EmailSkeleton() {
  return (
    <div className="flex flex-col border-2 m-1 p-2 max-w-[400px] w-full border-stone-700 animate-pulse">
      <div className="h-5 bg-stone-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-stone-700 rounded w-full"></div>
    </div>
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
    <div className="justify-center flex flex-col items-center">
      <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
        <span className="text-xl py-2">Emails</span>
        <div className="flex flex-row justify-center space-x-1 flex-wrap gap-y-1">
          <Link
            href="/most-used-domains"
            className="hover:text-teal-100 transition-colors duration-100"
          >
            Spammers fav domains!
          </Link>
          |{" "}
          <Link
            href="/rss.xml"
            className="hover:text-teal-100 transition-colors duration-100"
          >
            RSS Feed
          </Link>
        </div>
      </div>
      {isLoading ? (
        <>
          <EmailSkeleton />
          <EmailSkeleton />
          <EmailSkeleton />
        </>
      ) : results.length === 0 ? (
        <div className="flex flex-col border-2 m-1 p-2 max-w-[400px] w-full border-stone-700 text-center">
          <span className="text-stone-400">No emails found</span>
        </div>
      ) : (
        <>
          {results.map((i: any, index: number) => (
            <Link href={`/email/${i.messageId}`} key={i._id} prefetch={true}>
              <div
                className={`flex flex-col border-2 m-1 p-2 max-w-[400px] border-stone-700 hover:border-teal-100 transition-colors duration-100 ${results.length === index && "mb-0"}`}
              >
                <span className="text-lg">{i.title}</span>
                <span>{i.previewText}</span>
              </div>
            </Link>
          ))}
          <div ref={bottomRef} className="h-4 w-full max-w-[400px]" />
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
