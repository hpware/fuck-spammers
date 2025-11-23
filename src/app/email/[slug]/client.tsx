"use client";
import { api } from "../../../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";
export default function Client({ slug }: { slug: string }) {
  const data = useQuery(api.email.getDBEmail, { id: slug });
  return (
    <div className="justify-center flex flex-col items-center">
      <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
        <span className="pt-2 text-stone-400">
          <Link href="/">Go back</Link>
        </span>
        <span className="text-xl pb-2">Title: {data?.[0].title}</span>
      </div>
      <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
        <span>Sender: {data?.[0].sender}</span>
      </div>
      <div className="flex flex-col border-2 m-1 p-2 max-w-[400px] border-stone-700">
        <span>{data?.[0].emailText}</span>
      </div>
    </div>
  );
}
