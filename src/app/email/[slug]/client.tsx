"use client";
import { api } from "../../../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
export default function Client({ slug }: { slug: string }) {
  const data = useQuery(api.email.getDBEmail, { id: slug });
  return <div></div>;
}
