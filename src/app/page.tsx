"use client";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";

// Skeleton component for loading state
function EmailSkeleton() {
  return (
    <div className="flex flex-col border-2 m-1 p-2 max-w-[400px] w-full border-stone-700 animate-pulse">
      <div className="h-5 bg-stone-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-stone-700 rounded w-full"></div>
    </div>
  );
}

export default function Home() {
  const data = useQuery(api.email.getDBEmails);
  const isLoading = data === undefined;

  return (
    <div className="justify-center flex flex-col items-center">
      <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
        <span className="text-xl py-2">Emails</span>
        <div className="flex flex-row justify-center">
          <Link
            href="/getEmail.txt?dl=1"
            className="hover:text-teal-100 transition-colors duration-100"
          >
            Block their emails!
          </Link>
        </div>
      </div>
      {isLoading ? (
        // Show skeleton loaders while data is loading
        <>
          <EmailSkeleton />
          <EmailSkeleton />
          <EmailSkeleton />
        </>
      ) : data?.length === 0 ? (
        <div className="flex flex-col border-2 m-1 p-2 max-w-[400px] w-full border-stone-700 text-center">
          <span className="text-stone-400">No emails found</span>
        </div>
      ) : (
        data?.map((i: any) => (
          <Link href={`/email/${i.messageId}`} key={i._id} prefetch={true}>
            <div className="flex flex-col border-2 m-1 p-2 max-w-[400px] border-stone-700 hover:border-teal-100 transition-colors duration-100">
              <span className="text-lg">{i.title}</span>
              <span>{i.previewText}</span>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
