"use client";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";

// Skeleton component for loading state
function EmailDetailSkeleton() {
  return (
    <div className="justify-center flex flex-col items-center">
      <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
        <span className="pt-2 text-stone-400">
          <Link href="/">Go back</Link>
        </span>
        <div className="h-6 bg-stone-700 rounded w-3/4 mx-auto mb-2 animate-pulse"></div>
      </div>
      <div className="flex flex-col border-2 m-1 p-2 max-w-[400px] w-full border-stone-700 animate-pulse">
        <div className="h-4 bg-stone-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-stone-700 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-stone-700 rounded w-4/5 mb-2"></div>
        <div className="h-4 bg-stone-700 rounded w-full"></div>
      </div>
    </div>
  );
}

export default function Client({ slug }: { slug: string }) {
  const data = useQuery(api.email.getDBEmail, { id: slug });
  const isLoading = data === undefined;
  const email = data?.[0];

  if (isLoading) {
    return <EmailDetailSkeleton />;
  }

  if (!email) {
    return (
      <div className="justify-center flex flex-col items-center">
        <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
          <span className="pt-2 text-stone-400">
            <Link href="/">Go back</Link>
          </span>
          <span className="text-xl pb-2 text-red-400">Email not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="justify-center flex flex-col items-center">
      <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
        <span className="pt-2 text-stone-400">
          <Link href="/">Go back</Link>
        </span>
        <span className="text-xl pb-2">Title: {email.title}</span>
      </div>
      <div className="flex flex-col border-2 m-1 p-2 max-w-[400px] border-stone-700">
        <span className="whitespace-pre-wrap">{email.emailText}</span>
      </div>
    </div>
  );
}
