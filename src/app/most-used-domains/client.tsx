"use client";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";

function DomainSkeleton() {
  return (
    <div className="flex flex-row justify-between border-2 m-1 p-2 max-w-[400px] w-full border-stone-700 animate-pulse">
      <div className="h-5 bg-stone-700 rounded w-3/4"></div>
      <div className="h-5 bg-stone-700 rounded w-8"></div>
    </div>
  );
}

export default function Client() {
  const data = useQuery(api.email.getMostUsedDomains);
  const isLoading = data === undefined;

  return (
    <div className="justify-center flex flex-col items-center">
      <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
        <span className="text-xl py-2">Most Used Domains</span>
        <span className="pb-2 text-stone-400">
          <Link
            href="/"
            className="hover:text-teal-100 transition-colors duration-100"
          >
            Go back
          </Link>
        </span>
      </div>
      {isLoading ? (
        <>
          <DomainSkeleton />
          <DomainSkeleton />
          <DomainSkeleton />
        </>
      ) : data?.length === 0 ? (
        <div className="flex flex-col border-2 m-1 p-2 max-w-[400px] w-full border-stone-700 text-center">
          <span className="text-stone-400">No domains found</span>
        </div>
      ) : (
        data?.map((item) => (
          <div
            key={item.domain}
            className="flex flex-row justify-between border-2 m-1 p-2 max-w-[400px] w-full border-stone-700"
          >
            <span className="text-lg">{item.domain}</span>
            <span className="text-stone-400">{item.count}</span>
          </div>
        ))
      )}
    </div>
  );
}
