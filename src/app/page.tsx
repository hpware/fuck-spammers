"use client";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import Link from "next/link";

export default function Home() {
  const data = useQuery(api.email.getDBEmails);
  return (
    <div>
      {data?.map((i: any) => (
        <Link href={`/email/${i.messageId}`}>
          <div className="flex flex-col border-2 m-1 p-1">
            <span className="text-lg">{i.title}</span>
            <span>{i.previewText}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
