"use client";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import * as fm from "@/components/fastmail";

export default function Home() {
  const data = useQuery(api.email.getDBEmails);
  return <div>{JSON.stringify(data)}</div>;
}
