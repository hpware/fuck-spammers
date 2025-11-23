"use client";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import Link from "next/link";

export default function Home() {
  const data = useQuery(api.email.getDBEmails);
  return (
    <div className="justify-center flex flex-col items-center">
      <div className="flex flex-col border-2 m-1 p-1 max-w-[400px] w-full text-center border-stone-700">
        <span className="text-xl py-2">Emails</span>
      </div>
      {data?.map((i: any) => (
        <Link href={`/email/${i.messageId}`} key={i._id}>
          <div className="flex flex-col border-2 m-1 p-2 max-w-[400px] border-stone-700 hover:border-teal-100 transition-all duration-100">
            <span className="text-lg">{i.title}</span>
            <span>{i.previewText}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
