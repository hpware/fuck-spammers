import { notFound } from "next/navigation";
import Client from "./client";

export default function Page() {
  if (process.env.NEXT_PUBLIC_DISPLAY_DOMAINS !== "true") {
    notFound();
  }
  return <Client />;
}
