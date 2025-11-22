"use client";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import * as fm from "@/components/fastmail";
import Link from "next/link";

export default function Home() {
  const data = useQuery(api.email.getDBEmails);
  return (
    <div>
      {JSON.stringify(data)}
      <div>
        <span>This website is built around Fastmail's JMAP api.</span>
        <span>
          &copy; {new Date().getUTCFullYear()}{" "}
          <Link href="https://github.com/hpware">Howard</Link>
        </span>
      </div>
    </div>
  );
}
