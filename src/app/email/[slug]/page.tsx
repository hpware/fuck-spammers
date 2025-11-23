import { Id } from "../../../../convex/_generated/dataModel";
import Client from "./client";
import { getSession } from "@/components/fastmail";
import * as FM from "@/components/fastmail";
export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  return <Client slug={slug} />;
}
